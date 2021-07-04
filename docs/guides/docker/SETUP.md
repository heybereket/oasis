# Docker Setup

This guide will walk you through how Oasis is deployed on our dev, beta, and production server

## Requirements
1. A server (I recomened a t2.micro instance from aws. You can get it for free for a year)
2. Docker

## Getting Started
1. First chose a directory to work in. I will be using `/opt/oasis`
```bash
mkdir /opt/oasis
cd /opt/oasis
```
2. Chose which environment to setup. You can mix and match the setups but this guide will be set up exactly how oasis currently runs in production. I will start with dev
```bash
mkdir dev
cd dev
```
3. Create a `docker-compose.yml` file
```bash
nano docker-compose.yml
```
4. Add the docker config to the `docker-compose.yml` file
```
version: "3.9"
services:
  web:
    restart: always
    image: ghcr.io/oasis-sh/oasis:latest
    restart: always
    ports:
      - "5001:3000"
    links:
      - redis
      - postgres
    env_file: docker/.dockerenv

  redis:
    image: redis

  postgres:
    restart: always
    image: postgres:13.0-alpine
    environment:
      POSTGRES_USER: oasis
      POSTGRES_PASSWORD: **Put a password here**
    ports:
      - "5002:5432"
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
```
5. Create a `.dockerenv` file
```bash
mkdir docker
nano docker/.dockernv
```
6. Add your env variables to the dockerenv file (example can be found in /docker/.dockerenv.example)
7. Start the containers (they may take a few minutes to download)
```bash
docker-compose up
```
