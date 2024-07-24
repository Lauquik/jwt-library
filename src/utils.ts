// Function to encode data to base64 format
export function base64UrlEncode(data: string): string {
  return Buffer.from(data)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

// Function to decode data from base64 format
export function base64UrlDecode(data: string): string {
  return Buffer.from(
    data.replace(/-/g, "+").replace(/_/g, "/"),
    "base64"
  ).toString();
}

// Function to create a signature
export function createSignature(
  header: string,
  payload: string,
  secret: string
): string {
  const data = `${header}.${payload}`;
  return base64UrlEncode(
    require("crypto").createHmac("sha256", secret).update(data).digest("base64")
  );
}