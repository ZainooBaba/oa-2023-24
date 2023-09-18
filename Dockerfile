FROM node:18
WORKDIR /app
COPY /backend/package*.json ./
RUN npm install
COPY /backend/index.js ./
#COPY . /app/backend
CMD cd app
CMD node index.js