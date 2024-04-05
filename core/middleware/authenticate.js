import jwt from 'jsonwebtoken';
import prisma from '../libs/prisma';

const verifyToken = (token) => {
  // Replace 'your-secret-key' with your actual JWT secret key
  return jwt.verify(token, process.env.JWT_SIGNATURE);
};

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = verifyToken(token);
    const userId = decoded.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

export default authMiddleware;
