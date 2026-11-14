/**
 * Stub module for the OpenAPI generator basically no-op auth and db.
 */
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

import { AuthController } from "./auth/auth.controller.js";
import { MembersController } from "./members/members.controller.js";
import { PetsController } from "./pets/pets.controller.js";
import { ReleasesController } from "./releases/releases.controller.js";
import { AdoptionsController } from "./adoptions/adoptions.controller.js";
import { UploadController } from "./upload/upload.controller.js";
import { AuthService } from "./auth/auth.service.js";
import { MembersService } from "./members/members.service.js";
import { PetsService } from "./pets/pets.service.js";
import { ReleasesService } from "./releases/releases.service.js";
import { AdoptionsService } from "./adoptions/adoptions.service.js";

import { JwtAuthGuard } from "./auth/jwt-auth.guard.js";
import { AdminAuthGuard } from "./auth/admin-auth.guard.js";
import { MemberAuthGuard } from "./auth/member-auth.guard.js";


class StubAuthService {}
class StubMembersService {}
class StubPetsService {}
class StubReleasesService {}
class StubAdoptionsService {}

/** Guard stub — always allows (spec gen never runs real HTTP requests) */
class AllowAllGuard {
  canActivate() {
    return true;
  }
}

@Module({
  controllers: [
    AuthController,
    MembersController,
    PetsController,
    ReleasesController,
    AdoptionsController,
    UploadController,
  ],
  providers: [
    // Service stubs
    { provide: AuthService, useClass: StubAuthService },
    { provide: MembersService, useClass: StubMembersService },
    { provide: PetsService, useClass: StubPetsService },
    { provide: ReleasesService, useClass: StubReleasesService },
    { provide: AdoptionsService, useClass: StubAdoptionsService },

    // Guard stubs - override the global-ish guards used via @UseGuards()
    { provide: JwtAuthGuard, useClass: AllowAllGuard },
    { provide: AdminAuthGuard, useClass: AllowAllGuard },
    { provide: MemberAuthGuard, useClass: AllowAllGuard },

    // Disable any APP_GUARD that might be registered globally
    { provide: APP_GUARD, useClass: AllowAllGuard },
  ],
})
export class SpecModule {}
