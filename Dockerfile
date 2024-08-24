FROM nginx:stable

WORKDIR /app
COPY build .
COPY nginx.conf .
EXPOSE 443
EXPOSE 8080

CMD ["nginx", "-g", "'daemon off;'"]