import config from "../config/config";
import * as jwt from 'jsonwebtoken';

export const IsUserAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({
        status: 401,
        message: 'You are not authenticated!',
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
      req.user = decoded;
      req.decoded = decoded;
      next();
    });
  };

  export const verifyTokenAndAuthorization = (req, res, next) => {
    IsUserAuthenticated(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
  
  export const verifyTokenAndAdmin = (req, res, next) => {
    IsUserAuthenticated(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
  