CREATE TABLE components (
        item_id INTEGER PRIMARY KEY REFERENCES items(id),
        component_type_id INTEGER REFERENCES component_types(id),
        quantity INTEGER NOT NULL CHECK (quantity >= 0),
        attributes JSONB NOT NULL DEFAULT '{}'
);