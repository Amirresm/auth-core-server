require("dotenv").config();

const config = {
  port:
    ((process.env.NODE_ENV === "development"
      ? process.env.DEV_PORT
      : process.env.PORT) as string) || "4000",
  dbUri: process.env.DB_URL as string,
  jwtSecret: process.env.JWT_SECRET as string,
};

export default config;
