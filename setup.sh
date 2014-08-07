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

CWD=$(pwd)
SCRIPTPATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PM2="$SCRIPTPATH/node_modules/pm2/bin/pm2"
SERVICE="JusBrasil-Oneformat"

cd $SCRIPTPATH
for arg in ${ARGS[*]}; do
  case $arg in
    install)
        npm install
        ;;
    run)
        $PM2 start server.js -i max --name $SERVICE $FOREGROUND
        ;;
    stop)
        $PM2 stop $SERVICE $FOREGROUND
        ;;
    restart)
        $PM2 restart $SERVICE $FOREGROUND
        ;;
    delete)
        $PM2 delete $SERVICE $FOREGROUND
        ;;
  esac
done
cd $CWD
