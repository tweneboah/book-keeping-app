const { Router } = require('express');
const express = require('express');
const asynchHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authTokenGenerator = require('../utils/authTokenGenerator');
const userRouter = express.Router();

//Create user
userRouter.post(
  '/',
  asynchHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      throw new Error('User Exist');
    }
    const user = await User.create({ name, email, password });
    if (user) {
      res.status(200);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        token: authTokenGenerator(user._id),
      });
    }
    // res.status(500);
    // throw new Error('Server Error');
  })
);

//Login Logic

//1. First if the password matches
//2 If it matches then add token using jwt to the user therefore we have to create a function that do

//JWT

//It takes the id of the created or login user and  a secret key to sign a token to the user

userRouter.post(
  '/login',
  asynchHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    //Compare password
    if (user && (await user.isPasswordMatch(password))) {
      res.status(201);
      res.status(200);
      res.json({
        _id: user._id,
        name: user.name,
        password: user.password,
        email: user.email,
        token: authTokenGenerator(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid login credentials');
    }
  })
);

//Get the login user

//The first stage of jwt is done that's creating a token this is authentication
//Next we have to do authorization which giving permissions to users to access protected route therefore to do that we have to create a middleware that will check the req.header if there is autorization with token and we pass the middleware to any route we want to protect

//First let's see how to do it in postman
//In post go to headers and for the key type Authorization and the value will [ Bearer your token]

//Then in any request we can access the token as req.headers.authorization

//Then after we get the token we will use jwt method to decode the user but remember when we were signing the user we only use the id hence after we get the id we can now make query to our database and return that user :(

const auth2 = (req, res, next) => {
  console.log(req.headers.authorization);
  next();
};

//Next let's create a route to pass this middleware to and assign Authorizatio Bearer your token in postman and make request to this

userRouter.get(
  '/profile2',
  auth2,
  asynchHandler(async (req, res) => {
    res.send('Profile');
  })
);

//=====PART TWO :(====

//We have to get the token from the header and decode that token to get the user id
const auth = asynchHandler(async (req, res, next) => {
  let token;
  // console.log(req.headers.authorization.startsWith('Bearer')); //This will return true
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //Grab only the token
      // console.log(req.headers.authorization.split(' ')[1]);
      token = req.headers.authorization.split(' ')[1];
      //Decode the user
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded.id);
      //Find the user in DB
      const user = await User.findById(decoded.id);
      //add the user to the request object as req.user
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorised, token is fake');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorised, no token');
  }
});

//GET PROFILE

userRouter.get(
  '/profile',
  auth,
  asynchHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate('books');
      res.status(404);
      if (!user) throw new Error(`You don't have any profile yet`);
      res.status(201);
      res.send(user);
    } catch (error) {
      res.status(500);
      throw new Error('Server error');
    }
  })
);

//LOGOUT

//For logout we will handle it on our frontend we becase when create / login we get back token as part of the response so will store that in our redux and localstorage

//The to logout we just delete the localstorage because we will save the value in localstorage as an initial state in redux store

//GET USERS
// userRouter.get(
//   '/',
//   auth,
//   asynchHandler(async (req, res) => {
//     const users = await User.find({});
//     if (users.length === 0) {
//       res.status(404);
//       throw new Error('There are no users yet come back later');
//     } else {
//       res.status(200);
//       res.send(users);
//     }
//   })
// );

//UPDATE PROFILE

userRouter.put(
  '/profile/update',
  auth,
  asynchHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      //This will encrypt automatically in our model
      if (req.body.password) {
        user.password = req.body.password || user.password;
      }
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        password: updateUser.password,
        email: updateUser.email,
        token: authTokenGenerator(updateUser._id),
      });
    } else {
      res.status(401);
      throw new Error('User Not found');
    }
  })
);

//Fetch all Users

userRouter.get(
  '/',
  asynchHandler(async (req, res) => {
    try {
      const users = await User.find().populate('books');
      res.status(200);
      res.json(users);
    } catch (error) {}
  })
);

module.exports = { userRouter, auth };
