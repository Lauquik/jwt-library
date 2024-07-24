import { encode_jwt, decode_jwt, validate_jwt } from "../src/jwt";
import jwt from "jsonwebtoken";

describe("JWT Functions", () => {
  const secret = "test_secret";
  const payload = { role: "user" };
  const id = "12345";
  const ttl = 3600; // 1 hour

  let token: string;

  beforeAll(() => {
    token = encode_jwt(secret, id, payload, ttl);
  });

  test("encode_jwt should return a valid JWT", () => {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    expect(decoded.id).toBe(id);
    expect(decoded.role).toBe(payload.role);
  });

  test("decode_jwt should decode a valid JWT", () => {
    const decodedJWT = decode_jwt(secret, token);
    expect(decodedJWT.id).toBe(id);
    expect(decodedJWT.payload.role).toBe(payload.role);
    expect(decodedJWT.expires_at).toBeInstanceOf(Date);
  });

  test("decode_jwt should throw an error for an invalid token", () => {
    expect(() => decode_jwt(secret, "invalid_token")).toThrow("Invalid token");
  });

  test("validate_jwt should return true for a valid JWT", () => {
    expect(validate_jwt(secret, token)).toBe(true);
  });

  test("validate_jwt should return false for an invalid JWT", () => {
    expect(validate_jwt(secret, "invalid_token")).toBe(false);
  });

  test("encode_jwt should handle optional parameters", () => {
    const audience = "test_audience";
    const issuer = "test_issuer";
    const tokenWithOptionalParams = encode_jwt(
      secret,
      id,
      payload,
      ttl,
      audience,
      issuer
    );
    const decoded = jwt.verify(
      tokenWithOptionalParams,
      secret
    ) as jwt.JwtPayload;
    expect(decoded.aud).toBe(audience);
    expect(decoded.iss).toBe(issuer);
  });
});
