#!/bin/bash
set -euo pipefail

echo "Starting lab-inventory setup..."

# Step 1: check Docker is installed
if ! command -v docker &> /dev/null; then
  echo "ERROR: Docker is not installed. Install it first."
  exit 1
fi

echo "Docker found."

# Step 2: check .env exists
if [ ! -f "$(dirname "$0")/../.env" ]; then
  echo "No .env file found. Creating one from .env.example..."
  cp "$(dirname "$0")/../.env.example" "$(dirname "$0")/../.env"
  echo "STOP: Open .env, fill in your credentials, then run setup again."
  exit 1
fi

# Step 3: check password is not empty
source "$(dirname "$0")/../.env"

if [ -z "$DB_PASSWORD" ]; then
  echo "STOP: DB_PASSWORD is empty in your .env. Fill it in and run setup again."
  exit 1
fi

echo "Credentials found."

# Step 4: start Postgres
bash "$(dirname "$0")/postgres-start.sh"

# Step 5: make Postgres migrations
bash "$(dirname "$0")/db-migrate.sh"

echo "Setup complete."
