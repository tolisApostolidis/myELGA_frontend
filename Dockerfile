# ----------- Stage 1: Build -----------
FROM node:20-alpine3.22 AS stage-build

WORKDIR /build

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ----------- Stage 2: Runtime -----------
FROM nginx:1.31.3-alpine 

LABEL maintainer="tolisapo"

COPY --from=stage-build /build/dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]