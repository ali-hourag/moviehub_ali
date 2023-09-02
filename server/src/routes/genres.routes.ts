import { Router } from 'express';
import { createGenre, deleteGenreById, getAllGenres, getGenreById, updateGenre } from '../controllers/genres.controllers';

const GenresRouter: Router = Router();

GenresRouter.post("/", createGenre)
    .get("/", getAllGenres)
    .get("/:genreId", getGenreById)
    .patch("/:genreId", updateGenre)
    .delete("/:genreId", deleteGenreById)

export default GenresRouter;