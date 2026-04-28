import pool from '../database';
import { ComponentPayload } from '../types/item-payload';
import { createItem, updateItem } from './items.repository';

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

    if (payload.owner_id === null) throw Error('Missing owner_id');
    if (payload.storage_id === null) throw Error('Missing storage_id');
    if (payload.quantity === null) throw Error('Missing quantity');
    if (payload.component_type_id === null) throw Error('Missing component_type_id');
    if (payload.attributes === null) throw Error('Missing attributes');

    const item = await createItem(payload.storage_id, payload.owner_id);

    if (!item) throw new Error('Failed to create item');

    await pool.query(
        'INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES ($1, $2, $3, $4)',
        [
            item.id,
            payload.quantity,
            payload.component_type_id,
            payload.attributes,
        ],
    );
}

export async function updateComponent(
    payload: ComponentPayload,
): Promise<void> {
    if (payload.item_id === null) throw Error('Missing item_id');

    const item = await updateItem(
        payload.item_id,
        payload.storage_id,
        payload.owner_id,
    );

    await pool.query(
        `UPDATE components 
        SET 
        quantity = COALESCE($1, quantity),
        component_type_id = COALESCE($2, component_type_id),
        attributes = COALESCE($3, attributes)
        WHERE item_id = $4`,
        [
            payload.quantity,
            payload.component_type_id,
            payload.attributes,
            payload.item_id,
        ],
    );
}
