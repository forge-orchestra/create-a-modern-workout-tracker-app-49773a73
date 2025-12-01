import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthTokenPayload = {
  userId: string;
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Generates a JWT token for a given user.
 * @param {User} user - The user object.
 * @returns {string} - The generated JWT token.
 * @throws {Error} - Throws an error if token generation fails.
 */
function generateToken(user: User): string {
  try {
    const payload: AuthTokenPayload = { userId: user.id };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  } catch (error) {
    throw new Error('Token generation failed');
  }
}

/**
 * Verifies a JWT token and returns the decoded payload.
 * @param {string} token - The JWT token to verify.
 * @returns {AuthTokenPayload} - The decoded token payload.
 * @throws {Error} - Throws an error if token verification fails.
 */
function verifyToken(token: string): AuthTokenPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch (error) {
    throw new Error('Token verification failed');
  }
}

/**
 * Middleware to protect API routes.
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse} res - The API response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
function authMiddleware(req: NextApiRequest, res: NextApiResponse, next: Function): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'Authorization header missing' });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Token missing' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export { generateToken, verifyToken, authMiddleware };