FROM node:14 as base
WORKDIR /usr/src/server
COPY package*.json ./
RUN npm -i --only=production

FROM node:14-alpine
WORKDIR /usr/src/server
COPY --from=base /usr/src/server
COPY . .

EXPOSE 3001

CMD npm start
