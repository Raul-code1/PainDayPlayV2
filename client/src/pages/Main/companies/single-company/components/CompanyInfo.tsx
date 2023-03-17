import { Company } from '../../../../../models/companies.types';

import { CompanyInfoContainer } from '../styled-components/company-info';
import { API_ROOT_URL } from '../../../../../redux/services/helpers';
import { priceFormatter } from '../../helpers/price-formatter';

type Props = {
  company: Company;
};

export default function CompanyInfo({ company }: Props) {
  const { imageUrl, name, pricing, location, description, phone, website } = company;

  const imageUrlHelper = `${API_ROOT_URL}${imageUrl}`;

  console.log(company);

  return (
    <CompanyInfoContainer>
      <div className="company-info-image-container">
        <img src={imageUrlHelper} alt={name} className="img" />
      </div>
      <div className="company-info-container-info">
        <h4>{name}</h4>
        <p>{location}</p>
        <p className="description">{description}</p>
        <h5>Precios</h5>
        <div className="pricing-grid">
          {pricing.map((plan) => {
            return (
              <div key={plan._id}>
                <span className="plan">{plan.plan}</span>
                <span className="price">{priceFormatter(plan.price)}</span>
              </div>
            );
          })}
        </div>
        <p className="phone">
          Contacto: &nbsp;<span>{phone}</span>{' '}
        </p>
        <p className="website">
          Pagina web: &nbsp;
          <a href={website} target="_blank" rel="noreferrer">
            {website}
          </a>
        </p>
      </div>
    </CompanyInfoContainer>
  );
}
