import styled from 'styled-components';

/* Mobile first */
/* Break points
    - mobile: 375px
    - tablet:  767px /1000px
    - desktop: 100px /  1200px


*/

export const NavBarContainer = styled.nav`
  padding: var(--general-padding);
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .nav-links-desktop {
    display: none;
  }

  .mobile-menu-btn button {
    background-color: transparent;
    color: var(--button-text);
    cursor: pointer;
    border: none;
    font-size: 20px;
  }

  @media (min-width: 1000px) {
    padding: 1.875rem 1.25rem;

    .mobile-menu-btn {
      display: none;
    }
    .nav-links-desktop {
      display: block;
      display: flex;
      width: 50%;
      justify-content: space-evenly;
      align-items: center;
      font-size: 18px;
      .btn {
        display: flex;
        padding: 0.5rem;
        align-items: center;
        gap: 5px;
        font-size: 16px;
        text-decoration: none;
      }
    }
  }
`;
