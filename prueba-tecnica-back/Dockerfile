FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV NOVE_ENV=production

EXPOSE 4200
CMD ["npm", "start"]