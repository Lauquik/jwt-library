import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { validate_jwt } from 'jwt-library';

export const authMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const isValid = validate_jwt(process.env.JWT_SECRET!, token);

    if (!isValid) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    return handler(req, res);
  };
};
