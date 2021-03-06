FROM node:lts-alpine as build-stage
WORKDIR /app
COPY src ./
COPY public ./
COPY db.json ./
COPY package.json ./
COPY babel.config.js ./
RUN npm install && npm run build

FROM nginx:stable-alpine
COPY --from=build-stage /app/db.json /usr/share/nginx/html
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]