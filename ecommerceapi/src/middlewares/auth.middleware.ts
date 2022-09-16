import config from "../config/config";
import * as jwt from 'jsonwebtoken';
export const IsUserAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(403).json({
        status: 403,
        message: 'FORBIDDEN',
        success:false,
      });
    }
  //   const isTokenValid =  jwt.verify(authHeader, envConfig.auth.secret);
    jwt.verify(authHeader, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'UNAUTHORIZED',
        });
      }
      req.decoded = decoded;
      next();
    });
  };