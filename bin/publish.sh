#!/usr/bin/env bash

read -p "Publish package @oasis-sh/bot (y/n)? " -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  cd packages/api-client
  yarn publish
  cd ../
fi

