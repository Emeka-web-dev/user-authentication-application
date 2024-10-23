import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const PORT = process.env.PORT;

export const DATABASE_URL = process.env.DATABASE_URL;

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const NODE_ENV = process.env.NODE_ENV!;
