// src/middleware/audit.middleware.ts
import { Request, Response, NextFunction } from 'express';
import pool from '../database';

export const locationAuditMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.AUDIT_LOG !== 'true') return next();

  const locationFields = ['owner_id', 'storage_id'];
  const hasLocationChange = locationFields.some(f => f in req.body);

  if (!hasLocationChange) return next();

  res.on('finish', () => {
    if (res.statusCode >= 400) return;
    const user_id = (req as any).user?.id ?? null;
    const item_id = parseInt(req.params.id as string);
    console.log(`${user_id}, 'UPDATE', 'items', ${item_id}, ${JSON.stringify(req.body)}`)
    pool.query(
      'INSERT INTO audit_log (user_id, action, table_name, item_id, details) VALUES ($1, $2, $3, $4, $5)',
      [user_id, 'UPDATE', 'items', item_id, JSON.stringify(req.body)]
    ).catch(console.error);
  });

  next();
};