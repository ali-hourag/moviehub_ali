import { Request, Response } from "express";
import UserModel from "../model/user.model";

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

//---------------- GET ALL USERS ----------------
export const getAllUsers = async (req: Request, res: Response) => {
    try {

        const allUsers = await UserModel.find();
        res.status(200).send(allUsers);

    } catch (error) {
        res.status(500).send(error);
    }
}

//---------------- CREATE USER BY ID ----------------
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {

        const user = await UserModel.findById({ _id: userId }).populate("movies");
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

        const user = await UserModel.findByIdAndUpdate({ _id: userId }, {
            $set: { name: name, email: email, password: password }
        }, { new: true });
        res.status(201).send(user);

    } catch (error) {
        res.status(500).send(error);
    }
}

//---------------- DELETE USER ----------------
export const deleteUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {

        await UserModel.findByIdAndDelete({ _id: userId });
        res.status(204).send();

    } catch (error) {
        res.status(500).send(error);
    }
}