import { Express, Request, Response } from 'express';

import { userLoginController, userRegisterController } from '../controllers/user.auth.controller';
import { userLoginSchema, userRegisterSchema } from '../schemas/user.auth.schema';
import validateFields from '../middleware/validate-middleware';
import { getAllCompanies, getSingleCompany } from '../controllers/company.controller';
import { createCompany, deleteCompany, updateCompany, uploadImage } from '../controllers/company.user.admin.controller';
import { authenticationMiddleware, authorizePermissions } from '../middleware/authentication.middleware';
import {
  createCompanySchema,
  deleteCompanySchema,
  updateCompanySchema,
  queriesForCompaniesFilterSchema,
} from '../schemas/company.schema';
import { createComment, deleteComment, getAllComments, updateComment } from '../controllers/comments.controller';
import {
  getAllCommentsSchema,
  deleteCommentSchema,
  updateCommentSchema,
  createCommentSchema,
} from '../schemas/comments.schema';

function routes(app: Express) {
  app.get('/working', (req: Request, res: Response) => {
    res.status(200).json({ msg: 'Server Is working' });
  });

  /* //* Auth routes  */
  app.post('/api/v1/auth/register', validateFields(userRegisterSchema), userRegisterController);
  app.post('/api/v1/auth/login', validateFields(userLoginSchema), userLoginController);

  /* //* Public companies requests */
  app.get('/api/v1/companies', validateFields(queriesForCompaniesFilterSchema), getAllCompanies);
  app.get('/api/v1/company/:companyId', getSingleCompany);

  /* //* Admin user  companies requests */
  app.post(
    '/api/v1/company',
    [authenticationMiddleware, authorizePermissions('admin'), validateFields(createCompanySchema)],
    createCompany,
  );
  app.patch(
    '/api/v1/company/:companyId',
    [authenticationMiddleware, authorizePermissions('admin'), validateFields(updateCompanySchema)],
    updateCompany,
  );
  app.delete(
    '/api/v1/company/:companyId',
    [authenticationMiddleware, authorizePermissions('admin'), validateFields(deleteCompanySchema)],
    deleteCompany,
  );
  app.post('/api/v1/company/upload-image', [authenticationMiddleware, authorizePermissions('admin')], uploadImage);

  /* //*Comments requests */
  app.get('/api/v1/comments/:companyId', validateFields(getAllCommentsSchema), getAllComments);
  app.post('/api/v1/comment', [authenticationMiddleware, validateFields(createCommentSchema)], createComment);
  app.delete(
    '/api/v1/comment/:commentId',
    [authenticationMiddleware, validateFields(deleteCommentSchema)],
    deleteComment,
  );
  app.patch(
    '/api/v1/comment/:commentId',
    [authenticationMiddleware, validateFields(updateCommentSchema)],
    updateComment,
  );
}

export default routes;
