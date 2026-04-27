



dev-backend:
	cd backend && npm run dev

db-start:
	bash scripts/postgres-start.sh

db-stop:
	bash scripts/postgres-stop.sh

db-connect:
	bash scripts/postgres-connect.sh

db-migrate:
	bash scripts/db-migrate.sh

db-drop:
	bash scripts/db-drop.sh

setup:
	bash scripts/setup.sh