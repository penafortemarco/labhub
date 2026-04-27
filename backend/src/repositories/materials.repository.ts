import pool from "../database";
import { MaterialPayload } from "../types/item-payload";

export async function findAllMaterials(): Promise<MaterialPayload[]> {
        const result = await pool.query(`
            SELECT 
            i.id AS item_id,
            'material' AS item_type,
            o.id AS owner_id,
            s.id AS storage_id,
            m.name
            FROM items i
            INNER JOIN owners o ON i.owner_id = o.id
            INNER JOIN storages s ON i.storage_id = s.id
            INNER JOIN materials m ON m.item_id = i.id
        `);
        return result.rows;
}