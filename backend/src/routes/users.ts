import { Router } from 'express';
import { findAll } from '../repositories/users.repository';
import { authenticate } from '../middleware/authenticate.middleware';
import { authorize } from '../middleware/authorize.middleware';

const router = Router();

router.get('/', authorize(['admin']), async (req, res) => {
    const result = await findAll();
    res.json(result);
});

export default router;
