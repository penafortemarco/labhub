import pool from "../database";
import { Owner } from "../types/owner";

export async function findAll(): Promise<Owner[]> {
        const result = await pool.query('SELECT * FROM owners');
        return result.rows;
}

export async function findById(id: number): Promise<Owner | null> {
        const result = await pool.query('SELECT * FROM owners WHERE id = $1', [id]);
        return result.rows[0] || null;
}

export async function findByName(name: string): Promise<Owner | null> {
        const result = await pool.query('SELECT * FROM owners WHERE name = $1', [name]);
        return result.rows[0] || null;
}

export async function create(name: string): Promise<Owner | null> {
        const result = await pool.query('INSERT INTO owners (name) VALUES ($1) RETURNING *', [name]);
        return result.rows[0] || null;
}