# Managing Docker Deployments

## Basic Info
1. Oasis uses docker-commpose to orchestrate mutliple Docker Containers
2. The beta and prod deployments use external docker networks for communication (You may need to start it seperately after a restart)

## Dev
**Starting and Restarting**
*Not all commands need to be run*
```bash
# Move to dev directory
cd /opt/oasis/docker/dev

# Pull newest docker image
docker pull ghcr.io/oasis-sh/oasis:latest

# Start all docker containers
docker-compose up

# Stop web
docker-compose stop web

# Remove web (needed to restart with new image)
docker-compose rm web

# Start web again
docker-compose up

# Remove unused docker images (saves space)
docker image prune
```

**Viewing logs**
```bash
# View web and api logs
docker logs dev_web_1

# View postgres logs
docker logs dev_postgres_1

# View redis logs
docker logs dev_redis_1
```

## Beta-Prod Redis and Postgres
**Starting and Restarting**
*Not all commands need to be run*
```bash
# Move to beta-prod directory
cd /opt/oasis/docker/beta-prod

# Start external network (may be needed after restart)
./create-net.sh

# Start redis and postgres
docker-compose up

# Take down redis and postgres
docker-compose down
```

**Viewing logs**
```bash
# View postgres logs
docker logs beta-prod_postgres_1

# View redis logs
docker logs beta-prod_redis_1
```

## Beta
**Starting and Restarting**
*Not all commands need to be run*
```bash
# Move to beta directory
cd /opt/oasis/docker/beta

# Pull newest docker image
docker pull ghcr.io/oasis-sh/oasis:beta

# Start all docker containers
docker-compose up

# Stop and remove (leaves postgres and redis)
docker-compose down

# Start web again
docker-compose up

# Remove unused docker images (saves space)
docker image prune
```

**Viewing logs**
```bash
# View web and api logs
docker logs beta_web_1
```

## Prod
**Starting and Restarting**
*Not all commands need to be run*
```bash
# Move to prod directory
cd /opt/oasis/docker/prod

# Pull newest docker image
docker pull ghcr.io/oasis-sh/oasis:prod

# Start all docker containers
docker-compose up

# Stop and remove (leaves postgres and redis)
docker-compose down

# Start web again
docker-compose up

# Remove unused docker images (saves space)
docker image prune
```

**Viewing logs**
```bash
# View web and api logs
docker logs prod_web_1
```
