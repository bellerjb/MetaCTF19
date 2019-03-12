FROM node:11-alpine

WORKDIR /usr/local/app

COPY package*.json ./
RUN npm ci --prod

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
