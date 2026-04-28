import { Router } from "express";
import { findAll, findById, findByName, createOwner } from "../repositories/owners.repository";
import { authenticate } from "../middleware/authenticate.middleware";
import { authorize } from "../middleware/authorize.middleware";

const router = Router()

router.get('/', async (req, res) => {
        const result = await findAll();
        res.json(result);
});

router.get('/by_name/:name', async (req, res) => {
        const result = await findByName(req.params.name);
        if (!result) {
                res.status(404).json({ error: 'Not found' });
                return;
        }
        res.json(result);
});

router.get('/:id', async (req, res) => {
        const result = await findById(parseInt(req.params.id));
        if (!result) {
                res.status(404).json({ error: 'Not found' });
                return;
        }
        res.json(result);
});

// Protected Routes
router.post('/', authorize(['admin']), async (req, res) => {
        const { name } = req.body;
        const result = await createOwner(name);
        if (!result) {
                res.status(404).json({ error: 'Not found' });
                return;
        }
        res.json(result);
});

export default router;