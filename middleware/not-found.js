const notFoundMiddleware = (req, res) => {
  res.status(400).send("Route does not exist!!");
};

module.exports = notFoundMiddleware;
