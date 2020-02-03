let mongoose = require("mongoose");
let user = require("../dbModel/user");
let movie = require("../dbModel/movie");

let userMovieschema = new mongoose.Schema({
    userId: { type: user.userSchema, required: true },
    movieId: { type: movie.movieSchema, required: true }
    
})

let userMovieModel = mongoose.model("usermoviestocks", userMovieschema);

module.exports = userMovieModel;
