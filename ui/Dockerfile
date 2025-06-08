FROM docker.io/node:23-alpine3.21 AS base

FROM base AS builder
RUN apk add pnpm libc6-compat

WORKDIR /app

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile

COPY ./src ./src
COPY ./next.config.mjs ./jsconfig.json ./

RUN pnpm build

FROM base AS runner
WORKDIR /app

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs \
    && mkdir .next \
    && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]