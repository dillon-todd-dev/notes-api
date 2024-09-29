FROM node:22.7.0-alpine

WORKDIR /code

COPY prisma .

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:migrate:prod" ]
