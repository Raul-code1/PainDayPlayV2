/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { UserLoginInput, UserRegisterInput } from '../schemas/user.auth.schema';
import { userLoginService, userRegisterService } from '../services/user.auth.service';
import { UserRegisterOutput } from '../interfaces/user.interfaces';
import { createJWT } from '../utils/jwt';

async function userRegisterController(req: Request<any, any, UserRegisterInput['body']>, res: Response) {
  try {
    const user = await userRegisterService(req.body);
    const token = createJWT({ userId: user._id, name: user.name, role: user.role });
    const userResponse: UserRegisterOutput = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };

    return res.status(StatusCodes.CREATED).json(userResponse);
  } catch (error: any) {
    return res.status(StatusCodes.CONFLICT).send(error.message);
  }
}

async function userLoginController(req: Request<any, any, UserLoginInput['body']>, res: Response) {
  const user = await userLoginService(req.body);

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid password or email ' });
  }
  const token = createJWT({ userId: user._id, name: user.name, role: user.role });
  const userResponse: UserRegisterOutput = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };

  return res.status(StatusCodes.OK).json(userResponse);
}

export { userRegisterController, userLoginController };
