/* eslint-disable import/prefer-default-export */
/* eslint-disable no-const-assign */
import Portfolio from '../models/portfolio_model';
import User from '../models/user_model';

const templates = {
  0: {
    header: {
      display: true,
      color: 'white',
      backgroundColor: 'black',
      font: 'Raleway',
      fontSize: '72px',
      weight: 400,
      padding: '300px',
      // role: but taken from resume,
      flexDirection: 'column',
      justifyContent: 'center',
    },

    aboutMe: {
      display: true,
      color: 'white',
      backgroundColor: '#424242',
      font: 'Raleway',
      fontSize: '50px',
      padding: '300px',
      // userImage: taken from resume json
      // content: taken from resume json in user
      flexDirection: 'column',
      justifyContent: 'center',
    },

    projects: {
      display: true,
      color: 'white',
      backgroundColor: 'black',
      font: 'Raleway',
      fontSize: '50px',
      padding: '300px',
      // projects: [<project1 content>, <project2 content>, ...] // taken from resume
      flexDirection: 'column',
      justifyContent: 'center',
    },

    contactMe: {
      display: true,
      color: 'white',
      backgroundColor: 'black',
      font: 'Raleway',
      fontSize: '50px',
      padding: '300px',
      // content: (taken from user DB)
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  },
//   1: {
//   },
};

export const createPortfolio = async (templateId, userId) => {
  // await creating a post
  // return post
  const portfolio = new Portfolio();
  portfolio = { ...templates[templateId] };
  const portfolioId = null;
  try {
    const savedPortfolio = await portfolio.save((err, pf) => {
      portfolioId = pf.id;
    });
    const user = User.findById(userId);
    user.portfolioIds.push(portfolioId); // add portfolio id to user's db
    return savedPortfolio;
  } catch (error) {
    throw new Error(`create portfolio error: ${error}`);
  }
};
