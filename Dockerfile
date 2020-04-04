FROM node 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3040

RUN npm install -g nodemon

CDM [ "npm", "start" ]