/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getAllCompaniesService, getSingleCompanyService } from '../services/company.service';
import { GetCompaniesFiltersType, GetSingleCompanyType } from '../schemas/company.schema';

/* Get all companies */
async function getAllCompanies(req: Request<any, any, any, GetCompaniesFiltersType['query']>, res: Response) {
  const { category, price } = req.query;

  const companies = await getAllCompaniesService({ category, price });
  return res.status(StatusCodes.OK).json({ companies, count: companies.length });
}

/* Get single company */
async function getSingleCompany(req: Request<GetSingleCompanyType['params']>, res: Response) {
  const { companyId } = req.params;

  const company = await getSingleCompanyService(companyId);

  if (!company) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `No company with id ${companyId}` });
  }
  return res.status(StatusCodes.OK).json({ company });
}

export { getAllCompanies, getSingleCompany };
