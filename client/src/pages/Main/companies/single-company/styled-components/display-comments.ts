import styled from 'styled-components';

export const DisplayCommentsContainer = styled.div`
  padding-top: 1.25rem;
  .comments-container {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  @media (min-width: 1000px) {
    .comments-container {
      width: 50%;
    }
  }
`;
