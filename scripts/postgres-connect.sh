#!/bin/bash
set -euo pipefail

source "$(dirname "$0")/../.env"

docker exec -it lab-postgres psql -U $DB_USER -d $DB_NAME