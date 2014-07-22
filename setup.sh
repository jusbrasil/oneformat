#!/bin/bash

case $1 in
  install)
      npm install
      ;;
  run)
      node_modules/pm2/bin/pm2 start server.js -i max --name JusBrasil-Oneformat
      ;;
  stop) 
      node_modules/pm2/bin/pm2 stop JusBrasil-Oneformat
      ;;
  restart)
      node_modules/pm2/bin/pm2 restart JusBrasil-Oneformat
      ;;
  delete)
      node_modules/pm2/bin/pm2 delete JusBrasil-Oneformat
      ;;
esac
