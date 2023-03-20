/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react';

import AdminCompanyCard from './AdminCompanyCard';
import { Company } from '../../../../models/companies.types';
import { DisplayCompaniesContainer } from '../styled-components/display-companies';

type Props = {
  companies: Company[];
};

export default function DisplayCompanies({ companies }: Props) {
  const [inputValue, setInputValue] = useState<string>('');

  const filterCompanies = useMemo(() => {
    return companies.filter((company) => company.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()));
  }, [inputValue, companies]);

  return (
    <DisplayCompaniesContainer>
      <form>
        <input
          placeholder="Busca cualquier instalacion"
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
      </form>
      {filterCompanies.length === 0 && <h3>No items found</h3>}
      <div className="grid-companies-cards">
        {filterCompanies.map((company) => (
          <AdminCompanyCard key={company._id} company={company} />
        ))}
      </div>
    </DisplayCompaniesContainer>
  );
}
