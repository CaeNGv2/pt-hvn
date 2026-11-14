# To cache prod deps for runner
FROM oven/bun:1.4-slim AS prod-deps
WORKDIR /usr/app
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile --production

FROM oven/bun:1.4-slim AS builder

WORKDIR /usr/app

COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

COPY . ./
RUN bun run build

FROM oven/bun:1.4-slim AS runner
ENV NODE_ENV production
WORKDIR /usr/app

COPY --from=prod-deps /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/package.json ./package.json
COPY --from=builder /usr/app/bun.lock ./bun.lock
COPY --from=builder /usr/app/dist ./dist

ENTRYPOINT ["bun", "run", "start:prod"]
