import type { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from './authmiddleware';

const greetHandler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == 'GET') {
        return res.status(200).json({ message: 'Welcome! You are authorized' });
    } else {
        return res.status(405).end(); // Method Not Allowed
    }
};

export default authMiddleware(greetHandler);
