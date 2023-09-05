import { auth } from "express-oauth2-jwt-bearer";
import config from "../config/config";
console.log("sii");
export const checkJwtMiddleware = auth({
    audience: config.auth0.audience,
    issuerBaseURL: config.auth0.issuer,
})