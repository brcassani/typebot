FROM oven/bun

WORKDIR /app

COPY . .

RUN apt-get -qy update && apt-get -qy --no-install-recommends install openssl ca-certificates git -y && update-ca-certificates

RUN bun install

# Need Node for Prisma
COPY --from=node:18 /usr/local/bin/node /usr/local/bin/node
RUN bun /app/packages/prisma/scripts/db-exec.ts "bunx prisma generate"

RUN rm -rf /usr/local/bin/node
RUN rm -rf /app/apps/builder
RUN rm -rf /app/apps/viewer

RUN echo "hi"
RUN cat /app/packages/env/env.ts

ENV PORT=3000
EXPOSE 3000
CMD ["bun", "run", "apps/chat-api/src/index.ts"]
