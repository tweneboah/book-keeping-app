const express = require('express');
const asynchHandler = require('express-async-handler');
const authMiddlware = require('../middlewares/authMiddleware');
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

//GET PROFILE

userRouter.get(
  '/profile',
  authMiddlware,
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

//UPDATE PROFILE

userRouter.put(
  '/profile/update',
  authMiddlware,
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

module.exports = { userRouter };
