CREATE TABLE rooms (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW(),
        name TEXT NOT NULL,
        owner_id INTEGER NOT NULL REFERENCES owners(id)
);