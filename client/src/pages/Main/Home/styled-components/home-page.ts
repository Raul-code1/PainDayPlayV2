import styled from 'styled-components';
export const HomePageContainer = styled.section`
  min-height: 100vh;

  header {
    height: 70vh;
    background-color: beige;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    div {
      display: flex;
    }
  }

  @media (min-width: 767px) {
    height: 80vh;
    h1 {
      font-size: 2.125rem;
    }
  }
`;
