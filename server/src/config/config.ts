import dotenv from 'dotenv';

// CONFIG TYPES
type TConfig = {
    [key: string]: EnvironmentConfig;
}

type EnvironmentConfig = {
    app: AppConfig;
}

type AppConfig = {
    PORT: string | number;
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
        }
    },
    production: {
        app: {
            PORT: process.env.PORT || 4001
        }
    }
}

export default CONFIG[ENV]
