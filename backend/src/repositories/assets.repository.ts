import pool from "../database";
import { AssetPayload } from "../types/item-payload";

export async function findAllAssets(): Promise<AssetPayload[]> {
        const result = await pool.query(`
            SELECT 
            i.id AS item_id,
            'asset' AS item_type,
            o.id AS owner_id,
            s.id AS storage_id,
            ac.id AS asset_category_id,
            a.name,
            a.status,
            a.brand,
            a.model,
            a.serial_number
            FROM items i
            INNER JOIN owners o ON i.owner_id = o.id
            INNER JOIN storages s ON i.storage_id = s.id
            INNER JOIN assets a ON a.item_id = i.id
            INNER JOIN asset_categories ac ON a.asset_category_id = ac.id
        `);
        return result.rows;
}