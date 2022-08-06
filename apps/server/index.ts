import path from "path";

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

app
  .use(
    express.static(path.join(__dirname, "/public"), {
      maxAge: "30 days",
      setHeaders: (res, path) => {
        console.log("Serving fresh content for", path);
        if (["html", "htm"].find((ext) => path.endsWith(ext))) {
          res.setHeader("Cache-Control", "public, max-age=0");
        }
      },
    })
  )
  .get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

connectPrisma().then(() => {
  app.listen(config.port, () => {
    console.log("Server listening on port", port);
  });
});
