/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import { StatusCodes } from 'http-status-codes';
import path from 'path';

import { CreateCompanyInput, DeleteCompanyInput, UpdateCompanyInput } from '../schemas/company.schema';
import {
  createCompanyService,
  deleteCompanyService,
  findCompanyById,
  updateCompanyService,
} from '../services/company.user.admin.services';

/* Create company */
async function createCompany(req: Request<any, any, CreateCompanyInput['body']>, res: Response) {
  const company = await createCompanyService(req.body);
  res.status(StatusCodes.CREATED).json({ company });
}

/* Delete company */
async function deleteCompany(req: Request<DeleteCompanyInput['params']>, res: Response) {
  const { companyId } = req.params;
  const isCompanyExist = await findCompanyById(companyId);
  if (!isCompanyExist) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `No company found with id ${companyId}` });
  }
  await deleteCompanyService(companyId);
  return res.status(StatusCodes.OK).json({ msg: 'Company deleted successfully' });
}

/* Update company */
async function updateCompany(
  req: Request<UpdateCompanyInput['params'], any, UpdateCompanyInput['body']>,
  res: Response,
) {
  const { companyId } = req.params;
  const newCompany = req.body;

  const isCompanyExist = await findCompanyById(companyId);

  if (!isCompanyExist) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `No company found with id ${companyId}` });
  }

  const options = { new: true };

  const company = await updateCompanyService({ companyId, newCompany, options });

  return res.status(StatusCodes.OK).json({ company });
}

/* Upload image company */
async function uploadImage(req: Request, res: Response) {
  if (!req.files?.image) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please choose a file' });
  }

  const imageFile = req.files.image as UploadedFile;

  if (!imageFile || !imageFile.mimetype.startsWith('image')) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please choose a image file' });
  }

  const maxSize = 1024 * 1024;
  if (imageFile.size > maxSize) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Image too heavy ' });
  }

  const imagePath = path.join(__dirname, '../../public/uploads/' + `${imageFile.name}`);
  await imageFile.mv(imagePath);

  return res.status(StatusCodes.OK).json({ imageUrl: `/uploads/${imageFile.name}` });
}

export { createCompany, deleteCompany, updateCompany, uploadImage };
