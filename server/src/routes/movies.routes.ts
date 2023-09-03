import { Router } from 'express';
import { createMovie, deleteMovieById, getAllMovies, getMovieById, updateMovie, updateMovieGenre } from '../controllers/movies.controllers';
import { checkMovieData } from '../middleware/checkMovieData.middleware';

const MoviesRouter: Router = Router();

MoviesRouter.post("/:userId/:genre", checkMovieData, createMovie)
    .get("/", getAllMovies)
    .get("/:movieId", getMovieById)
    .patch("/:movieId", checkMovieData, updateMovie)
    .patch("/:movieId/:genre", updateMovieGenre)
    .delete("/:movieId", deleteMovieById)

export default MoviesRouter;