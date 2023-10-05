import UsersRouter from './routes/users.routes';
import morgan from 'morgan';
import MoviesRouter from './routes/movies.routes';
import GenresRouter from './routes/genres.routes';
import fileUpload from "express-fileupload";
const express = require("express")

var cors = require("cors");
//Create an express application
const app = express();

app.use(cors());
// Middleware to be able to read incoming requests
app.use(express.json());
// Middleware to get info about requests 
app.use(morgan("dev"))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads"
}))
app.use(express.json({ limit: "10mb", extended: true }))
app.use(express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }))
// Set different routes
app.use("/users", UsersRouter);
app.use("/movies", MoviesRouter);
app.use("/genres", GenresRouter);

export default app;