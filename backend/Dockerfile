FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

# Install app dependencies
RUN npm install

COPY . .



EXPOSE 3000

CMD ["npm", "run", "start"]