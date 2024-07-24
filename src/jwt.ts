import jwt from "jsonwebtoken";
import { Payload, DecodedJWT } from "./interfaces";

//encode jwt
export function encode_jwt(
  secret: string,
  id: string | number,
  payload: Payload,
  ttl?: number,
  audience?: string,
  issuer?: string
): string {
  const options: jwt.SignOptions = {
    expiresIn: ttl,
  };
  if (audience) options.audience = audience;
  if (issuer) options.issuer = issuer;
  return jwt.sign({ id, ...payload }, secret, options);
}

//decode jwt
export function decode_jwt(secret: string, token: string): DecodedJWT {
  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    return {
      id: decoded.id,
      payload: decoded,
      expires_at: new Date((decoded.exp ?? 0) * 1000),
    };
  } catch (error) {
    throw new Error("Invalid token");
  }
}

//validate jwt
export function validate_jwt(secret: string, token: string): boolean {
  try {
    decode_jwt(secret, token);
    return true;
  } catch (error) {
    return false;
  }
}
