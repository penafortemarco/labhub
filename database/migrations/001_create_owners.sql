CREATE TABLE owners (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW(),
        name TEXT NOT NULL
);