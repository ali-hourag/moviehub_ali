import { Request, Response } from "express";
import { prismaClient } from "../db/clientPrisma";
import { convertToType } from "../helpers/utils";

//---------------- CREATE GENRE ----------------
export const createGenre = async (req: Request, res: Response) => {
    const { name } = req.body

    try {

        if (!name) {
            res.status(404).send({ error: "Missing required fields." });
            return;
        }

        const newGenre = await prismaClient.genre.create({ data: { name } });
        res.status(201).send(newGenre)

    } catch (error) {
        res.status(500).send(error)
    }
}

//---------------- GET GENRE ----------------
export const getGenreById = async (req: Request, res: Response) => {
    const { genreId } = req.params

    try {

        const genre = await prismaClient.genre.findUnique({
            where: {
                id: convertToType(genreId)
            },
            include: {
                movies: {
                    select: {
                        id: true,
                        name: true,
                        year: true
                    }
                }
            }
        });
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

        const allGenres = await prismaClient.genre.findMany({
            include: {
                movies: {
                    select: {
                        id: true,
                        name: true,
                        year: true
                    }
                }
            }
        });
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

        const allGenres = await prismaClient.genre.update({
            where: {
                id: convertToType(genreId)
            },
            data: {
                name
            }
        })
        res.status(201).send(allGenres)

    } catch (error) {
        res.status(500).send(error)
    }
}

//---------------- DELETE GENRE ----------------
export const deleteGenreById = async (req: Request, res: Response) => {
    const { genreId } = req.params;
    try {

        await prismaClient.genre.delete({
            where: {
                id: convertToType(genreId)
            }
        })
        res.status(204).send()

    } catch (error) {
        res.status(500).send(error)
    }
}