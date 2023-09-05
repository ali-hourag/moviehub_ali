import { Router } from 'express';
import { createGenre, deleteGenreById, deleteGenreByName, getAllGenres, getGenreById, getGenreByName, updateGenreById, updateGenreByName } from '../controllers/genres.controllers';
import { checkJwtMiddleware } from '../middleware/checkJwt.middleware';

const GenresRouter: Router = Router();

GenresRouter.post("/", checkJwtMiddleware, createGenre)
    .get("/", getAllGenres)
    .get("/:genreId", getGenreById)
    .get("/:genreName", getGenreByName)
    .patch("/:genreId", checkJwtMiddleware, updateGenreById)
    .patch("/:genreName", checkJwtMiddleware, updateGenreByName)
    .delete("/:genreName", checkJwtMiddleware, deleteGenreByName)

export default GenresRouter;