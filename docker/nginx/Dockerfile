FROM nginx:latest

# configuring
RUN rm /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf
ADD ./nginx.conf /etc/nginx/
ADD ./leagueplay.conf /etc/nginx/conf.d/