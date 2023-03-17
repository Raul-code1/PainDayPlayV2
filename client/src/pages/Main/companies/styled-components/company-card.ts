import styled from 'styled-components';
export const CompanyCardContainer = styled.div`
  border-radius: var(--radius);
  min-height: 200px;
  overflow: hidden;
  border: 1px solid var(--secondary);
  .img-container {
    height: 60%;
    overflow: hidden;
  }

  .info-card-container {
    height: 40%;
    padding: 0.9375rem 0.625rem;
    p {
      color: var(--main);
    }
    .link-info {
      color: var(--highlight);
      text-decoration: underline;
    }
    h4 {
      letter-spacing: 1px;
      font-weight: 600;
    }
    .price {
      color: var(--tertiary);
    }
    .category {
      text-transform: capitalize;
      span {
        color: var(--type-of-green);
      }
    }
  }
`;
