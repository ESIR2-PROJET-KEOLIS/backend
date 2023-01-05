FROM node:18-slim AS builder
#RUN apt-get update
#RUN apt-get install -y openssl
WORKDIR /usr/src/app

COPY . ./

RUN npm install
RUN npm run build

EXPOSE 3500
EXPOSE 4000

CMD ["npm", "run", "start:prod"]
