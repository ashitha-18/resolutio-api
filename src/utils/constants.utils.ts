import cors from "cors";

const allowedOrigins = ['http://localhost:3000', "https://resolutio.ai"];
export const corsOptions: cors.CorsOptions = {
    //origin: allowedOrigins
    origin: "*"
};

//Enums
export enum Roles { "System", "User" };
export enum ContentType { "Text", "Image" }
export enum Status { "Sent", "Received", "Pending" }
export enum SocialMediaType { "Twitter", "Behance", "Instagram" }
export enum Medium { "Film" , "Photo" , "Music" , "AI" , "Art" , "Other" }
export enum LicenseType {"CC BY" , "CC BY-SA" , "CC-BY-NC" , "CC-BY-NC-SA" , "CC-BY-ND" , "CC-BY-NC-ND" , "CC0" , "resolutio License" , "Your own License" }

//Status Codes
export const BAD_REQUEST = 400;
export const OK = 200;
export const CREATED = 201;
export const NOT_FOUND = 404;
export const UNAUTHORIZED = 401;
export const INTERNAL_SERVER_ERROR = 500;
export const SERVICE_UNAVAILABLE = 503;
export const PERMANENT_REDIRECT = 301;
export const TEMPORARY_REDIRECT = 301;

//Numbers
export const ONE = 1;
export const MINUSONE = -1;
export const TWO = 2;
export const ZERO = 0;
export const HUNDRED = 100;
export const BEARER = "bearer";

//Allowed File Extensions
export const allowedImageExtensions = ["jpg", "png"]

export const DEFAULT_CHAIN = "polygonTestnet";