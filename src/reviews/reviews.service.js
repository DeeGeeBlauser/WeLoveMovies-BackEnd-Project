const { KnexTimeoutError } = require("knex");
const { select } = require("../db/connection");
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function read(review_id) {
  return knex("reviews")
    .select("*")
    .where({ review_id })
    .first()
    // .then(addCritic);
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview)
}

function addCriticsObject(review) {
    return knex("reviews as r")
    .select("*")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .where({ "r.review_id": review.review_id })
    .first()
    .then(addCritic)
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  read,
  update,
  delete: destroy,
  addCriticsObject,
};
