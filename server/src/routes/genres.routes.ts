import { Router } from 'express';
import { createGenre, deleteGenreById, deleteGenreByName, getAllGenres, getGenreById, getGenreByName, updateGenreById, updateGenreByName } from '../controllers/genres.controllers';

const GenresRouter: Router = Router();

GenresRouter.post("/", createGenre)
    .get("/", getAllGenres)
    .get("/:genreId", getGenreById)
    .get("/:genreName", getGenreByName)
    .patch("/:genreId", updateGenreById)
    .patch("/:genreName", updateGenreByName)
    .delete("/:genreName", deleteGenreByName)

export default GenresRouter;