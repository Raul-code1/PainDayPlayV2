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

    .comment-card {
      width: 80%;
      padding: 0.9375rem;
      border-radius: var(--radius);
      border: 1px solid var(--secondary);

      .username-and-date {
        display: flex;
        justify-content: space-between;
        .username {
          text-transform: capitalize;
          font-weight: bold;
          color: var(--type-of-green);
        }
        .date {
          font-weight: bold;
          color: var(--tertiary);
        }
      }

      .comment-text {
        font-weight: 600;
        color: var(--main);
      }
    }
  }

  @media (min-width: 1000px) {
    .comments-container {
      width: 50%;
    }
  }
`;
