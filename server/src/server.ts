import express from 'express';
import UsersRouter from './routes/users.routes';

//Create an express application
const app = express();

// Middle to be able to read incoming requests
app.use(express.json());
app.use("/users", UsersRouter);

export default app;