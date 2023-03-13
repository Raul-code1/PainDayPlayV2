import { Express, Request, Response } from 'express';

import { userLoginController, userRegisterController } from '../controllers/user.auth.controller';
import { userLoginSchema, userRegisterSchema } from '../schemas/user.auth.schema';
import validateFields from '../middleware/validate-middleware';

function routes(app: Express) {
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ msg: 'Server Is working' });
  });

  /* Auth routes  */
  app.post('/api/v1/auth/register', validateFields(userRegisterSchema), userRegisterController);
  app.post('/api/v1/auth/login', validateFields(userLoginSchema), userLoginController);
}

export default routes;
