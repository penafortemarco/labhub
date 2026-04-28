import { Router } from 'express';
import {
    findAllComponents,
    insertComponent,
    updateComponent,
} from '../repositories/components.repository';
import { findAllAssets } from '../repositories/assets.repository';
import { findAllMaterials } from '../repositories/materials.repository';
import { ComponentPayload, ItemPayload } from '../types/item-payload';

const router = Router();

router.get('/components', async (req, res) => {
    const result = await findAllComponents();
    res.json(result);
});

router.get('/assets', async (req, res) => {
    const result = await findAllAssets();
    res.json(result);
});

router.get('/materials', async (req, res) => {
    const result = await findAllMaterials();
    res.json(result);
});

router.post('/', async (req, res) => {
    const item = req.body as ItemPayload;
    if (item.item_type === 'component') {
        await insertComponent(item as ComponentPayload);
        res.status(201).json({ message: 'Component created' });
    } else if (item.item_type === 'asset') {
    } else if (item.item_type === 'material') {
    } else {
        res.json({ error: 'Invalid item.item_type' });
    }
});

router.patch('/:id', async (req, res) => {
    const item = req.body as ItemPayload;

    if (item.item_type === 'component') {
        await updateComponent(item as ComponentPayload);
        res.status(201).json({ message: 'Component updated' });
    } else if (item.item_type === 'asset') {
    } else if (item.item_type === 'material') {
    } else {
        res.json({ error: 'Invalid item.item_type' });
    }
});

export default router;
