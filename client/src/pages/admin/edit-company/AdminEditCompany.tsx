import { useParams } from 'react-router-dom';

import { useGetSingleCompanyQuery } from '../../../redux/services/companiesApi';
import AddAndEditForm, { CompanyInfo } from '../components/AddAndEditForm';

export default function AdminEditCompany() {
  const { companyIdEdit } = useParams();

  const { data: companyResponse, isLoading } = useGetSingleCompanyQuery(companyIdEdit as string);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!companyResponse) {
    return <h1>Something went wrong..</h1>;
  }

  const {
    company: { _id, name, category, description, location, pricing, phone, website, imageUrl },
  } = companyResponse;

  const handleFormState: CompanyInfo = {
    name,
    category,
    description,
    location,
    pricing,
    phone,
    website,
    imageUrl,
  };

  return (
    <div>
      <AddAndEditForm companyId={_id} isEditing company={handleFormState} />
    </div>
  );
}
