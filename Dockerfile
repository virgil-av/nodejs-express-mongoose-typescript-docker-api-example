FROM node:8

LABEL Maintainer = Avram Virgil
LABEL Name = Docker Demo App
RUN apt-get update
WORKDIR /app
COPY package*.json ./
RUN npm ci
ENV PATH="./node_modules/.bin:${PATH}"

