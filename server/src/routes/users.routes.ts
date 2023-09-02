import { Router } from 'express';
import { createUser } from '../controllers/users.controllers';

const UsersRouter: Router = Router();

UsersRouter.post("/", createUser);

export default UsersRouter;