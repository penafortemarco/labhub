#!/bin/bash
set -euo pipefail

source "$(dirname "$0")/../.env"
export PGPASSWORD=$DB_PASSWORD

if ! docker ps -a --format '{{.Names}}' | grep -q "^lab-postgres$"; then
  echo "ERROR: Postgres container not running. Run make db-start first."
  exit 1
fi

echo "Seeding database..."

for file in "$(dirname "$0")"/sql/*.sql; do
  echo "Running $(basename $file)..."
  docker exec -i lab-postgres psql -U $DB_USER -d $DB_NAME < $file
done

echo "Seed complete."