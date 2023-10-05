import { Router } from 'express';
import { createMovie, deleteMovieById, getAllMovies, getMovieById, updateMovie, updateMovieGenre } from '../controllers/movies.controllers';
import { checkMovieData } from '../middleware/checkMovieData.middleware';
import { checkJwtMiddleware } from '../middleware/checkJwt.middleware';

const MoviesRouter: Router = Router();

MoviesRouter.post("/:userId", checkJwtMiddleware, createMovie)
    .get("/", checkJwtMiddleware, getAllMovies)
    .get("/:movieId", checkJwtMiddleware, getMovieById)
    .patch("/:movieId", checkJwtMiddleware, checkMovieData, updateMovie)
    .patch("/:movieId/:genre", checkJwtMiddleware, updateMovieGenre)
    .delete("/:movieId", checkJwtMiddleware, deleteMovieById)

export default MoviesRouter;