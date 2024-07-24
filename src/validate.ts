import { createSignature, base64UrlDecode } from "./utils";


export function validate_jwt(
  secret: string,
  token: string,
  aud?: string,
  iss?: string
): boolean {
  const [header, payload, signature] = token.split(".");

  // create a signature using original secret
  const validSignature = createSignature(header, payload, secret);

  // Verify the token signature
  if (validSignature !== signature) {
    return false
  }

  const decodedPayload = JSON.parse(base64UrlDecode(payload));

  // check if given aud and iss match the token's aud and iss

  if (aud && decodedPayload.aud !== aud) {
    return false;
  }

  if (iss && decodedPayload.iss !== iss) {
    return false;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  if (decodedPayload.exp && decodedPayload.exp < currentTime) {
    return false;
  }

  return true;
}
