import { useState } from 'react';
import { useGetAllCompaniesQuery } from '../../../redux/services/companiesApi';

import { CompaniesList, FilterMenu } from './components';
import { CompaniesPageContainer } from './styled-components/companies-page';
export default function CompaniesPage() {
  const [sortQueriesForRequest, setSortQueriesForRequest] = useState<{ pricing: string; category: string }>({
    pricing: 'pricing',
    category: 'all',
  });

  function handleSetQueries({ name, value }: { name: string; value: string }) {
    setSortQueriesForRequest({
      ...sortQueriesForRequest,
      [name]: value,
    });
  }

  const { data: companies, isLoading } = useGetAllCompaniesQuery(sortQueriesForRequest);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (!companies) {
    return <h1>Something went wrong!</h1>;
  }

  return (
    <CompaniesPageContainer className="section">
      <FilterMenu handleSetQueries={handleSetQueries} />
      <CompaniesList companies={companies} />
    </CompaniesPageContainer>
  );
}
