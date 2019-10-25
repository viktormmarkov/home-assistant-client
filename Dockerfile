
FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=builder /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx-api.conf /etc/nginx/extra-conf.d/nginx-api.conf 