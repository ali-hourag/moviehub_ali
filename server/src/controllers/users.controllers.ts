import { Request, Response } from "express";
import { prismaClient } from "../db/clientPrisma";
import { convertToType } from "../helpers/utils";


//---------------- CREATE USER ----------------
export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        // Make sure all required fields are available
        if (!name || !email) {
            res.status(400).send({ error: "Missing required fields." });
            return
        }

        // Create new user
        const newUser = await prismaClient.user.create({
            data: {
                name,
                email,
                password
            }
        });

        res.status(201).send(newUser);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

//---------------- GET ALL USERS ----------------
export const getAllUsers = async (req: Request, res: Response) => {
    try {

        // include so that User includes the movies that has created and shows
        // id, name and year
        const allUsers = await prismaClient.user.findMany({
            include: {
                movies: {
                    select: {
                        id: true,
                        name: true,
                        year: true,
                        score: true,
                        posterImage: true,
                        genres: true
                    }
                }
            }
        });
        res.status(200).send(allUsers);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

//---------------- CREATE USER BY ID ----------------
export const getUserByEmail = async (req: Request, res: Response) => {
    const { userEmail } = req.params;
    try {

        const user = await prismaClient.user.findUnique({
            where: {
                email: userEmail
            }, include: {
                movies: {
                    select: {
                        id: true,
                        name: true,
                        year: true,
                        score: true,
                        posterImage: true,
                        genre: true
                    }
                }
            }
        });
        if (!user) {
            res.status(400).send({ error: "User non-existent." });
            return;
        }
        res.status(200).send(user);

    } catch (error) {
        res.status(500).send(error);
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {

        const user = await prismaClient.user.findUnique({
            where: {
                id: convertToType(userId)
            }, include: {
                movies: {
                    select: {
                        id: true,
                        name: true,
                        year: true
                    }
                }
            }
        });
        if (!user) {
            res.status(400).send({ error: "User non-existent." });
            return;
        }
        res.status(200).send(user);

    } catch (error) {
        res.status(500).send(error);
    }
}

//---------------- UPDATE USER DATA ----------------
export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    try {

        const user = await prismaClient.user.update({
            where: {
                id: convertToType(userId)
            },
            data: {
                name,
                email,
                password
            }
        });
        res.status(201).send(user);

    } catch (error) {
        res.status(500).send(error);
    }
}

//---------------- DELETE USER ----------------
export const deleteUserByEmail = async (req: Request, res: Response) => {
    const { userEmail } = req.params;
    try {

        await prismaClient.user.delete({
            where: {
                email: userEmail
            }
        });
        res.status(204).send();

    } catch (error) {
        res.status(500).send(error);
    }
}