import jwt, { JwtPayload } from "jsonwebtoken";
import config from "src/config";

export default function verifyJWT(token: string) {
  return jwt.verify(token, config.jwtSecret) as JwtPayload;
}
