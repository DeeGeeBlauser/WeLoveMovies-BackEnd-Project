const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const moviesService = require("./movies.service");

////////MIDDLEWARE////////

async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

////////CRUD////////

async function list(req, res, next) {
  const data = req.query.is_showing
    ? await moviesService.listNowShowing()
    : await moviesService.list();
  res.json({ data });
}

async function read(req, res, next) {
  const { movie: data } = res.locals;
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), read],
  list: asyncErrorBoundary(list),
};
