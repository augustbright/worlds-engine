FROM node:14.17 as builder
WORKDIR /code
COPY package.json package-lock.json /code/
RUN npm install

COPY tsconfig.json webpack.config.js /code/
COPY src /code/src

RUN npm run build

FROM nginx:1.21
EXPOSE 3000
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./code/dist /usr/share/nginx/html