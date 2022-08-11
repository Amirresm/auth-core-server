import path from "path";
import dotenv from "dotenv";

dotenv.config();
if (process.env.NODE_ENV === "development")
  dotenv.config({
    path: path.join(__dirname, "..", "..", ".env.development.local"),
  });
if (process.env.NODE_ENV === "production")
  dotenv.config({
    path: path.join(__dirname, "..", "..", ".env.production.local"),
  });

const config = {
  port: (process.env.PORT as string) || "4000",
  dbUri: process.env.DB_URL as string,
  jwtSecret: process.env.JWT_SECRET as string,
};

export default config;
