FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install sweetalert2

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
