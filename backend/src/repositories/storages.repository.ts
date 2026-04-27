import pool from "../database";
import { Storage } from './../types/storage';

export async function findAll(): Promise<Storage[]> {
        const result = await pool.query('SELECT * FROM storages');
        return result.rows;
}

export async function findById(id: number): Promise<Storage | null> {
        const result = await pool.query('SELECT * FROM storages WHERE id = $1', [id]);
        return result.rows[0] || null;
}

export async function findByName(name: string): Promise<Storage | null> {
        const result = await pool.query('SELECT * FROM storages WHERE name = $1', [name]);
        return result.rows[0] || null;
}

export async function findByRoomId(room_id: number): Promise<Storage[]> {
        const result = await pool.query('SELECT * FROM storages WHERE room_id = $1', [room_id]);
        return result.rows;
}