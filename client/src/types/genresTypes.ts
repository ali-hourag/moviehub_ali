import { Movie } from "../context/UserContextProvider"

export type Genre = {
    name: string,
    id?: number,
    movies?: Movie;
    createdAt?: any,
    updatedAt?: any
}