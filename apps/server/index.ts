import bodyParser from "body-parser";
import config from "./src/config";
import cors from "cors";
import express from "express";
import { connectPrisma } from "./src/database/prismaClient";
import router from "./src/routes";

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

app.use("/api", router);

app.use(express.static(__dirname + "/public"));
app.use("*", (req, res, next) => {
  res.setHeader("Cache-Control", "no-cache");
  res.sendFile("public/index.html", {
    root: __dirname,
  });
});

connectPrisma().then(() => {
  app.listen(config.port, () => {
    console.log("Server listening on port", port);
  });
});
