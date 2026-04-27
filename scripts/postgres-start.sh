#!/bin/bash
set -euo pipefail

source "$(dirname "$0")/../.env"

if docker ps -a --format '{{.Names}}' | grep -q "^lab-postgres$"; then
  echo "Container already exists. Starting if stopped..."
  docker start lab-postgres
else
  echo "Creating container..."
  docker run -d \
    --name lab-postgres \
    --restart unless-stopped \
    -e POSTGRES_DB=$DB_NAME \
    -e POSTGRES_USER=$DB_USER \
    -e POSTGRES_PASSWORD=$DB_PASSWORD \
    -v lab-postgres-data:/var/lib/postgresql/data \
    -p $DB_PORT:5432 \
    postgres:16
fi

echo "Waiting for Postgres to be ready..."
sleep 3

docker logs lab-postgres --tail 5