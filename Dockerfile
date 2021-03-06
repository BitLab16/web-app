FROM node:lts-alpine as build-stage
WORKDIR /app
COPY src ./
COPY public ./
COPY db.json ./
COPY package.json ./
COPY babel.config.js ./
RUN echo ------------------------
RUN ls *
RUN echo ------------------------
RUN rm -rf node_modules
RUN npm install
EXPOSE 80
CMD ["npm", "run", "serve;"]