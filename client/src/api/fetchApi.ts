

export const getAllMoviesApi = async () => {
    const response = await fetch("http://localhost:8080/movies", {
        method: "GET",
        headers: {

        }
    });
    console.log(response);
    const dataFetched = await response.json();
    console.log(dataFetched);
    return dataFetched;
}