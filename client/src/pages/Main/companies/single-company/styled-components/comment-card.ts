import styled from 'styled-components';

export const CommentCardContainer = styled.div`
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

  .delete-comment-btn {
    font-size: 20px;
    margin-top: 10px;
    background: none;
    border: none;
    transition: var(--transition);
    color: red;
    cursor: pointer;
  }

  .delete-comment-btn:hover {
    color: var(--highlight);
  }
  .update-comment-btn {
    font-size: 20px;
    margin-top: 10px;
    margin-left: 10px;
    background: none;
    border: none;
    transition: var(--transition);
    color: var(--main);
    cursor: pointer;
  }
  .update-comment-btn:hover {
    color: var(--highlight);
  }

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.9375rem;
    .edit-comment-textarea {
      width: 100%;
      margin: 0 auto;
      resize: none;
      height: 150px;
      border-radius: var(--radius);
      background-color: #f8f8f8;
      padding: 0.625rem;
    }
    .btn {
      padding: 10px;
      margin-left: 10px;
    }

    .btn-close {
      background-color: red;
    }
  }
`;
