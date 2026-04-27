CREATE TABLE items (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW(),
        storage_id INTEGER NOT NULL REFERENCES storages(id),
        owner_id INTEGER NOT NULL REFERENCES owners(id)
);