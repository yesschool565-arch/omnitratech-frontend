# Multi-stage build for OmnitraTech Frontend
# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Frontend (for docker-compose)
FROM node:18-alpine AS frontend
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
EXPOSE 5175
CMD ["npm", "run", "dev"]

# Stage 3: Production
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package.json package-lock.json* ./
RUN npm install --production
EXPOSE 5175
CMD ["npm", "run", "preview"]
