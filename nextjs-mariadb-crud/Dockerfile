FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install -g npm@latest
RUN npm install --frozen-lockfile

COPY . .
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app /app

RUN npm install -g npm@latest
RUN npm install --production

CMD ["npm", "run", "start"]
