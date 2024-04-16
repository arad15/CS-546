import {Router} from 'express';
const router = Router();

router.get('/', async (req, res) => {
  res.json({route: '/private', method: req.method});
});

router.get('/dashboard', async (req, res) => {
  res.json({route: '/private/dashboard', method: req.method});
});

export default router;
