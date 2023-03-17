import styled from 'styled-components';

export const CompanyListContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1.25rem;

  @media screen and (min-width: 767px) {
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 30px;
    padding: 0rem 0.625rem;
  }
  @media screen and (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
