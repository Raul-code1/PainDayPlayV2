import styled from 'styled-components';

/* Break points

  tablet:767px


*/

export const FilterMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0.625rem 0rem;

  @media (min-width: 767px) {
    flex-direction: row;
    justify-content: space-between;
    .select-category-container,
    .select-pricing-container {
      width: 50%;
    }
  }
`;
