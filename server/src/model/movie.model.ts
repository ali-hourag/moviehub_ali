import { Document, Schema, model } from 'mongoose';

interface IMovieDocument extends Document {
    name: string,
    year: number,
    posterImage?: string,
    score?: number,
    genres?: string[],
    createdAt: Date,
    updatedAt: Date
}

const MovieSchema = new Schema<IMovieDocument>({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    year: {
        type: Number,
        required: [true, "Year is required"]
    },
    posterImage: {
        type: String
    },
    score: {
        type: Number
    },
    genres: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Genre' }]
    }
}, { timestamps: true, versionKey: false })

const MovieModel = model<IMovieDocument>("Movie", MovieSchema)

export default MovieModel;