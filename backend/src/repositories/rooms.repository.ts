import pool from "../database";
import { Room } from "../types/room";

export async function findAll(): Promise<Room[]> {
        const result = await pool.query('SELECT * FROM rooms');
        return result.rows;
}

export async function findById(id: number): Promise<Room | null> {
        const result = await pool.query('SELECT * FROM rooms WHERE id = $1', [id]);
        return result.rows[0] || null;
}

export async function findByName(name: string): Promise<Room | null> {
        const result = await pool.query('SELECT * FROM rooms WHERE name = $1', [name]);
        return result.rows[0] || null;
}

export async function findByOwnerId(owner_id: number): Promise<Room[]> {
        const result = await pool.query('SELECT * FROM rooms WHERE owner_id = $1', [owner_id]);
        return result.rows;
}