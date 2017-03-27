FROM node:7.7.4
RUN apt-get update && python2.7 && npm install -g nodemon

EXPOSE  3000

CMD ["bin/bash","-c", "cd /var/www/leagueplay && npm install && npm run start"]