#!/bin/bash

case $1 in
  install)
      npm install
      ;;
  run)
      node_modules/pm2/bin/pm2 start server.js
      ;;
  stop) 
      node_modules/pm2/bin/pm2 stop server.js
      ;;
  restart)
      node_modules/pm2/bin/pm2 restart server.js
      ;;
esac
