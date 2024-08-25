FROM nginx:stable

RUN mkdir -p /cert
WORKDIR /app
COPY build .
EXPOSE 443
EXPOSE 8080

CMD nginx -g "daemon off;"
