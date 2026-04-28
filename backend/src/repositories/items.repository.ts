import pool from '../database';
import { Item } from '../types/item';

export async function createItem(
    storage_id: number,
    owner_id: number,
): Promise<Item | null> {
    const result = await pool.query(
        'INSERT INTO items (storage_id, owner_id) VALUES ($1, $2) RETURNING *',
        [storage_id, owner_id],
    );
    return result.rows[0] || null;
}

export async function updateItem(
    item_id: number,
    storage_id: number | null,
    owner_id: number | null,
): Promise<Item | null> {
    const result = await pool.query(
        'UPDATE items SET storage_id = COALESCE($1, storage_id), owner_id = COALESCE($2, owner_id) WHERE id = $3',
        [storage_id, owner_id, item_id],
    );
    return result.rows[0] || null;
}
