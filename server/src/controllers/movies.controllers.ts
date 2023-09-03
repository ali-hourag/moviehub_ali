import { Request, Response } from "express";
import { prismaClient } from "../db/clientPrisma";
import { convertToType } from "../helpers/utils";

//---------------- CREATE MOVIE ----------------
export const createMovie = async (req: Request, res: Response) => {
    const { userId, genre } = req.params
    const { name, year, posterImage, score } = req.body
    try {

        if (!name || !year) {
            res.status(404).send({ error: "Missing required fields." });
            return;
        }

        // Connect with User and Genre so that everything is updated.
        const newMovie = await prismaClient.movie.create({
            data: {
                name,
                year,
                posterImage,
                score,
                User: {
                    connect: {
                        id: convertToType(userId)
                    }
                },
                Genre: {
                    connect: {
                        name: genre
                    }
                }
            }
        })

        res.status(201).send(newMovie)

    } catch (error) {
        res.status(500).send(error)
    }
}

//---------------- GET ALL MOVIES ----------------
export const getAllMovies = async (req: Request, res: Response) => {
    try {

        const allMovies = await prismaClient.movie.findMany()
        res.status(200).send(allMovies);

    } catch (error) {
        res.status(500).send(error);
    }
}

//---------------- GET MOVIE BY ID ----------------
export const getMovieById = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    try {

        const movie = await prismaClient.movie.findUnique({
            where: {
                id: convertToType(movieId)
            }
        })
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
    const { name, year, posterImage, score } = req.body
    const { movieId } = req.params
    try {


        const updatedMovie = await prismaClient.movie.update({
            where: {
                id: convertToType(movieId)
            },
            data: {
                name,
                year,
                posterImage,
                score
            }
        })

        res.status(201).send(updatedMovie)

    } catch (error) {
        res.status(500).send(error)
    }
}

//---------------- UPDATE MOVIE ----------------
/**
 * Since movies and genres have a one-to-many relationship prisma
 * does not make it possible to update the genre entity from the req.body
 * because it has to be connected.
 */
export const updateMovieGenre = async (req: Request, res: Response) => {
    const { movieId, genre } = req.params
    try {


        const updatedMovie = await prismaClient.movie.update({
            where: {
                id: convertToType(movieId)
            },
            data: {
                Genre: {
                    connect: {
                        name: genre
                    }
                }
            }
        })

        res.status(201).send(updatedMovie)

    } catch (error) {
        res.status(500).send(error)
    }
}
//---------------- DELETE MOVIE ----------------
export const deleteMovieById = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    try {

        await prismaClient.movie.delete({
            where: {
                id: convertToType(movieId)
            }
        })
        res.status(204).send();

    } catch (error) {
        res.status(500).send(error);
    }
}
