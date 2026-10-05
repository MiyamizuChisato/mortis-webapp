FROM node:24-alpine AS build-stage

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ENV CI=true

RUN pnpm build

FROM node:24-alpine AS production-stage

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build-stage /app/.output ./.output

EXPOSE 3000

CMD ["node",".output/server/index.mjs"]
