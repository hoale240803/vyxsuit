FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./
RUN npm install -g npm@latest
RUN npm install --frozen-lockfile

# Copy source code
COPY . .

# Build with memory optimization
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Install only production dependencies
RUN npm install --production

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]