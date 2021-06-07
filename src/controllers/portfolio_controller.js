/* eslint-disable import/prefer-default-export */
/* eslint-disable no-const-assign */
import Portfolio from '../models/portfolio_model';
import User from '../models/user_model';

const templates = [
  {
    header: {
      userName: {
        display: true,
        color: 'white',
        backgroundColor: 'black',
        font: 'Raleway',
        fontSize: '4.5em',
        weight: 400,
        padding: '350px',
        // role: but taken from resume,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
      },
      role: {
        display: true,
        color: 'white',
        backgroundColor: 'black',
        font: 'Raleway',
        fontSize: '2.5em',
        weight: 400,
        padding: '350px',
        // role: but taken from resume,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
      },
    },

    aboutMe: {
      display: true,
      color: 'white',
      backgroundColor: '#424242',
      font: 'Raleway',
      fontSize: '2em',
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
      fontSize: '2em',
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
      fontSize: '2em',
      padding: '300px',
      // content: (taken from user DB)
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  }, {
    header: {
      userName: {
        display: true,
        color: 'black',
        backgroundColor: 'white',
        font: 'Raleway',
        fontSize: '4.5em',
        weight: 400,
        padding: '350px',
        // role: but taken from resume,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
      },
      role: {
        display: true,
        color: 'black',
        backgroundColor: 'white',
        font: 'Raleway',
        fontSize: '2.5em',
        weight: 400,
        padding: '350px',
        // role: but taken from resume,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
      },
    },

    aboutMe: {
      display: true,
      color: 'white',
      backgroundColor: 'black',
      font: 'Raleway',
      fontSize: '2em',
      padding: '300px',
      // userImage: taken from resume json
      // content: taken from resume json in user
      flexDirection: 'column',
      justifyContent: 'Right',
      textAlign: 'left',
    },

    projects: {
      display: true,
      color: 'black',
      backgroundColor: 'white',
      font: 'Raleway',
      fontSize: '2em',
      padding: '300px',
      // projects: [<project1 content>, <project2 content>, ...] // taken from resume
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'right',
    },

    contactMe: {
      display: true,
      color: 'black',
      backgroundColor: 'white',
      font: 'Raleway',
      fontSize: '2em',
      padding: '300px',
      // content: (taken from user DB)
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  }, {
    header: {
      userName: {
        display: true,
        color: 'white',
        backgroundColor: '#5CDB95',
        font: 'Raleway',
        fontSize: '4.5em',
        weight: 400,
        padding: '350px',
        // role: but taken from resume,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
      },
      role: {
        display: true,
        color: 'black',
        backgroundColor: '#5CDB95',
        font: 'Raleway',
        fontSize: '2.5em',
        weight: 400,
        padding: '350px',
        // role: but taken from resume,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
      },
    },

    aboutMe: {
      display: true,
      color: 'white',
      backgroundColor: '#05386B',
      font: 'Raleway',
      fontSize: '2em',
      padding: '300px',
      // userImage: taken from resume json
      // content: taken from resume json in user
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },

    projects: {
      display: true,
      color: 'white',
      backgroundColor: '#5CDB95',
      font: 'Raleway',
      fontSize: '2em',
      padding: '300px',
      // projects: [<project1 content>, <project2 content>, ...] // taken from resume
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },

    contactMe: {
      display: true,
      color: 'white',
      backgroundColor: '#5CDB95',
      font: 'Raleway',
      fontSize: '2em',
      padding: '300px',
      // content: (taken from user DB)
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  },
];

const chooseTemplateImages = [
  'https://i.postimg.cc/xdnD6bTd/ezgif-com-gif-maker.png',
  'https://i.postimg.cc/tg1vp42c/Screen-Shot-2021-06-07-at-2-51-17-AM.png',
  'https://i.postimg.cc/mr0XDWng/Screen-Shot-2021-06-07-at-2-51-46-AM.png',
];

// export const createPortfolio = async (templateId) => {
export const createPortfolio = async (templateId, fields, user) => {
  console.log('portfolioName', fields.portfolioName);
  // await creating a post
  // return post
  const portfolio = new Portfolio();
  const template = templates[templateId];
  portfolio.name = fields.portfolioName;
  console.log('template header', template.header);
  portfolio.header = template.header;
  portfolio.aboutMe = template.aboutMe;
  portfolio.projects = template.projects;
  portfolio.contactMe = template.contactMe;
  portfolio.resume = {};
  try {
    const savedPortfolio = await portfolio.save();
    console.log('savedPortfolio', savedPortfolio);
    try {
      await User.updateOne(
        { email: user.email },
        { $push: { portfolioIds: savedPortfolio.id } },
      );
    } catch (error) {
      throw new Error(`failed to add portfolio to user: ${error}`);
    }
    await User.findOne({ email: user.email });
    return portfolio;
  } catch (error) {
    throw new Error(`create portfolio error: ${error}`);
  }
};

export const updatePortfolio = async (id, portfolioFields) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate({ _id: id }, portfolioFields, { new: true });
    return portfolio;
  } catch (error) {
    throw new Error(`update portfolio error: ${error}`);
  }
};

export const deletePortfolio = async (id, user) => {
  // await deleting a post
  // return confirmation
  try {
    // console.log('id', id);
    // console.log('user', user);
    const deletedPortfolio = await Portfolio.findByIdAndRemove(id);
    // console.log('deletingPortfolio', deletedPortfolio);
    await User.updateOne(
      { email: user.email },
      { $pullAll: { portfolioIds: [id] } },
    );
    return deletedPortfolio;
  } catch (error) {
    throw new Error(`delete portfolio error: ${error}`);
  }
};

export const getTemplateImages = async () => {
  // console.log('getTemplateImages', chooseTemplateImages);
  return chooseTemplateImages;
};

export const getPortfolio = async (id) => {
  try {
    const portfolio = await Portfolio.findOne({ _id: id });
    // console.log('getPortfolio', portfolio);
    return portfolio;
  } catch (error) {
    throw new Error(`get portfolio error: ${error}`);
  }
};

export const getPortfolios = async (ids) => {
  try {
    const portfolios = await Portfolio.find({ _id: { $in: ids } });
    console.log('getPortfolios', portfolios);
    return portfolios;
  } catch (error) {
    throw new Error(`get portfolio error: ${error}`);
  }
};
