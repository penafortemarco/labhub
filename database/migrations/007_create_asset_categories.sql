CREATE TABLE asset_categories (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW (),
        name TEXT NOT NULL UNIQUE,
        fields JSONB NOT NULL DEFAULT '{}'
);