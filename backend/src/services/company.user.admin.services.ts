/* eslint-disable @typescript-eslint/no-explicit-any */
import CompanyModel, { Company } from '../models/company.model';

async function createCompanyService(companyInput: Company) {
  try {
    const company = await CompanyModel.create(companyInput);
    return company;
  } catch (error: any) {
    throw new Error(error);
  }
}

async function findCompanyById(companyId: string) {
  try {
    const company = await CompanyModel.findOne({ _id: companyId });
    return company;
  } catch (error) {
    throw new Error(error as any);
  }
}

async function deleteCompanyService(companyId: string) {
  return CompanyModel.deleteOne({ _id: companyId });
}

async function updateCompanyService({
  companyId,
  newCompany,
  options,
}: {
  companyId: string;
  newCompany: Company;
  options: { new: boolean };
}) {
  return CompanyModel.findByIdAndUpdate({ _id: companyId }, newCompany, options);
}

export { createCompanyService, deleteCompanyService, findCompanyById, updateCompanyService };
