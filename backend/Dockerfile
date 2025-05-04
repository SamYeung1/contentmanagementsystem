FROM node:23

WORKDIR /usr/src/app

RUN groupadd -r appgroup && useradd -r -g appgroup appuser

COPY package*.json ./

RUN npm install

COPY . .

RUN chown -R appuser:appgroup /usr/src/app

USER appuser

EXPOSE 3000

CMD ["npm", "run", "start"]