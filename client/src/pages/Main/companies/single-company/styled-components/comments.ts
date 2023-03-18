import styled from 'styled-components';

export const CommentsContainer = styled.section`
  padding-top: 1.25rem;
  border-top: 1px solid var(--secondary);
  h4 {
    text-align: center;
    color: var(--type-of-green);
    font-size: 1.1875rem;
    padding-top: 1.25rem;
  }

  @media (min-width: 800px) {
    h4 {
      font-size: 1.4375rem;
    }
  }
`;
