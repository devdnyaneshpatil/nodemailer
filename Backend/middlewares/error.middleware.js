const notFound = (req, res, next) => {
  //  res.status(404).json({message:`can't find ${req.originalUrl}`})
  const err = new Error(`can't find ${req.originalUrl} on the server`);
  err.statusCode = 404;
  next(err);
};

const errorMiddleware = (error, req, res, next) => {
  const statusCode = error && error.statusCode ? error.statusCode : 500;
  const message =
    error && error.message ? error.message : "Internal Server Error";
  res.status(statusCode).json({ message });
};

module.exports = { notFound, errorMiddleware };
