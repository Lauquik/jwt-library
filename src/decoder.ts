import { DecodedJWT, Payload } from './interfaces';
import { createSignature, base64UrlDecode } from './utils';

export function decode_jwt(secret: string, token: string): DecodedJWT {
  const [header, payload, signature] = token.split('.');
  
  // create a signature using original secret
  const validSignature = createSignature(header, payload, secret);
  if (validSignature !== signature) {
    throw new Error('Invalid token');
  }

  const decodedPayload: Payload = JSON.parse(base64UrlDecode(payload));

  // Check if the token has expired
  if (decodedPayload.exp && decodedPayload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token has expired');
  }

  return {
    id: decodedPayload.id,
    payload: decodedPayload,
    expires_at: decodedPayload.exp,
  };
}
