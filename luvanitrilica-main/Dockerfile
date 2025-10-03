FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install -g pnpm

RUN pnpm install

RUN npm install -g serve

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["serve", "-s", "dist"]