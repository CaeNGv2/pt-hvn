import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  InternalServerErrorException,
  UseGuards,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { extname, join } from "node:path";
import { writeFile, mkdir } from "node:fs/promises";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard.js";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import type { Express } from "express";

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // refers to the initial raw
const MAX_DIMENSION = 1280;

export interface UploadImageResponse {
  /** Unique image ID (UUID without extension). Use as `uri` for PhotoRef type "api". */
  id: string;
  type: "api";
  /** Convenience path for direct use: /uploads/<id>.webp */
  path: string;
}

@ApiTags("upload")
@Controller("upload")
export class UploadController {
  /**
   * POST /upload/image
   * Accepts any common image format, compresses to WebP (max 1200 × 1200,
   * proportions preserved, no upscaling), saves to ./data/user-images/<id>.webp.
   * Returns { id, type: "api", path } – store `id` as PhotoRef { type:"api", uri: id }.
   */
  @Post("image")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Upload an image and receive ID to the compressed WebP (member or admin)",
    description:
      'Returns `{ id, type: "api", path }`. ' +
      'Use returned `id` as `uri` in a PhotoRef `{ type: "api", uri: "<id>" }`.',
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: { file: { type: "string", format: "binary" } },
    },
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),
      limits: { fileSize: MAX_SIZE_BYTES },
      // fileFilter: (_req, file, cb) => {
      //   const ext = extname(file.originalname).toLowerCase();
      //   if (!new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.tiff']).has(ext)) {
      //     return cb(
      //       new BadRequestException(
      //         `Unsupported file type "${ext}". Allowed: jpg, jpeg, png, gif, webp, avif, tiff.`,
      //       ),
      //       false,
      //     );
      //   }
      //   cb(null, true);
      // },
    })
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<UploadImageResponse> {
    if (!file) throw new BadRequestException("No file provided");

    const id = uuidv4();
    const filename = `${id}.webp`;
    const destDir = join(process.cwd(), "data", "user-images");
    const destPath = join(destDir, filename);

    try {
      await mkdir(destDir, { recursive: true });

      const webpBuffer = await sharp(file.buffer)
        .resize({
          width: MAX_DIMENSION,
          height: MAX_DIMENSION,
          fit: "inside", // preserves aspect ratio
          withoutEnlargement: true, // no upscale for small images
        })
        .webp({ quality: 82 })
        .toBuffer();

      await writeFile(destPath, webpBuffer);
    } catch (err) {
      // Treat any sharp failure (corrupt data, non-image binary, etc.) as a client error
      throw new InternalServerErrorException(
        `Image processing failed: ${err instanceof Error ? err.message : String(err)}`
      );
    }

    return {
      id,
      type: "api",
      path: `/uploads/${filename}`,
    };
  }
}
