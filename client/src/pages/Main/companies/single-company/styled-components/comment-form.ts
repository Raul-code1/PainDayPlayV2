import styled from 'styled-components';

export const CommentFormContainer = styled.div`
  padding-top: 15px;
  .response-msg {
    text-align: center;
    font-size: 24px;
    margin: 0 auto;
  }
  form {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    textarea {
      width: 70%;
      resize: none;
      height: 150px;
      border-radius: var(--radius);
      background-color: #f8f8f8;
      padding: 0.625rem;
    }

    .btn {
      padding: 10px 20px;
      width: 30%;
    }

    .link {
      font-weight: bold;
      font-size: 1.125rem;
      color: var(--highlight);
      transition: var(--transition);
    }

    .link:hover {
      color: var(--main);
    }
  }

  @media (min-width: 1000px) {
    form {
      width: 40%;
    }
  }
`;
