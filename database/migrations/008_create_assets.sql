CREATE TYPE asset_status AS ENUM (
  'active',
  'needs_repair',
  'under_repair',
  'inactive'
);

CREATE TABLE assets (
        item_id INTEGER PRIMARY KEY REFERENCES items(id),
        asset_category_id INTEGER NOT NULL REFERENCES asset_categories(id),
        name TEXT NOT NULL,
        serial_number TEXT,
        brand TEXT,
        model TEXT,
        status asset_status NOT NULL DEFAULT 'active'
);