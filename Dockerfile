FROM node 

WORKDIR /app

COPY package.json ./ 

RUN yarn install

COPY . .

EXPOSE 3040

RUN npm install -g nodemon

CMD [ "npm", "start" ]