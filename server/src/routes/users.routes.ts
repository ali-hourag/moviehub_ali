import { Router } from 'express';
import { createUser, deleteUserById, getAllUsers, getUserById, updateUser } from '../controllers/users.controllers';

const UsersRouter: Router = Router();

UsersRouter.post("/", createUser)
    .get("/", getAllUsers)
    .get("/:userId", getUserById)
    .patch("/:userId", updateUser)
    .delete("/:userId", deleteUserById)

export default UsersRouter;