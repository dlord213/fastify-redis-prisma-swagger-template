FROM node:25.2.1-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

RUN npm ci

COPY src ./src

RUN npx prisma generate

RUN npm run build

EXPOSE 10000

CMD ["node", "dist/server.js"]