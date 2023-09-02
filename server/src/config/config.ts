import dotenv from 'dotenv';

// CONFIG TYPES
type TConfig = {
    [key: string]: EnvironmentConfig;
}

type EnvironmentConfig = {
    app: AppConfig;
    db: MongoDBConfig
}

type AppConfig = {
    PORT: string | number;
}

type MongoDBConfig = {
    URI: string;
}

//SET DEVELOPMENT ENVIRONMENT
// if the process.env.NODE_ENV is undefined then it will be set to development
if (process.env.NODE_ENV == "production") {
    dotenv.config({ path: ".env.production" })
} else {
    dotenv.config({ path: '.env.development' })
}

//SET ENV VARIABLE TO USE IN THE COMPUTED VARIABLE
const ENV: string = process.env.NODE_ENV ?? 'development'


//CONFIGURATION DEPENDING ON THE DEVELOPMENT ENVIRONMENT
export const CONFIG: TConfig = {
    development: {
        app: {
            PORT: process.env.PORT || 4000
        },
        db: {
            URI: process.env.MONGODB_DATABASE_URI || 'mongodb://localhost:27017/test_development'
        }
    },
    production: {
        app: {
            PORT: process.env.PORT || 4001
        },
        db: {
            URI: process.env.MONGODB_DATABASE_URI || 'mongodb://localhost:27017/test_development'
        }
    }
}




export default CONFIG[ENV];
