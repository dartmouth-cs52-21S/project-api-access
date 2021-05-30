/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import { Router } from 'express';
import * as UserController from './controllers/user_controller';
import * as Portfolios from './controllers/portfolio_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// router.get('/', (req, res) => {
//   res.json({ message: 'Hello World' });
// });

const handleCreatePortfolio = async (req, res) => {
  try {
    console.log('handlecreateportfolio body', req.body);
    console.log('handlecreateportfolio user', req.user);
    console.log('handlecreateportfolio templateid', req.params.templateId);

    const result = await Portfolios.createPortfolio(req.params.templateId, req.body, req.user);
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
    const userPortfolioIds = await UserController.getUserPortfolios(req.user.id);
    // Portfolios.updatePortfolio(req.params.id, req.body);
    console.log('user portfolio ids', userPortfolioIds);
    const portfolios = await Portfolios.getPortfolios(userPortfolioIds);
    // if (userPortfolioIds.length !== 0) {
    //   let i;
    //   for (i = 0; i < userPortfolioIds.length; i++) {
    //     portfolios.push(await Portfolios.getPortfolio(userPortfolioIds[i]));
    //   }
    // }
    console.log('user portfolios', portfolios);
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleGetUserResume = async (req, res) => {
  try {
    console.log('get resume');
    const result = await UserController.getUserResume(req.user.id);
    // const result = await UserController.getUserResume(req.params.userID);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleUpdateUserResume = async (req, res) => {
  try {
    console.log('update resume body', req.body);
    const result = await UserController.updateUserResume(req.user.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleGetPortfolio = async (req, res) => {
  try {
    // const result = Portfolios.getPortfolio(req.user.id); // Dont need user to be auth to see
    console.log('handleGetPortfolio', req.params.id);
    const result = await Portfolios.getPortfolio(req.params.id);
    console.log('result', result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleGetProfile = async (req, res) => {
  try {
    // const result = Portfolios.getPortfolio(req.user.id); // Dont need user to be auth to see
    console.log('handleGetProfile', req.user.id);
    const result = await UserController.getProfile(req.user.id);
    console.log('result', result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleUpdateProfile = async (req, res) => {
  try {
    // const result = Portfolios.getPortfolio(req.user.id); // Dont need user to be auth to see
    console.log('handleUpdateProfile', req.user.id);
    const result = await UserController.updateProfile(req.user.id, req.body);
    console.log('result', result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

router.post('/signin', requireSignin, async (req, res) => {
  try {
    console.log('user', req.user);
    const token = UserController.signin(req.user);
    res.json({
      token, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName,
    });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const token = await UserController.signup(req.body);
    console.log('post /signup', req.body);
    res.json({
      token, email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, resume: req.body.resume,
    });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.route('/resume')
  .get(requireAuth, handleGetUserResume)
  .put(requireAuth, handleUpdateUserResume);

router.route('/templates')
  .get(requireAuth, handleGetTemplateImages);

// get user's current list of portfolios
router.route('/portfolios')
  .get(requireAuth, handleGetPortfolios);

// gets user's portfolios
// router.route('/portfolios')
//   .get(handleGetPortfolios);

router.route('/profile')
  .get(requireAuth, handleGetProfile)
  .put(requireAuth, handleUpdateProfile);

router.route('/portfolios/create/:templateId')
  .post(requireAuth, handleCreatePortfolio);

router.route('/portfolios/:id')
  .get(handleGetPortfolio)
  .put(requireAuth, handleUpdatePortfolio);

export default router;
