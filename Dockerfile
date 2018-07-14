FROM node:10.6.0

WORKDIR /opt/webcore
COPY package.json .
COPY package-lock.json .

RUN npm install