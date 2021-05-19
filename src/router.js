import { Router } from 'express';
import * as Users from './controllers/user_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

/// your routes will go here

export default router;
