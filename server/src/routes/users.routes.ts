import { Router } from 'express';
import { createUser, deleteUserByEmail, getAllUsers, getUserByEmail, getUserById, updateUser } from '../controllers/users.controllers';
import { checkJwtMiddleware } from '../middleware/checkJwt.middleware';

const UsersRouter: Router = Router();

UsersRouter.post("/", createUser)
    .get("/", checkJwtMiddleware, getAllUsers)
    .get("/:userEmail", checkJwtMiddleware, getUserByEmail)
    .get("/:userId", checkJwtMiddleware, getUserById)
    .patch("/:userId", checkJwtMiddleware, updateUser)
    .delete("/:userEmail", checkJwtMiddleware, deleteUserByEmail)

export default UsersRouter;