
import { Movie } from "../context/UserContextProvider";
import { Genre } from "../types/genresTypes";


export const getAllMoviesApi = async (getToken: any) => {
    const { VITE_API_URL: url } = import.meta.env;
    const token = await getToken();
    const response = await fetch(`${url}/movies`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8"
        }

    });
    const dataFetched = await response.json();
    return dataFetched;
}

export const getUserByEmail = async (getToken: any, userEmail: string) => {
    const { VITE_API_URL: url } = import.meta.env;
    const token = await getToken();
    const response = await fetch(`${url}/users/${userEmail}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const dataFetched = await response.json();
    return [response, dataFetched];
}

export const createUser = async (userObject: {}) => {
    const { VITE_API_URL: url } = import.meta.env;
    console.log(JSON.stringify(userObject));
    const response = await fetch(`${url}/users`, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(userObject)
    });
    console.log(response);
    const dataFetched = await response.json();
    console.log(dataFetched);
    return dataFetched;
}

export const getAllGenres = async () => {
    const { VITE_API_URL: url } = import.meta.env;
    const response = await fetch(`${url}/genres`);
    const dataFetched = response.json();
    return dataFetched;
}



export const updateMovieGenre = async (getToken: any, movie: Movie, genre: Genre) => {
    const { VITE_API_URL: url } = import.meta.env;
    const token = await getToken();
    const response = await fetch(`${url}/movies/${movie.id}/${genre.name}`, {
        method: "PATCH",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ name: genre.name })

    });
    const dataFetched = await response.json();
    return dataFetched;
}

export const deleteUser = async (getToken: any, userEmail: string) => {
    const { VITE_API_URL: url } = import.meta.env;
    const token = await getToken();
    await fetch(`${url}/users/${userEmail}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}
export const updateMovie = async (getToken: any, movie: Movie) => {
    const { VITE_API_URL: url } = import.meta.env;
    const token = await getToken();
    const formDataMovie = new FormData();
    formDataMovie.append("name", movie.name);
    formDataMovie.append("year", movie.year.toString());
    formDataMovie.append("score", movie.score.toString());
    formDataMovie.append("posterImage", movie.posterImage);
    formDataMovie.append("genre", movie.genre);
    const response = await fetch(`${url}/movies/${movie.id}`, {
        method: "PATCH",
        headers: {
            authorization: `Bearer ${token}`
        },
        body: formDataMovie

    });
    console.log(response);
    const dataFetched = await response.json();
    return dataFetched;
}
export const createMovie = async (getToken: any, userId: number, movie: Movie) => {
    const { VITE_API_URL: url } = import.meta.env;
    const token = await getToken();
    console.log(movie);
    const formDataMovie = new FormData();
    formDataMovie.append("name", movie.name);
    formDataMovie.append("year", movie.year.toString());
    formDataMovie.append("score", movie.score.toString());
    formDataMovie.append("posterImage", movie.posterImage);
    formDataMovie.append("genre", movie.genre);

    const response = await fetch(`${url}/movies/${userId}/${movie.genre}`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`
        },
        body: formDataMovie
    });
    console.log(response);
    const dataFetched = await response.json();
    console.log(dataFetched);
    return dataFetched;

}

export const deleteMovie = async (getToken: any, movieId: number,) => {
    const { VITE_API_URL: url } = import.meta.env;
    const token = await getToken();
    const response = await fetch(`${url}/movies/${movieId}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`
        },
    })
    console.log(response);
}