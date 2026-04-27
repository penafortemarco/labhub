#!/bin/bash
set -euo pipefail

source "$(dirname "$0")/../.env"
export PGPASSWORD=$DB_PASSWORD


if docker ps -a --format '{{.Names}}' | grep -q "^lab-postgres$"; then
  docker exec -i lab-postgres psql -U $DB_USER -d $DB_NAME -c "
    CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename TEXT NOT NULL
    );
  "

  for file in "$(dirname "$0")/../database/migrations"/*.sql; do
    filename=$(basename $file)
    already_run=$(docker exec -i lab-postgres psql -U $DB_USER -d $DB_NAME -tAc \
    "SELECT COUNT(*) FROM migrations WHERE filename='$filename'")

    if [ "$already_run" -eq "0" ]; then
      docker exec -i lab-postgres psql -U $DB_USER -d $DB_NAME < $file
      docker exec -i lab-postgres psql -U $DB_USER -d $DB_NAME -c \
      "INSERT INTO migrations (filename) VALUES ('$filename')"
    fi
      
  done

else
  echo "Container does not exist! Run postgres-start.sh script before."
fi