CREATE TABLE storages (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW(),
        name TEXT NOT NULL,
        room_id INTEGER NOT NULL REFERENCES rooms(id)
);