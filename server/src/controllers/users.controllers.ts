import { Request, Response } from "express";
import UserModel from "../model/user.model";

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            res.status(400).send({ error: "Missing required fields." });
            return
        }

        const newUser = await UserModel.create({
            name,
            email,
            password
        });

        res.status(201).send(newUser);

    } catch (error) {
        res.status(500).send(error);
    }
}