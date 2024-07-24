import type { NextApiRequest, NextApiResponse } from 'next';
import { validate_jwt, decode_jwt } from 'jwt-library';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, token } = req.body;

    //using the validate_jwt and decode_jwt functions from the jwt-library package to validate the JWT token
    const isValid = validate_jwt(process.env.JWT_SECRET!, token);
    if (isValid) {
      const decoded = decode_jwt(process.env.JWT_SECRET!, token);
      if (decoded.id === email) {
        return res.status(200).json({ valid: true });
      }
    }

    res.status(401).json({ valid: false });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
