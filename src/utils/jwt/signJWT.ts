import jwt from "jsonwebtoken";
import config from "src/config";

export default function signJWT(data: Record<string, unknown>) {
  return jwt.sign(data, config.jwtSecret, {
    expiresIn: "1d",
  });
}
