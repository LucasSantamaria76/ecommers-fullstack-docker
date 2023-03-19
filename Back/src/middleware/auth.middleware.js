import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = (req, res, next) => {
  const SECRET = process.env.SECRET || '';
  let { authorization: token } = req.headers;

  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        res.status(400).json({
          error: 'invalid token',
          message: 'El token no es válido o ya expiro, envía un token correcto',
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(498).json({ message: 'No token provider' });
  }
};
