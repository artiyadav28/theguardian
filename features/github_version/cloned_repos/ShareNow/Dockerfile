FROM python:3.8.10 AS sharenow
RUN mkdir -p /opt/ShareNow
COPY ./ShareNow /opt/ShareNow
RUN pip3 install -r /opt/ShareNow/requirements.txt
RUN chmod +x /opt/ShareNow/gunicorn_start.sh
EXPOSE 8000
ENTRYPOINT ["/opt/ShareNow/gunicorn_start.sh"]

FROM nginx AS nginx
WORKDIR /etc/nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY ./Nginx-Server/sharenow.conf /etc/nginx/conf.d
EXPOSE 80