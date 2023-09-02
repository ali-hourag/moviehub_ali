import { Request, Response } from "express";
import GenreModel from "../model/genre.model";

//---------------- CREATE GENRE ----------------
export const createGenre = async (req: Request, res: Response) => {
    const { name } = req.body

    try {
        console.log(name);
        if (!name) {
            res.status(404).send({ error: "Missing required fields." });
            return;
        }

        const newGenre = await GenreModel.create({ name })
        res.status(201).send(newGenre)

    } catch (error) {
        res.status(500).send(error)
    }
}

//---------------- GET GENRE ----------------
export const getGenreById = async (req: Request, res: Response) => {
    const { genreId } = req.params

    try {

        const genre = await GenreModel.findById({ _id: genreId })
        if (!genre) {
            res.status(404).send({ error: "Genre non-existent." });
            return;
        }
        res.status(200).send(genre)

    } catch (error) {
        res.status(500).send(error)
    }
}

//---------------- GET ALL GENRES ----------------
export const getAllGenres = async (req: Request, res: Response) => {

    try {

        const allGenres = await GenreModel.find()
        res.status(200).send(allGenres)

    } catch (error) {
        res.status(500).send(error)
    }
}

//---------------- GET ALL GENRES ----------------
export const updateGenre = async (req: Request, res: Response) => {
    const { genreId } = req.params;
    const { name } = req.body;
    try {

        const allGenres = await GenreModel.findByIdAndUpdate({ _id: genreId }, {
            $set: { name: name }
        }, { new: true })
        res.status(201).send(allGenres)

    } catch (error) {
        res.status(500).send(error)
    }
}

//---------------- DELETE GENRE ----------------
export const deleteGenreById = async (req: Request, res: Response) => {
    const { genreId } = req.params;
    try {

        const allGenres = await GenreModel.findByIdAndDelete({ _id: genreId })
        res.status(204).send()

    } catch (error) {
        res.status(500).send(error)
    }
}