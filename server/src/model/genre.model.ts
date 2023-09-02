import { Document, Schema, model } from "mongoose";

interface IGenreDocument extends Document {
    name: string,
    createdAt: Date,
    updatedAt: Date
}

const GenreSchema = new Schema<IGenreDocument>({
    name: {
        type: String,
        required: [true, "Name is required"]
    }
}, { timestamps: true, versionKey: false })

const GenreModel = model<IGenreDocument>("Genre", GenreSchema);

export default GenreModel;