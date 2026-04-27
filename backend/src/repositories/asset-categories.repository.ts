import pool from "../database";
import { AssetCategory } from "../types/asset-category";

export async function findAll(): Promise<AssetCategory[]> {
        const result = await pool.query(`
            SELECT 
            id,
            created_at,
            name,
            fields
            FROM asset_categories
        `);
        return result.rows;
}