FROM nginx
LABEL name="vue-phone"
LABEL version="1.0"
COPY ./dist /usr/share/nginx/vue-phone
COPY ./vue-phone.conf  /etc/nginx/conf.d
EXPOSE 80