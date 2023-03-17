import { useParams } from 'react-router-dom';

import { useGetSingleCompanyQuery } from '../../../../redux/services/companiesApi';
import { Comments, CompanyInfo } from './components';
import { SingleCompanyContainer } from './styled-components/single-company';

export default function SingleCompanyPage() {
  const { companyId } = useParams();

  const { data: company, isLoading } = useGetSingleCompanyQuery(companyId as string);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!company || !companyId) {
    return <h1>Ups Something went wrong</h1>;
  }

  return (
    <SingleCompanyContainer>
      <CompanyInfo company={company.company} />
      <Comments companyId={companyId} />
    </SingleCompanyContainer>
  );
}
