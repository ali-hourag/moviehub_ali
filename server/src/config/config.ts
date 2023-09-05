import dotenv from 'dotenv';

dotenv.config();


export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// CONFIG TYPES
type TConfig = {
    [key: string]: EnvironmentConfig;
}

type EnvironmentConfig = {
    app: AppConfig;
    auth0: Auth0Config;
}

type AppConfig = {
    PORT: string | number;
}

type Auth0Config = {
    client_origin: string | undefined,
    audience: string | undefined,
    issuer: string | undefined
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
        auth0: {
            client_origin: process.env.APP_ORIGIN,
            audience: process.env.AUTH0_AUDIENCE,
            issuer: process.env.AUTH0_ISSUER
        }
    },
    production: {
        app: {
            PORT: process.env.PORT || 4001
        },
        auth0: {
            client_origin: process.env.APP_ORIGIN,
            audience: process.env.AUTH0_AUDIENCE,
            issuer: process.env.AUTH0_ISSUER
        }
    }
}


export default CONFIG[ENV];
