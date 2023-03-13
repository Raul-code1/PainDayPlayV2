FROM node:16-alpine as dev
WORKDIR /backend
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 8000
CMD ["yarn","dev"]


