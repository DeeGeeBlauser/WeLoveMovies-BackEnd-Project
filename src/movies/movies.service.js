const { select } = require("../db/connection");
const knex = require("../db/connection");

function listNowShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where("mt.is_showing", true)
    .groupBy("m.movie_id")
    .select("m.*");
}

function listTheatersPlayingMovie() {
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where("mt.is_showing", true)
    .groupBy("mt.movie_id")
}

function list() {
  return knex("movies").select("*");
}

function read(movie_id) {
    return knex("movies").select("*").where({ movie_id }).first();
}

module.exports = {
  list,
  read,
  listNowShowing,
  listTheatersPlayingMovie,
};
