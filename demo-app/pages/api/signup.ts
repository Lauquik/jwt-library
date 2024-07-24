import type { NextApiRequest, NextApiResponse } from 'next';
import { encode_jwt } from 'jwt-library';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { firstName, email } = req.body;

    //using the encode_jwt function from the jwt-library package to generate a JWT token
    const token = encode_jwt(process.env.JWT_SECRET!, email, { firstName }, 3600);

    res.status(200).json({ token });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
