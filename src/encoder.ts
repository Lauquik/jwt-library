import { Payload } from "./interfaces";
import { base64UrlEncode, createSignature } from "./utils";


  function createHeader(): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };
    return base64UrlEncode(JSON.stringify(header));
  }
  
  function createPayload(id: string | number, payload: Payload, ttl?: number, aud?: string, iss?: string): string {
    const currentTime = Math.floor(Date.now() / 1000);
    const extendedPayload = {
      ...payload,
      id,
      iat: currentTime,
      exp: ttl ? currentTime + ttl : undefined,
      aud,
      iss
    };
    return base64UrlEncode(JSON.stringify(extendedPayload));
  }
  
  export function encode_jwt(secret: string, id: string | number, payload: Payload, ttl?: number, aud?: string, iss?: string): string {
    const header = createHeader();
    const payloadData = createPayload(id, payload, ttl, aud, iss);
    const signature = createSignature(header, payloadData, secret);
    // join the encoded header, payload, and signature with a dot
    return `${header}.${payloadData}.${signature}`;
  }
  