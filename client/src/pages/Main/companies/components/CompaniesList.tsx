import { CompaniesResponse } from '../../../../models/companies.types';
import { CompanyListContainer } from '../styled-components/company-list';
import CompanyCard from './CompanyCard';

type Props = {
  companies: CompaniesResponse;
};

export default function CompaniesList({ companies }: Props) {
  console.log(companies);

  return (
    <CompanyListContainer>
      {companies.companies.map((company) => (
        <CompanyCard key={company._id} company={company} />
      ))}
    </CompanyListContainer>
  );
}
