#!/usr/bin/env bash

read -p "Deploy to production (y/n)?" -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  yarn lint && yarn deploy:prod
fi
