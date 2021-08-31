const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const theatersService = require("./theaters.service");

////////MIDDLEWARE////////

//No middleware needed

////////CRUD////////

async function list(req, res) {
  const data = await theatersService.list(req.params.movieId);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
