/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import { Router } from 'express';
import * as UserController from './controllers/user_controller';
import * as Portfolios from './controllers/portfolio_controller';
import * as Images from './controllers/image_controller';
import { requireAuth, requireSignin } from './services/passport';
import signS3 from './services/s3';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

router.get('/sign-s3', signS3);

const handleCreatePortfolio = async (req, res) => {
  try {
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

const handleDeletePortfolio = async (req, res) => {
  try {
    const result = await Portfolios.deletePortfolio(req.params.id, req.user);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleGetPortfolios = async (req, res) => {
  try {
    const userPortfolioIds = await UserController.getUserPortfolios(req.user.id);
    const portfolios = await Portfolios.getPortfolios(userPortfolioIds);
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleGetPortfolio = async (req, res) => {
  try {
    const result = await Portfolios.getPortfolio(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleGetProfile = async (req, res) => {
  try {
    const result = await UserController.getProfile(req.user.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleUpdateProfile = async (req, res) => {
  try {
    const result = await UserController.updateProfile(req.user.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const handleCreateImage = async (req, res) => {
  try {
    const result = await Images.createImage(req.body.url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const handleUpdateImage = async (req, res) => {
  try {
    const result = await Images.updateImage(req.body.id, req.body.url);
    console.log('handleUpdateImage', result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

router.post('/signin', requireSignin, async (req, res) => {
  try {
    const token = UserController.signin(req.user);
    res.json({
      token, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName,
    });
  } catch (error) {
    res.status(422).json({ error: error.toString() });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const token = await UserController.signup(req.body);
    res.json({
      token, email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, resume: req.body.resume,
    });
  } catch (error) {
    res.status(422).json({ error: error.toString() });
  }
});

router.route('/templates')
  .get(requireAuth, handleGetTemplateImages);

// get user's current list of portfolios
router.route('/portfolios')
  .get(requireAuth, handleGetPortfolios);

router.route('/profile')
  .get(requireAuth, handleGetProfile)
  .put(requireAuth, handleUpdateProfile);

router.route('/portfolios/create/:templateId')
  .post(requireAuth, handleCreatePortfolio);

router.route('/portfolios/:id')
  .get(handleGetPortfolio)
  .put(requireAuth, handleUpdatePortfolio)
  .delete(requireAuth, handleDeletePortfolio);

router.route('/images')
  .post(handleCreateImage)
  .put(handleUpdateImage);

export default router;
