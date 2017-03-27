FROM node:7.7.4
RUN apt-get update 

CMD ["bin/bash","-c", "cd /var/www/leagueplay/public && npm install && cd app && ../node_modules/bower/bin/bower install --allow-root"]