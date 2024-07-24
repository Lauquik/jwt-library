export interface Payload {
  [key: string]: any;
}

export interface DecodedJWT {
  id: string;
  payload: Payload;
  expires_at: Date;
}
