# # syntax=docker/dockerfile:1

# # Setup base
# FROM node:18-alpine AS base
# WORKDIR /app

# # Initialize dependencies
# FROM base AS dependencies
# COPY frontend/package.json frontend/package-lock.json ./
# COPY frontend/next.config.js ./next.config.js
# RUN npm install

# # Run tests
# FROM dependencies AS test
# COPY frontend/src ./src
# RUN npm test

# # Build the app
# FROM dependencies AS builder
# COPY frontend/ ./
# RUN rm -rf .next
# RUN npm run build

# # Run the app
# FROM base AS runner
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
# COPY frontend/next.config.js ./next.config.js

# EXPOSE 3000

# CMD ["npm", "run", "start"]

# Dockerfile for Next.js (Development)
FROM node:18-alpine
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./

RUN npm install
COPY frontend/ ./

EXPOSE 3000
CMD ["npm", "run", "dev"]
