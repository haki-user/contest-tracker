# syntax=docker/dockerfile:1.4

# -----------------------------------------------------------------------------
# Base image with Node.js
# -----------------------------------------------------------------------------
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine AS alpine
RUN apk update && apk add --no-cache libc6-compat

# -----------------------------------------------------------------------------
# Setup Yarn and TurboRepo on the alpine base
# -----------------------------------------------------------------------------
FROM alpine as base
RUN npm install -g turbo

# -----------------------------------------------------------------------------
# Prune projects to isolate the target project
# -----------------------------------------------------------------------------
FROM base AS pruner
ARG PROJECT=api

WORKDIR /app
COPY . .

# Prune the workspace, creating an isolated output for the specified project
RUN turbo prune --scope=${PROJECT} --docker

# -----------------------------------------------------------------------------
# Build the project
# -----------------------------------------------------------------------------
FROM base AS builder
ARG PROJECT=api

WORKDIR /app

# Copy lockfile and workspace configuration of isolated subworkspace
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
COPY --from=pruner /app/out/json/ .

# Install dependencies (cached)
RUN --mount=type=cache,id=yarn-cache,target=/root/.cache/yarn \
    yarn install --frozen-lockfile

# Copy source code of the isolated subworkspace
COPY --from=pruner /app/out/full/ .

# Build the project for the specified scope
RUN yarn build --filter=${PROJECT}

# Clean up production dependencies
RUN rm -rf node_modules && rm -rf ./**/*/src
RUN yarn install --production --frozen-lockfile --ignore-scripts --prefer-offline

# -----------------------------------------------------------------------------
# Final image for production
# -----------------------------------------------------------------------------
FROM alpine AS runner
ARG PROJECT=api

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

WORKDIR /app
COPY --from=builder --chown=nodejs:nodejs /app .
WORKDIR /app/apps/${PROJECT}

ARG PORT=8080
ENV PORT=${PORT}
ENV NODE_ENV=production
EXPOSE ${PORT}

CMD node dist/index.js

