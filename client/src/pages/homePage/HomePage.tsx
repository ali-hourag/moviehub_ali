

import { AiTwotoneEdit } from "react-icons/ai";
import "./homePage.css"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createUser, deleteMovie, getAllGenres, getUserByEmail, updateMovie, updateMovieGenre } from "../../api/fetchApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserContext } from "../../utils/hooks/useUserContext";
import { Movie, UserType } from "../../context/UserContextProvider";
import { Genre } from "../../types/genresTypes";

export const HomePage = () => {


    const { getAccessTokenSilently } = useAuth0();
    const { user } = useAuth0();
    const { currentUser, setCurrentLoggedUser } = useUserContext();
    const [genres, setGenres] = useState<Genre[]>([]);
    const [editMovie, setEditMovie] = useState<boolean>(false);
    const [movie, setMovie] = useState<Movie>();

    useEffect(() => {
        (async function getUser() {
            if (user?.email) {
                const userData = await getUserByEmail(getAccessTokenSilently, user?.email)
                const fetchStatus = userData[0].status
                const userFetched = userData[1] as UserType;
                if (fetchStatus === 200) {
                    //Already existing so, just upload userContext with it
                    setCurrentLoggedUser(userFetched);
                } else if (fetchStatus === 400) {
                    const newUser = {
                        name: user.name,
                        email: user.email,
                        password: user.email
                    }
                    // Then it does not exist, and has to be created
                    const userCreated = await createUser(newUser);
                    setCurrentLoggedUser(userCreated);

                }
            }
        }())
    }, [user])



    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
        defaultValues: {
            name: "",
            score: "",
            year: "",
            genre: "",
            imageUrl: ""
        }
    })



    const editMovieClicked = (movieToEdit: Movie) => {
        setValue("name", movieToEdit.name);
        if (movieToEdit.score) setValue("score", movieToEdit.score.toString());
        if (movieToEdit.genre) setValue("genre", movieToEdit.genre);
        setMovie(movieToEdit)
        setEditMovie(!editMovie);
    }

    const submitForm = () => {
        //Upload image
        const name = watch("name")
        const year = parseInt(watch("year"))
        const score = parseInt(watch("score"))
        const genre = watch("genre");
        // const posterImage = watch("imageUrl")
        const posterImage = watch("imageUrl")
        const updatesMovie: Movie = {
            name: name,
            id: movie?.id,
            year: year,
            score: score,
            posterImage: posterImage,
            genre: genre
        };

        (async function fetchUpdates() {
            console.log(updatesMovie);
            const newMovie = await updateMovie(getAccessTokenSilently, updatesMovie)
            const newGenre: Genre = {
                name: watch("genre")
            }
            console.log(newMovie);
            const newMovieGenre = await updateMovieGenre(getAccessTokenSilently, newMovie, newGenre)
            console.log(newMovieGenre);
        }())
    }

    const handleBackBtn = () => {
        setEditMovie(!editMovie);
    }
    const removeMovie = (movieId: number | undefined) => {
        (async function removeMovies() {
            if (movieId) {
                await deleteMovie(getAccessTokenSilently, movieId);
            }

        }())
    }

    useEffect(() => {
        (async function getAllMoviesData() {
            const genresFetched = await getAllGenres();
            setGenres(genresFetched)
        }())
    }, [])


    return (
        <div className="homepage-container">
            {!editMovie && currentUser?.movies && currentUser.movies.map((movie, index) => (
                <div className="card-movie_div" key={index}>
                    <AiTwotoneEdit className="card-edit-icon" onClick={() => editMovieClicked(movie)} />
                    <img src={movie.posterImage} className="photo-movie_img" />
                    <div className="movie-details-container_div">
                        <p className="movie-details_p">Name: {movie.name}</p>
                        <p className="movie-details_p">Score: {movie.score}/5</p>
                        <p className="movie-details_p">Year: {movie.year}</p>
                        <p className="movie-details_p">Genre: {movie?.genre}</p>
                    </div>

                </div>
            ))}
            {editMovie &&
                <div className="updatemovie-container">
                    <form className="addmovie-form" onSubmit={handleSubmit(submitForm)}>
                        <div className="addmovie-entry-container">
                            <label htmlFor="addmovie-name" className="addmovie-name_label addmovie_label">
                                Name:
                            </label>
                            <input id="addmovie-name"

                                className="addmovie-name_input addmovie_input" type="text"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name is required."
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "Use 2 or more chararacters."
                                    },
                                    maxLength: {
                                        value: 25,
                                        message: "Name is too long."
                                    }
                                })}
                            />
                            {errors.name && <p className="addmovie-form-error">{errors.name.message}</p>}
                        </div>
                        <div className="addmovie-entry-container">
                            <label htmlFor="addmovie-score" className="addmovie-score_label addmovie_label">
                                Score:
                            </label>
                            <input id="addmovie-score"
                                className="addmovie-score_input addmovie_input"
                                type="number" step="0.1" min="0" max="5"
                                {...register("score", {
                                    required: {
                                        value: true,
                                        message: "Score is required."
                                    }
                                })}
                            />
                            {errors.score && <p className="addmovie-form-error">{errors.score.message}</p>}

                        </div>
                        <div className="addmovie-entry-container">
                            <label htmlFor="addmovie-year" className="addmovie-year_label addmovie_label">
                                Year:
                            </label>
                            <input id="addmovie-year"
                                value={movie?.year}
                                className="addmovie-year_input addmovie_input"
                                type="number" min="1895" max="2023"
                                {...register("year", {
                                    required: {
                                        value: true,
                                        message: "Year is required."
                                    }
                                })}
                            />
                            {errors.year && <p className="addmovie-form-error">{errors.year.message}</p>}

                        </div>
                        <div className="addmovie-entry-container">
                            <label htmlFor="addmovie-select-genre" className="addmovie-genre_label addmovie_label">
                                Select a genre for your song
                            </label>
                            <select className="addmovie-genre-select" id="addmovie-select-genre"
                                {...register("genre", {
                                    required: {
                                        value: true,
                                        message: "Genre selection is required"
                                    }
                                })}
                            >
                                <option value="" disabled hidden>Select a genre for your song</option>
                                {genres && genres.map((genre, index) => (
                                    <option value={genre.name} key={index}>{genre.name}</option>
                                ))}
                            </select>
                            {errors.genre && <p className="addmovie-form-error">{errors.genre.message}</p>}
                        </div>
                        <div className="addmovie-entry-container-home">
                            <label htmlFor="addmovie-image" className="addmovie-image_label addmovie_label">
                                Select a cover:
                            </label>
                            <input id="addmovie-image"
                                className="addmovie-image_input addmovie_input"
                                type="file"
                                accept="image/jpeg, image/jpg image/webp"
                                placeholder="Select an image cover..."
                                {...register("imageUrl", {
                                    required: {
                                        value: true,
                                        message: "Image is required"
                                    }
                                })}
                            />
                            <img className="movie-current_img" src={movie?.posterImage} />
                            {errors.imageUrl && <p className="addmovie-form-error">{errors.imageUrl.message}</p>}
                        </div>
                        <div className="addmovie-entry-container edit-movie-btns">
                            <button className="add-movie-submit_btn" type="submit">Upload</button>
                            <button className="add-movie-submit_btn" onClick={() => removeMovie(movie?.id)}>REMOVE</button>
                        </div>
                    </form>
                    <button className="home-back_btn" onClick={handleBackBtn}>GO BACK</button>
                </div>
            }

        </div>
    )
}
