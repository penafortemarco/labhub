CREATE TABLE materials (
        item_id INTEGER PRIMARY KEY REFERENCES items(id),
        name TEXT NOT NULL,
        quantity NUMBER
);