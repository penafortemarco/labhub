import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import ownersRouter from './routes/owners';
import roomsRouter from './routes/rooms';
import storagesRouter from './routes/storages';
import itemsRouter from './routes/items';
import componentTypesRouter from './routes/component-types';
import assetCategoriesRouter from './routes/asset-categories';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import { authenticate } from './middleware/authenticate.middleware';
import { authorize } from './middleware/authorize.middleware';

const app = express();
const api = app.router
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:4200',
    }),
);

app.use('/auth', authRouter);

api.use(authenticate, authorize(['regular', 'admin']));
api.use('/owners', ownersRouter);
api.use('/rooms', roomsRouter);
api.use('/storages', storagesRouter);
api.use('/items', itemsRouter);
api.use('/component-types', componentTypesRouter);
api.use('/asset-categories', assetCategoriesRouter);
api.use('/users', usersRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
