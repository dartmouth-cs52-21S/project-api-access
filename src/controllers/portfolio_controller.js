/* eslint-disable import/prefer-default-export */
/* eslint-disable no-const-assign */
import Portfolio from '../models/portfolio_model';
import User from '../models/user_model';

const templates = {
  0: {
    header: {
      userName: {
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
      role: {
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

const chooseTemplateImages = {
  0: 'https://files.slack.com/files-pri/TQ19QMD6Z-F022T0APB8W/screen_shot_2021-05-25_at_12.05.32_pm.png',
};

// export const createPortfolio = async (templateId) => {
export const createPortfolio = async (templateId, userFields) => {
  // await creating a post
  // return post
  const portfolio = new Portfolio();
  const template = templates[templateId];
  portfolio.header = template.header;
  portfolio.aboutMe = template.aboutMe;
  portfolio.projects = template.projects;
  portfolio.contactMe = template.contactMe;
  try {
    const savedPortfolio = await portfolio.save();
    try {
      await User.updateOne(
        { email: userFields.email },
        { $push: { portfolioIds: savedPortfolio.id } },
      );
    } catch (error) {
      throw new Error(`failed to add portfolio to user: ${error}`);
    }
    await User.findOne({ email: userFields.email });
    return portfolio;
  } catch (error) {
    throw new Error(`create portfolio error: ${error}`);
  }
};

export const updatePortfolio = async (id, portfolioFields) => {
  try {
    const portfolio = Portfolio.findOneAndUpdate({ _id: id }, portfolioFields, { new: true });
    return portfolio;
  } catch (error) {
    throw new Error(`update portfolio error: ${error}`);
  }
};

export const getTemplateImages = async () => {
  return chooseTemplateImages;
};

export const getPortfolio = async (id) => {
  try {
    const portfolio = Portfolio.findOne({ _id: id });
    return portfolio;
  } catch (error) {
    throw new Error(`get portfolio error: ${error}`);
  }
};
