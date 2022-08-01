require("dotenv").config();

const config: { port: number; dbUri: string } = {
  port: process.env.PORT as unknown as number,
  dbUri: process.env.DB_URL as unknown as string,
};

export default config;
