#!/bin/bash

PM2="node_modules/pm2/bin/pm2"
SERVICE="JusBrasil-Oneformat"

case $1 in
  install)
      npm install
      ;;
  run)
      $PM2 start server.js -i max --name $SERVICE
      ;;
  stop) 
      $PM2 stop $SERVICE
      ;;
  restart)
      $PM2 restart $SERVICE
      ;;
  delete)
      $PM2 delete $SERVICE
      ;;
esac
