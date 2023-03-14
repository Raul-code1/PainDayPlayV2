/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyJWT } from '../utils/jwt';

function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  const headerAuthorization = req.headers.authorization;

  if (!headerAuthorization || !headerAuthorization.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Unauthorized' });
  }

  const token = headerAuthorization?.split(' ')[1];

  const { payload, valid } = verifyJWT(token as string);
  if (valid && payload) {
    res.locals.user = payload;
    return next();
  } else if (!payload && !valid) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Authentication invalid' });
  }
}

function authorizePermissions(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(res.locals.user.role)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Unauthorized to access this route' });
    }

    return next();
  };
}

export { authenticationMiddleware, authorizePermissions };
