CREATE TYPE action_type AS ENUM (
  'CREATE',
  'UPDATE',
  'DELETE'
);

CREATE TABLE audit_log (
  id         SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  user_id    INTEGER REFERENCES users(id),
  action     action_type NOT NULL,  -- 'CREATE', 'UPDATE', 'DELETE'
  table_name TEXT NOT NULL,  -- 'components', 'assets', 'owners', etc.
  item_id    INTEGER,        -- the affected row id
  details    JSONB           -- optional extra info
);