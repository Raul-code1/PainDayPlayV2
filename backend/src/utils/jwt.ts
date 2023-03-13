import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secretDevKey';
const expiresInd = process.env.JWT_EXPIRE;

function createJWT(payload: { name: string; userId: string; role: string }) {
  return jwt.sign(payload, secret, { expiresIn: expiresInd });
}

export { createJWT };
