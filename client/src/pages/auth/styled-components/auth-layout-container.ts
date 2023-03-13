import styled from 'styled-components';

export const AuthLayoutContainer = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .child {
    height: 90%;
    h2 {
      font-size: 1.875rem;
    }
    h2,
    p {
      text-align: center;
    }

    form {
      height: 60%;
      display: flex;
      flex-direction: column;
      padding-top: 0.625rem;
      gap: 0.9375rem;
      label {
        font-size: 20px;
        text-transform: capitalize;
      }
      input {
        width: 100%;
        border: none;
        outline: none;
        border-bottom: 1px solid var(--secondary);
      }
      .input-error {
        outline: red;
        border-bottom: 3px solid var(--tertiary);
      }
      .input-error::placeholder {
        color: var(--tertiary);
      }

      .btn {
        padding: 10px;
        width: 70%;
        margin: 0 auto;
      }
    }
    .login-form {
      justify-content: space-evenly;
    }
    .link-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      padding-top: 3.125rem;
      .link {
        color: var(--tertiary);
      }
      .back-home-link {
        color: var(--type-of-green);
        margin-top: 5px;
      }
    }
  }

  @media (min-width: 767px) {
    .child {
      width: 50%;
      height: 70%;
      h2 {
        font-size: 2.5rem;
      }
      p {
        font-size: 1.25rem;
      }
    }
  }

  @media (min-width: 1200px) {
    .child {
      width: 30%;
      height: 80%;
      form {
        width: 80%;
        margin: 0 auto;
      }
    }
  }
`;
