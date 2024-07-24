# JWT Library

A type-safe library for handling JSON Web Tokens (JWTs). This library provides functions to encode, decode, and validate JWTs with support for common JWT claims such as `aud` (audience), `iat` (issued at), and `iss` (issuer).

## Installation

Install the package via npm:

```bash
npm install your-jwt-library
```

## Usage
### Encoding a JWT
The encode_jwt function creates a JWT using the provided secret, id, payload, and optional parameters for time-to-live (ttl), audience, and issuer.
```javascript
import { encode_jwt } from 'your-jwt-library';

const secret = 'your-secret-key';
const id = 'user-id';
const payload = { role: 'admin' };
const ttl = 3600; // Token expires in 1 hour
const audience = 'https://api.example.com';
const issuer = 'auth.example.com';

const token = encode_jwt(secret, id, payload, ttl, audience, issuer);
console.log(token);
```
### Decoding a JWT
The decode_jwt function decodes a JWT back into its components. It throws an error if the JWT cannot be decoded.
```javascript
import { decode_jwt } from 'your-jwt-library';

const token = 'your-jwt-token';
const secret = 'your-secret-key';

try {
  const decoded = decode_jwt(secret, token);
  console.log(decoded);
} catch (error) {
  console.error('Invalid token:', error.message);
}
```
### Validating a JWT
The validate_jwt function internally calls decode_jwt and returns true if the JWT is valid (including checking expiry, audience, and issuer if provided), otherwise returns false.

```javascript
import { validate_jwt } from 'your-jwt-library';

const token = 'your-jwt-token';
const secret = 'your-secret-key';
const audience = 'https://api.example.com';
const issuer = 'auth.example.com';

const isValid = validate_jwt(secret, token, audience, issuer);
console.log('Is token valid?', isValid);
```