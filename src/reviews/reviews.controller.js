const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reviewsService = require("./reviews.service");

////////MIDDLEWARE////////

reviewExists(req, res, next) {
    reviewsService
    .read(req.params.reviewId)
    .then((review) => {
        if (review) {
            res.locals.review = review
            return next();
        }
        next({status: 404, message: `Review cannot be found.`})
    })
    .catch(next);
}


////////CRUD////////
async function read(req, res, next) {
    const { review: data } = res.locals;
    res.json({ data });

function destroy(req, res, next) {
    reviewsService
      .delete(res.locals.review.review_id)
      .then(() => res.sendStatus(204))
      .catch(next);
  }


module.exports = {
    read: [asyncErrorBoundary(reviewExists), read],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}