FROM oven/bun:1.2-slim AS builder

WORKDIR /usr/app

COPY bun.lockb ./
COPY package.json ./
RUN bun install --frozen-lockfile

COPY . ./
RUN bun run build
RUN bun install --production

FROM oven/bun:1.2-slim AS runner
ENV NODE_ENV production
WORKDIR /usr/app

COPY --from=builder /usr/app/package.json ./package.json
COPY --from=builder /usr/app/bun.lockb ./bun.lockb
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/dist ./dist

ENTRYPOINT ["bun", "run", "start:prod"]
