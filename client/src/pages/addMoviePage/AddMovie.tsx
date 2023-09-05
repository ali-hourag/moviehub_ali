import { useForm } from "react-hook-form"
import "./addMovie.css"

export const AddMovie = () => {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        defaultValues: {
            name: "",
            score: "",
            year: "",
            genre: "",
            imageUrl: ""
        }
    })

    const movieGenres: string[] = ["action", "comedy", "drama", "fantasy", "horror", "musicals", "mystery",
        "romance", "science fiction", "sports", "thriller", "western"]
    const submitForm = () => {
        console.log("Submit form");
    }
    return (
        <div className="addmovie-container_div">
            <h3 className="addmovie-title">ADD MOVIE</h3>
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
                <div className="addmovie-entry-container">
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
                    {errors.imageUrl && <p className="addmovie-form-error">{errors.imageUrl.message}</p>}
                </div>
                <div className="addmovie-entry-container">
                    <button className="add-movie-submit_btn" type="submit">Upload</button>
                </div>
            </form>
        </div>
    )
}
