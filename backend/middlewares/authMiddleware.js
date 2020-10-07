const asynchHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Get the login user

//Login Logic

//1. First if the password matches
//2 If it matches then add token using jwt to the user therefore we have to create a function that do

//JWT

//It takes the id of the created or login user and  a secret key to sign a token to the user

//The first stage of jwt is done that's creating a token this is authentication
//Next we have to do authorization which giving permissions to users to access protected route therefore to do that we have to create a middleware that will check the req.header if there is autorization with token and we pass the middleware to any route we want to protect

//First let's see how to do it in postman
//In post go to headers and for the key type Authorization and the value will [ Bearer your token]

//Then in any request we can access the token as req.headers.authorization

//Then after we get the token we will use jwt method to decode the user but remember when we were signing the user we only use the id hence after we get the id we can now make query to our database and return that user :(

// const auth2 = (req, res, next) => {
//   console.log(req.headers.authorization);
//   next();
// };

// //Next let's create a route to pass this middleware to and assign Authorizatio Bearer your token in postman and make request to this

// userRouter.get(
//   '/profile2',
//   auth2,
//   asynchHandler(async (req, res) => {
//     res.send('Profile');
//   })
// );

// //=====PART TWO :(====

//We have to get the token from the header and decode that token to get the user id

const authMiddlware = asynchHandler(async (req, res, next) => {
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

module.exports = authMiddlware;
