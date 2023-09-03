import { DATA_SOURCE } from "../db/clientPrisma"


export const convertToType = (id: string) => {
    if (DATA_SOURCE === "postgresql") {
        return Number(id)
    } else {
        return id
    }
}