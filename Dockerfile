FROM node:latest
RUN npm install webpack -g
WORKDIR /tmp
ADD package.json /tmp/package.json
RUN npm config set registry https://registry.npmjs.org/ && npm install
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN cp -a /tmp/node_modules /usr/src/app/
RUN webpack
ENV NODE_ENV=production
CMD [ "node_modules/.bin/babel-node","app.js" ]
EXPOSE 5050
