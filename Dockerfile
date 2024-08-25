FROM nginx:stable

RUN mkdir -p /cert
WORKDIR /app
COPY build .
COPY nginx.conf /etc/nginx/
EXPOSE 443
EXPOSE 8080

CMD nginx -g "daemon off;"
