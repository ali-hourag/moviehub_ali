

import { AiTwotoneEdit } from "react-icons/ai";
import "./homePage.css"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {


    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        defaultValues: {
            name: "",
            score: "",
            year: "",
            genre: "",
            imageUrl: ""
        }
    })

    const [editMovie, setEditMovie] = useState<boolean>(false);

    const editMovieById = (movieId: string) => {
        console.log("edit movie");
        setEditMovie(!editMovie);
    }

    const movieGenres: string[] = ["action", "comedy", "drama", "fantasy", "horror", "musicals", "mystery",
        "romance", "science fiction", "sports", "thriller", "western"]
    const submitForm = () => {
        console.log("Submit form");
    }

    const handleBackBtn = () => {
        setEditMovie(!editMovie);
    }

    const array = [1, 2, 3, 4, 5, 6]


    return (
        <div className="homepage-container">
            {!editMovie && array.map(a => (
                <div className="card-movie_div" key={a}>
                    <AiTwotoneEdit className="card-edit-icon" onClick={() => editMovieById("h")} />
                    <img src="https://highxtar.com/wp-content/uploads/2023/01/Thumb-H-Top-Boy-2023.jpg" className="photo-movie_img" />
                    <div className="movie-details-container_div">
                        <p className="movie-details_p">Name: Top boy</p>
                        <p className="movie-details_p">Score: 4/5</p>
                        <p className="movie-details_p">Year: 2018</p>
                        <p className="movie-details_p">Genre: action</p>
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
                                {movieGenres.map((genre, index) => (
                                    <option value={genre} key={index}>{genre}</option>
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
                            <img className="movie-current_img" src="https://highxtar.com/wp-content/uploads/2023/01/Thumb-H-Top-Boy-2023.jpg" />
                            {errors.imageUrl && <p className="addmovie-form-error">{errors.imageUrl.message}</p>}
                        </div>
                        <div className="addmovie-entry-container">
                            <button className="add-movie-submit_btn" type="submit">Upload</button>
                        </div>
                    </form>
                    <button className="home-back_btn" onClick={handleBackBtn}>GO BACK</button>
                </div>
            }

        </div>
    )
}
