#!/bin/bash
set -euo pipefail

source "$(dirname "$0")/../.env"
export PGPASSWORD=$DB_PASSWORD

echo "Creating admin user..."

docker exec -i lab-postgres psql -U $DB_USER -d $DB_NAME << 'EOF'
INSERT INTO users (username, password, role)
VALUES (
  'admin',
  '$2b$10$OoT7di0XJJ0wal1n95xEGe.rMx0V03S.6HdRuiOtw/xMwHzjF0AEK',
  'admin'
)
ON CONFLICT (username) DO NOTHING;
EOF

echo "Admin created. Username: admin / Password: admin123"