#!/bin/bash

FOREGROUND=""
ARGS=()
for arg in "$@"; do
  if [[ $arg == "-f" ]]; then
    FOREGROUND="--no-daemon"
  else
    ARGS+=( $arg )
  fi
done

SCRIPTPATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PM2="$SCRIPTPATH/node_modules/pm2/bin/pm2"
SERVICE="JusBrasil-Oneformat"

RUN_CMD="$PM2 start server.js -i max --name $SERVICE"

for arg in "$@"; do
  case $arg in
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
        $PM2 delete $SERVICE --no-daemon
        ;;
  esac
done
