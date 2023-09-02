import { Request, Response } from "express";
import MovieModel from "../model/movie.model";
import UserModel from "../model/user.model";

//---------------- CREATE MOVIE ----------------
export const createMovie = async (req: Request, res: Response) => {
    const { userId } = req.params
    const { name, year } = req.body
    try {

        if (!name || !year) {
            res.status(404).send({ error: "Missing required fields." });
            return;
        }

        const newMovie = await MovieModel.create({ ...req.body })

        const updatedUser = await UserModel.findByIdAndUpdate({ _id: userId }, {
            $push: {
                movies: newMovie._id
            }
        }, { new: true })

        res.status(201).send(newMovie)

    } catch (error) {
        res.status(500).send(error)
    }
}

//---------------- GET ALL MOVIES ----------------
export const getAllMovies = async (req: Request, res: Response) => {
    try {

        const allMovies = await MovieModel.find();
        res.status(200).send(allMovies);

    } catch (error) {
        res.status(500).send(error);
    }
}

//---------------- GET MOVIE BY ID ----------------
export const getMovieById = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    try {

        const movie = await MovieModel.findById({ _id: movieId });
        if (!movie) {
            res.status(404).send({ error: "Movie non-existent." });
            return;
        }
        res.status(200).send(movie);

    } catch (error) {
        res.status(500).send(error);
    }
}
//---------------- UPDATE MOVIE ----------------
export const updateMovie = async (req: Request, res: Response) => {
    const { name, year, posterImage, score, genres } = req.body
    const { movieId } = req.params
    try {


        const updatedMovie = await MovieModel.findByIdAndUpdate({ _id: movieId }, {
            $set: { name: name, year: year, posterImage: posterImage, score: score, genres: genres }
        }, { new: true })

        res.status(201).send(updatedMovie)

    } catch (error) {
        res.status(500).send(error)
    }
}

//---------------- DELETE MOVIE ----------------
export const deleteMovieById = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    try {

        await MovieModel.findByIdAndDelete({ _id: movieId });
        res.status(204).send();

    } catch (error) {
        res.status(500).send(error);
    }
}
