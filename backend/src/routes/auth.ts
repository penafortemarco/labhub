import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import { Router } from "express";
import { findByUsername, create } from "../repositories/users.repository";
import { authenticate } from "../middleware/authenticate.middleware";
import { authorize } from "../middleware/authorize.middleware";
const router = Router()

router.post('/login', async (req, res) => {
        
        const { username, password } = req.body;        

        const user = await findByUsername(username);
        if (!user) {
                res.status(401).json({ error: 'Not found' });
                return;
        }

        const match = await compare(password, user.password);
        if (!match) {
                res.status(401).json({ error: 'Not found' });
                return;
        }

        const token = jwt.sign(
                { id: user.id, role: user.role },  // payload
                process.env.JWT_SECRET!,            // secret key
                { expiresIn: '12h' }                // token expires in 8 hours
        );

        res.json({ token });
});

router.post('/register', authorize(['admin']), async (req, res) => {
        
        const { username, password } = req.body;        
        const p_hash = await hash(password, 10);
        const response = await create( username, p_hash );
        if (!response) {
                res.status(400).json({ error: 'User cant be created' });
                return;
        }
        res.json({
                created_at: response?.created_at,
                username: response?.username,
                role: response.role
        });
});

export default router;