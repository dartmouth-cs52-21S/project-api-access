import { Router } from 'express';
import * as UserController from './controllers/user_controller';
import * as Portfolios from './controllers/portfolio_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

const handleCreatePortfolio = async (req, res) => {
  try {
    const result = await Portfolios.createPost(req.body, req.user);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

router.post('/signin', requireSignin, async (req, res) => {
  try {
    const token = UserController.signin(req.user);
    res.json({ token, email: req.user.email, authorname: req.body.authorname });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const token = await UserController.signup(req.body);
    res.json({ token, email: req.body.email, authorname: req.body.name });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.route('/portfolios')
  .post(requireAuth, handleCreatePortfolio);

/// your routes will go here

export default router;
