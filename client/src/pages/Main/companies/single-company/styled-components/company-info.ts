import styled from 'styled-components';
export const CompanyInfoContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-top: 0.9375rem;

  .company-info-image-container {
    overflow: hidden;
    border-radius: var(--radius);
  }

  .company-info-container-info {
    text-align: center;
    .description {
      padding-top: 0.625rem;

      color: var(--main);
    }

    .pricing-grid {
      display: grid;
      grid-row-gap: 10px;
      padding: 2rem 0rem;
      div {
        border: 1px solid var(--secondary);
        display: flex;
        flex-direction: column;
        width: 50%;
        margin: 0 auto;
        border-radius: var(--radius);
        .plan {
          font-weight: bold;
          color: var(--main);
        }

        .price {
          font-weight: bold;
          color: var(--tertiary);
        }
      }
    }

    .phone {
      color: var(--main);

      span {
        color: var(--tertiary);
      }
    }
    .website {
      color: var(--main);
      font-weight: bold;
      padding-bottom: 1.25rem;
      a {
        color: var(--highlight);
      }
    }
  }

  @media screen and (min-width: 767px) {
    padding-top: 0rem;
    .company-info-image-container {
      width: 50%;
      margin: 0 auto;
    }

    .company-info-container-info {
      h4,
      h5 {
        font-size: 1.875rem;
      }
      h5 {
        color: var(--type-of-green);
      }
      p {
        font-size: 18px;
      }
      .description {
        width: 50%;
        margin: 0 auto;
      }

      .pricing-grid {
        grid-template-columns: repeat(4, 1fr);
        width: 60%;
        margin: 0 auto;
        align-items: center;
      }
    }
  }
`;
