const jwt = require('jsonwebtoken');

const authTokenGenerator = userId => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '10d',
  });
};

module.exports = authTokenGenerator;
