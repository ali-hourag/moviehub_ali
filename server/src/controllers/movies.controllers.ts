import { Request, Response } from "express";
import { prismaClient } from "../db/clientPrisma";
import { convertToType } from "../helpers/utils";
import { uploadImage } from "../utils/cloudinary";
import fs from 'fs-extra';

//---------------- CREATE MOVIE ----------------
export const createMovie = async (req: any, res: any) => {
    console.log("llwgo a la bbdd");
    const { userId } = req.params
    let { name, year, score, genres } = req.body
    console.log(name, year, genres);

    try {

        if (!name || !year || !genres) {
            res.status(404).send({ error: "Missing required fields." });
            return;
        }

        if (!Array.isArray(genres)) {
            genres = genres.split(',').map((genre: string) => genre.trim());
        }
        const genresIdArr = [];
        for (const genreName of genres) {
            const genre = await prismaClient.genre.findUnique({
                where: {
                    name: genreName
                }
            })
            if (genre) {
                genresIdArr.push(genre.id);
            }
        }

        const upload = await uploadImage((req.files as any).image.tempFilePath);
        await fs.unlink((req.files as any).image.tempFilePath);


        // Connect with User and Genre so that everything is updated.
        const newMovie = await prismaClient.movie.create({
            data: {
                name: name,
                year: parseInt(year),
                posterImage: upload.secure_url,
                score: parseFloat(score),
                user: {
                    connect: {
                        id: convertToType(userId)
                    }
                },
                genres: {
                    connect: genresIdArr.map(genresId => ({ id: genresId }))
                }
            }
        })

        res.status(201).send(newMovie)

    } catch (error) {
        console.log(error);
        res.status(500).send(console.log(error))
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
            },
            include: {
                genres: true
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
    let { name, year, score, genres } = req.body
    const { movieId } = req.params
    try {

        if (!Array.isArray(genres)) {
            genres = genres.split(',').map((genre: string) => genre.trim());
        }

        const genresIdArr = [];
        const disconnectedGenresIdArr = [];
        const allGenres = await prismaClient.genre.findMany();
        for (const genreName of genres) {
            const genre = await prismaClient.genre.findUnique({
                where: {
                    name: genreName
                }
            })
            if (genre) {
                genresIdArr.push(genre.id);
            }
        }
        for (const genre of allGenres) {
            if (!genresIdArr.includes(genre.id)) {
                disconnectedGenresIdArr.push(genre.id)
            }
        }
        console.log(genresIdArr);
        console.log(disconnectedGenresIdArr);

        const upload = await uploadImage((req.files as any).image.tempFilePath);
        await fs.unlink((req.files as any).image.tempFilePath);


        const updatedMovie = await prismaClient.movie.update({
            where: {
                id: convertToType(movieId)
            },
            data: {
                name: name,
                year: parseInt(year),
                score: parseInt(score),
                posterImage: upload.secure_url,
                genres: {
                    disconnect: disconnectedGenresIdArr.map(genresId => ({ id: genresId })),
                    connect: genresIdArr.map(genresId => ({ id: genresId })),
                }
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
