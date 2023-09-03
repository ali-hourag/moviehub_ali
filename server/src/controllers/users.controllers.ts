import { Request, Response } from "express";
import prisma from "../db/clientPrisma";

//---------------- CREATE USER ----------------
export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        // Make sure all required fields are available
        if (!name || !email || !password) {
            res.status(400).send({ error: "Missing required fields." });
            return
        }

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });

        res.status(201).send(newUser);

    } catch (error) {
        res.status(500).send(error);
    }
}

//---------------- GET ALL USERS ----------------
export const getAllUsers = async (req: Request, res: Response) => {
    try {

        const allUsers = await prisma.user.findMany({
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
        res.status(200).send(allUsers);

    } catch (error) {
        res.status(500).send(error);
    }
}

//---------------- CREATE USER BY ID ----------------
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {

        const user = await prisma.user.findUnique({
            where: {
                id: userId
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

        const user = await prisma.user.update({
            where: {
                id: userId
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
export const deleteUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {

        await prisma.user.delete({
            where: {
                id: userId
            }
        });
        res.status(204).send();

    } catch (error) {
        res.status(500).send(error);
    }
}