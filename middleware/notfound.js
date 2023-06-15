const notFound = (req, res) => {
  res.status(404).send("<h1>404 Page not foud</h1>");
};

module.exports = notFound;
