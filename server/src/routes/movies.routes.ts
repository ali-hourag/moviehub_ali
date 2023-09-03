import { Router } from 'express';
import { createMovie, deleteMovieById, getAllMovies, getMovieById, updateMovie, updateMovieGenre } from '../controllers/movies.controllers';
import { checkYear } from '../middleware/checkYear.middleware';

const MoviesRouter: Router = Router();

MoviesRouter.post("/:userId/:genre", checkYear, createMovie)
    .get("/", getAllMovies)
    .get("/:movieId", getMovieById)
    .patch("/:movieId", updateMovie)
    .patch("/:movieId/:genre", updateMovieGenre)
    .delete("/:movieId", deleteMovieById)

export default MoviesRouter;