import { Request, Response } from "express";
import prisma from "../db/clientPrisma";

//---------------- CREATE GENRE ----------------
export const createGenre = async (req: Request, res: Response) => {
    const { name } = req.body

    try {

        if (!name) {
            res.status(404).send({ error: "Missing required fields." });
            return;
        }

        const newGenre = await prisma.genre.create({ data: { name } });
        res.status(201).send(newGenre)

    } catch (error) {
        res.status(500).send(error)
    }
}

//---------------- GET GENRE ----------------
export const getGenreById = async (req: Request, res: Response) => {
    const { genreId } = req.params

    try {

        const genre = await prisma.genre.findUnique({
            where: {
                id: genreId
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

        const allGenres = await prisma.genre.findMany({
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

        const allGenres = await prisma.genre.update({
            where: {
                id: genreId
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

        await prisma.genre.delete({
            where: {
                id: genreId
            }
        })
        res.status(204).send()

    } catch (error) {
        res.status(500).send(error)
    }
}