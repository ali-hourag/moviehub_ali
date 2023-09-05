import { Router } from 'express';
import { createUser, deleteUserById, getAllUsers, getUserById, updateUser } from '../controllers/users.controllers';
import { checkJwtMiddleware } from '../middleware/checkJwt.middleware';

const UsersRouter: Router = Router();

UsersRouter.post("/", createUser)
    .get("/", checkJwtMiddleware, getAllUsers)
    .get("/:userId", getUserById)
    .patch("/:userId", updateUser)
    .delete("/:userId", deleteUserById)

export default UsersRouter;