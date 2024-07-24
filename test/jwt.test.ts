import { encode_jwt } from "../src/encoder";
import { decode_jwt } from "../src/decoder";
import { validate_jwt } from "../src/validate";
import jwt from "jsonwebtoken";
import { DecodedJWT, Payload } from "../src/interfaces";

describe("JWT Functions", () => {
  let secret = "test_secret";
  const payload = { role: "user" };
  const id = "12345";
  const ttl = 3600; // 1 hour

  let token: string;

  beforeAll(() => {
    token = encode_jwt(secret, id, payload, ttl);
  });

  test("encode_jwt should return a valid JWT", () => {
    const decoded = decode_jwt(secret, token) as DecodedJWT;
    expect(decoded.id).toBe(id);
    expect(decoded.payload.role).toBe(payload.role);
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
    //wait for the encoding
    const tokenWithOptionalParams = encode_jwt(
      secret,
      id,
      payload,
      ttl,
      audience,
      issuer
    );

    if(!tokenWithOptionalParams) throw new Error('Token is empty')
    
    const decoded = decode_jwt(
      secret=secret,
      token=tokenWithOptionalParams,
    ) as DecodedJWT;
    expect(decoded.payload.aud).toBe(audience);
    expect(decoded.payload.iss).toBe(issuer);
  });
});
