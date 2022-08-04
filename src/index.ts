import bodyParser from "body-parser";
import config from "./config";
import cors from "cors";
import express from "express";
import prisma, { connectPrisma } from "./database/prismaClient";
import router from "./routes";

const port = config.port || 4000;

const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const corsConfig = cors({
  origin: "*",
});

app.use(jsonParser);
app.use(urlencodedParser);
app.use(corsConfig);
app.options("*", corsConfig);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} --- ${req.ip}`);
  next();
});

app.use(express.static("public"));

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

connectPrisma().then(() => {
  app.listen(config.port, () => {
    console.log("Server listening on port", port);
  });
});
