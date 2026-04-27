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
