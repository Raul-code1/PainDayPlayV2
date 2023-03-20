import styled from 'styled-components';
export const DisplayCompaniesContainer = styled.div`
  form {
    display: flex;
    justify-content: center;
    padding: 1.25rem;
    input {
      background-color: #f8f8f8;
      border: none;
      padding: 0.3125rem 1.25rem;
      color: black;
      outline: none;
      border-radius: 3px;
    }
  }

  .grid-companies-cards {
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-row-gap: 20px;
  }

  @media (min-width: 1000px) {
    .grid-companies-cards {
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 20px;
    }
  }
`;
