#!/bin/bash

PM2="node_modules/pm2/bin/pm2"
SERVICE="JusBrasil-Oneformat"

RUN_CMD="$PM2 start server.js -i max --name $SERVICE"

case $1 in
  install)
      npm install
      ;;
  run)
      $RUN_CMD
      ;;
  run-foreground)
      $RUN_CMD --no-daemon
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
