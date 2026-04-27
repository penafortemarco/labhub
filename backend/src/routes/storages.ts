import { Router } from "express";
import { findAll, findById, findByName, findByRoomId } from "../repositories/storages.repository";

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

router.get('/by_room/:room_id', async (req, res) => {
        const result = await findByRoomId(parseInt(req.params.room_id));
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


export default router;