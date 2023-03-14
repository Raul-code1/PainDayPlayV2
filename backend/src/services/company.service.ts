import CompanyModel from '../models/company.model';

async function getAllCompaniesService() {
  /* //todo:query filters */

  return CompanyModel.find({});
}

async function getSingleCompanyService(companyId: string) {
  return CompanyModel.findOne({ _id: companyId });
}

export { getAllCompaniesService, getSingleCompanyService };
