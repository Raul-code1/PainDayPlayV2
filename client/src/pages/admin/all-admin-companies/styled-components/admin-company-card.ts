import styled from 'styled-components';
export const AdminCompanyCardContainer = styled.div`
  background-color: var(--main);
  border: 1px solid var(--secondary);
  padding: 10px;
  border-radius: var(--radius);
  h5 {
    color: var(--type-of-green);
    span {
      color: var(--background);
      font-weight: bold;
      font-size: 1rem;
    }
  }
  .admin-company-btns {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    button {
      cursor: pointer;
      background: red;
      border: none;
      padding: 5px;
      border-radius: var(--radius);
      color: var(--main);
      font-weight: bold;
    }
  }
`;
