import { Router } from 'express';
import * as UserController from './controllers/user_controller';
import * as Portfolios from './controllers/portfolio_controller';
// import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// router.get('/', (req, res) => {
//   res.json({ message: 'Hello World' });
// });

const handleCreatePortfolio = async (req, res) => {
  try {
    // console.log('handlecreateportfolio', req.body);
    const result = await Portfolios.createPortfolio(req.params.templateId, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleGetTemplateImages = async (req, res) => {
  try {
    const result = await Portfolios.getTemplateImages();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleUpdatePortfolio = async (req, res) => {
  try {
    const result = await Portfolios.updatePortfolio(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleGetPortfolios = async (req, res) => {
  try {
    console.log('user id in handleGetPortfolios', req.user.id);
    const result = await UserController.getUserPortfolios(req.user.id);
    Portfolios.updatePortfolio(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleGetUserResume = async (req, res) => {
  try {
    console.log('resume');
    // const result = await UserController.getUserResume(req.user.id);
    const result = await UserController.getUserResume(req.params.userID);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleGetPortfolio = async (req, res) => {
  try {
    const result = Portfolios.getPortfolio(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// router.post('/signin', requireSignin, async (req, res) => {
//   try {
//     const token = UserController.signin(req.user);
//     res.json({ token, email: req.user.email, authorname: req.body.authorname });
//   } catch (error) {
//     res.status(422).send({ error: error.toString() });
//   }
// });

router.post('/signup', async (req, res) => {
  try {
    const token = await UserController.signup(req.body);
    res.json({ token, email: req.body.email, authorname: req.body.name });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.route('/resume/:userID')
  .get(handleGetUserResume);

// router.route('/resume')
//   .get(requireAuth, handleGetUserResume);

router.route('/templates')
  .get(handleGetTemplateImages);

// router.route('/portfolios')
//   .get(requireAuth, handleGetPortfolios);

// gets user's portfolios
router.route('/portfolios')
  .get(handleGetPortfolios);

router.route('/portfolios/create/:templateId')
  .post(handleCreatePortfolio);

router.route('/portfolios/:id')
  .get(handleGetPortfolio)
  .put(handleUpdatePortfolio);

export default router;
