#!/bin/bash
set -euo pipefail

source "$(dirname "$0")/../.env"

echo "WARNING: This will destroy all data."
read -p "Are you sure? (y/N) " confirm

if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
  echo "Aborted."
  exit 0
fi

if docker ps -a --format '{{.Names}}' | grep -q "^lab-postgres$"; then
  echo "Stopping and removing container..."
  docker stop lab-postgres
  docker rm lab-postgres
fi

if docker volume ls --format '{{.Name}}' | grep -q "^lab-postgres-data$"; then
  echo "Removing volume..."
  docker volume rm lab-postgres-data
fi

echo "Database destroyed. Run make setup to start fresh."