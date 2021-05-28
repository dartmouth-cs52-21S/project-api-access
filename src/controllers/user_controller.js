// import User from '../models/user_model';
import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

export const signin = (user) => {
  return tokenForUser(user);
};

// note the lovely destructuring here indicating that we are passing in an object with these 3 keys
export const signup = async ({
  firstName, lastName, email, password,
}) => {
  if (!email || !password) {
    throw new Error('You must provide email and password');
  }

  // See if a user with the given email exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email is in use');
  }
  console.log('signup');

  const user = new User();
  user.email = email;
  user.password = password;
  user.firstName = firstName;
  user.lastName = lastName;
  user.portfolioIds = [];
  user.resume = {};
  // user.authorname = name;

  try {
    const savedUser = await user.save();
    console.log('savedUser', savedUser);
    return tokenForUser(savedUser);
  } catch (error) {
    throw new Error(`Signup error: ${error}`);
  }
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const getUsers = async () => {
  // await finding posts
  // return posts
  try {
    const users = User.find();
    // console.log('users (usercontroller):', users);
    return users;
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
};

export const getUser = async (id) => {
  // await finding posts
  // return posts
  try {
    const user = User.findById(id);
    return user;
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
};

export const getUserResume = async (id) => {
  try {
    const user = User.findOne({ _id: id });
    console.log('user', user);
    return user.resume;
  } catch (error) {
    throw new Error(`get user resume error: ${error}`);
  }
};

export const getUserPortfolios = async (userId) => {
  try {
    const user = User.findOne({ _id: userId });
    return user.portfolioIds;
  } catch (error) {
    throw new Error(`get user portfolios error: ${error}`);
  }
};
