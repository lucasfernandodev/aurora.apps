from node:20-alpine
RUN apk --no-cache add --update docker openrc docker-compose
RUN rc-update add docker boot
RUN mkdir -p /home/node/aurora.app/node_modules && chown -R node:node /home/node/aurora.app
WORKDIR /home/node/aurora.app
CMD ['rm', '-rf', './dist']
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN npm run build
User root
CMD [ "node", "./dist/index.js" ]

