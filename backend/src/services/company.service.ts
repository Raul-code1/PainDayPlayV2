import CompanyModel from '../models/company.model';

async function getAllCompaniesService({ category, price }: { category: string; price: string }) {
  const queryObject: { category?: string } = {};

  if (category !== 'all') {
    queryObject.category = category;
  }

  return CompanyModel.find(queryObject).sort(`${price}.price`);
}

async function getSingleCompanyService(companyId: string) {
  return CompanyModel.findOne({ _id: companyId });
}

export { getAllCompaniesService, getSingleCompanyService };
