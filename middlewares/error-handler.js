module.exports = class ErrorHandler {
  handler(err, req, res, next) {
    console.error(`Error during request processing`, err);
    res.status(500).send({ message: err });
  }
};
