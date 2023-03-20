import { Company } from '../../../../models/companies.types';
import { AdminCompanyCardContainer } from '../styled-components/admin-company-card';
import { Link } from 'react-router-dom';
import { useDeleteAdminCompanyMutation } from '../../../../redux/services/companiesApi';
import { toast } from 'react-toastify';

type Props = {
  company: Company;
};

export default function AdminCompanyCard({ company }: Props) {
  const [deleteAdminCompany, { data }] = useDeleteAdminCompanyMutation();

  function handleDeleteComapanyRequest(id: string) {
    deleteAdminCompany({ id });
    toast.success(data?.msg);
  }

  return (
    <AdminCompanyCardContainer>
      <h5>
        Nombre: <span> {company.name}</span>
      </h5>

      <div className="admin-company-btns">
        <button onClick={() => handleDeleteComapanyRequest(company._id)}>Borrar</button>
        <Link to={`/admin-dashboard/edit-company/${company._id}`}>Editar</Link>
      </div>
    </AdminCompanyCardContainer>
  );
}
