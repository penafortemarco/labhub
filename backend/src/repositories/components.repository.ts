import pool from '../database';
import { ComponentPayload } from '../types/item-payload';
import { createItem } from './items.repository';

export async function findAllComponents(): Promise<ComponentPayload[]> {
    const result = await pool.query(`
            SELECT 
            i.id AS item_id,
            'component' as item_type,
            o.id AS owner_id,
            s.id AS storage_id,
            ct.id AS component_type_id,
            c.quantity,
            c.attributes
            FROM items i
            INNER JOIN owners o ON i.owner_id = o.id
            INNER JOIN storages s ON i.storage_id = s.id
            INNER JOIN components c ON c.item_id = i.id
            LEFT JOIN component_types ct ON ct.id = c.component_type_id
        `);
    return result.rows;
}

export async function insertComponent(
    payload: ComponentPayload,
): Promise<void> {
    const item = await createItem(payload.storage_id, payload.owner_id);

    if (!item) throw new Error('Failed to create item');

    await pool.query(
        'INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES ($1, $2, $3, $4)',
        [item.id, payload.quantity, payload.component_type_id, payload.attributes],
    );
}
