import { Router } from 'express';
import { createMovie, deleteMovieById, getAllMovies, getMovieById, updateMovie } from '../controllers/movies.controllers';
import { checkYear } from '../middleware/checkYear.middleware';

const MoviesRouter: Router = Router();

MoviesRouter.post("/:userId", checkYear, createMovie)
    .get("/", getAllMovies)
    .get("/:movieId", getMovieById)
    .patch("/:movieId", updateMovie)
    .delete("/:movieId", deleteMovieById)

export default MoviesRouter;