import express from "express";
import prisma from "src/database/prismaClient";
import signJWT from "src/utils/jwt/signJWT";
import verifyJWT from "src/utils/jwt/verifyJWT";
import validator from "src/utils/validator";
import { z } from "zod";

const router = express.Router();

router.post(
  "/login",
  validator(
    z.object({
      body: z.object({
        username: z.string(),
        password: z.string(),
      }),
    })
  ),
  async (req, res) => {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
    if (!user) {
      return res.status(404).send("Incorrect username or password");
    }
    if (user.password !== req.body.password) {
      return res.status(404).send("Incorrect username or password");
    }
    const token = signJWT({
      id: user.id,
    });
    return res.status(200).send({ token, user: { username: user.username } });
  }
);

router.post(
  "/register",
  validator(
    z.object({
      body: z.object({
        username: z.string(),
        password: z.string(),
      }),
    })
  ),
  async (req, res) => {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    const token = signJWT({
      id: user.id,
    });
    return res.status(200).send({ token, user: { username: user.username } });
  }
);

router.get("/verify", (req, res) => {
  const token = req.headers.authorization;
  try {
    verifyJWT(token || "");
    return res.status(200).send("OK");
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
});

router.post("/verify", (req, res) => {
  const { token } = req.body;
  console.log(token);

  try {
    verifyJWT(token || "");
    return res.status(200).send("OK");
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
});

router.get("/info", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const data = verifyJWT(token || "");
    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });
    return res.status(200).send(user);
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
});

export default router;
