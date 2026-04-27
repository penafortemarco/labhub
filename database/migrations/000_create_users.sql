CREATE TYPE user_role AS ENUM (
  'regular',
  'admin'
);

CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW(),
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role user_role NOT NULL DEFAULT 'regular'
);