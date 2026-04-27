import { Router } from "express";
import { findAll }from "../repositories/asset-categories.repository";

const router = Router()

router.get('/', async (req, res) => {
        const result = await findAll();
        res.json(result);
});


export default router;