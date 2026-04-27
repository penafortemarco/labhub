import pool from "../database";
import { User } from "../types/user";

export async function findAll(): Promise<User[]> {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
}

export async function findById(id: number): Promise<User | null> {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0] || null;
}

export async function findByUsername(username: string): Promise<User | null> {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0] || null;
}

export async function create(username: string, password: string): Promise<User | null> {
        const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
        return result.rows[0] || null;
}