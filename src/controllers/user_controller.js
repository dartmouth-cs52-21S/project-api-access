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
  console.log('in signup firstName:', firstName);

  const user = new User();
  user.email = email;
  user.password = password;
  user.firstName = firstName;
  user.lastName = lastName;
  user.portfolioIds = [];
  user.resume = {};
  console.log('creating user in signup', user);
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
    const users = await User.find();
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
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
};

export const getUserResume = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    return user.resume;
  } catch (error) {
    throw new Error(`get user resume error: ${error}`);
  }
};

export const updateUserResume = async (id, resumeFields) => {
  try {
    const user = await User.findOneAndUpdate({ _id: id }, resumeFields, { new: true });
    return user.resume;
  } catch (error) {
    throw new Error(`get user resume error: ${error}`);
  }
};

export const getUserPortfolios = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });
    console.log('getUserportfolios', user.portfolioIds);
    return user.portfolioIds;
  } catch (error) {
    throw new Error(`get user portfolios error: ${error}`);
  }
};

export const getProfile = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });
    console.log('getUserProfile', user);
    return user;
  } catch (error) {
    throw new Error(`get user portfolios error: ${error}`);
  }
};

// make sure it updates everything but the userId and resume? break profileFields?
export const updateProfile = async (userId, profileFields) => {
  try {
    const user = await User.findOneAndUpdate({ _id: userId }, profileFields, { new: true });
    console.log('updateUserProfile', profileFields);
    return user.profileFields;
  } catch (error) {
    throw new Error(`get user portfolios error: ${error}`);
  }
};
