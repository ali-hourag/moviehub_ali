import mongoose from "mongoose";
import config from "../config/config";

const connect = () => {
    return mongoose.connect(config.db.URI)
}

export default connect;