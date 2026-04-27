import pool from "../database";
import { ComponentType } from "../types/component-type";

export async function findAll(): Promise<ComponentType[]> {
        const result = await pool.query(`
            SELECT 
            id,
            created_at,
            name,
            fields
            FROM component_types
        `);
        return result.rows;
}