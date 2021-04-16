#!/bin/bash

read -p "Build Electron Wrapper? (y/n)? " -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  cd desktop

  # File to run build log
  filename="build-logs/build.txt"

  echo "trigger build" >> $filename
  git add -A
  git commit -m "trigger build"
  git pull
  git push origin staging
  cd ../
fi