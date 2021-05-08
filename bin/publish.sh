#!/usr/bin/env bash

read -p "Publish package @oasis-sh/bot (y/n)? " -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  cd packages/bot-client
  yarn publish
  cd ../
fi

