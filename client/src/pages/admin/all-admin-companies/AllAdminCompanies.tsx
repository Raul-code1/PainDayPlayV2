import { useGetAllCompaniesQuery } from '../../../redux/services/companiesApi';
import { AllAdminCompaniesContainer } from './styled-components/all-admin-companies';
import { DisplayCompanies } from './components';

export default function AllAdminCompanies() {
  const { data: companies, isLoading } = useGetAllCompaniesQuery({ category: 'all', pricing: 'pricing' });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!companies) {
    return <h1>Something Went Wrong!</h1>;
  }

  return (
    <AllAdminCompaniesContainer>
      <DisplayCompanies companies={companies.companies} />
    </AllAdminCompaniesContainer>
  );
}
