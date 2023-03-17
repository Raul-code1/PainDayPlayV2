import { Link } from 'react-router-dom';

import { Company } from '../../../../models/companies.types';
import { priceFormatter } from '../helpers/price-formatter';
import { CompanyCardContainer } from '../styled-components/company-card';
import { API_ROOT_URL } from '../../../../redux/services/helpers';

type Props = {
  company: Company;
};

export default function CompanyCard({ company }: Props) {
  const { _id, name, imageUrl, pricing, category } = company;

  const imageUrlHelper = `${API_ROOT_URL}${imageUrl}`;

  return (
    <CompanyCardContainer>
      <div className="img-container">
        <img className="img" src={imageUrlHelper} alt={name} />
      </div>
      <div className="info-card-container">
        <h4>{name}</h4>
        <p className="category">
          Categoria: <span>{category}</span>
        </p>
        <p>
          Planes desde: <span className="price">{priceFormatter(pricing[0].price)}</span>
        </p>
        <Link className="links-general-style link-info" to={`/company/${_id}`}>
          Mas detalles...
        </Link>
      </div>
    </CompanyCardContainer>
  );
}
