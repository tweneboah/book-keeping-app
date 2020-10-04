//Not found Error middleware
const notfoundErrorMiddleware = (req, res, next) => {
  //Create the error
  const error = new Error(`Not found - ${req.originalUrl}`);
  //set status code
  res.status(404);
  //Pass this error to the error handeler
  next(error);
};

const errorMiddlewareHandler = (err, req, res, next) => {
  //Set your status code
  const errorStatusCode = res.statusCode === 200 ? 500 : res.statusCode;
  //set status code
  res.status(errorStatusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorMiddlewareHandler, notfoundErrorMiddleware };
