import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secretDevKey';
const expiresInd = process.env.JWT_EXPIRE;

function createJWT(payload: { name: string; userId: string; role: string }) {
  return jwt.sign(payload, secret, { expiresIn: expiresInd });
}

function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, secret);

    return {
      valid: true,
      payload: decoded,
    };
  } catch (error) {
    return {
      valid: false,
      payload: null,
    };
  }
}

export { createJWT, verifyJWT };
