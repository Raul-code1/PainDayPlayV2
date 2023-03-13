FROM node:16-alpine as dev
WORKDIR /client
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 5173
CMD [ "yarn","dev" ]
