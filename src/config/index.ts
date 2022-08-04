require("dotenv").config();

const config = {
  port: process.env.PORT as string,
  dbUri: process.env.DB_URL as string,
  jwtSecret: process.env.JWT_SECRET as string,
};

export default config;
