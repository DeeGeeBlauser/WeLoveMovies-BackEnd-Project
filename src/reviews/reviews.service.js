const { select } = require("../db/connection");
const knex = require("../db/connection");

function read(review_id) {
  return knex("review").select("*").where({ review_id }).first();
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  read,
  delete: destroy,
};
