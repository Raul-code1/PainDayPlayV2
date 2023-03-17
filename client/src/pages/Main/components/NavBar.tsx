import { GiHamburgerMenu } from 'react-icons/gi';
import { BiLogIn, BiLogOutCircle } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import { NavBarContainer } from '../styled-components';
import navLinks from '../utils/nav-links';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { userLogout } from '../../../redux/slices/user.slice';

export default function NavBar() {
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  function handleLogoutBtn() {
    dispatch(userLogout());
    toast.success('Session ended');
  }

  return (
    <NavBarContainer>
      <div className="logo">LOGO PAIN DAY PLAY</div>
      <div className="mobile-menu-btn">
        {/* //todo:show mobile menu */}
        <button>
          <GiHamburgerMenu />
        </button>
      </div>
      <div className="nav-links-desktop">
        {navLinks.map((link) => (
          <NavLink className={` links-general-style`} key={link.id} to={link.url}>
            {link.text}
          </NavLink>
        ))}
        {user.isAuthenticated && (
          <NavLink className="links-general-style" to="/profile">
            Perfil
          </NavLink>
        )}
        {user.isAuthenticated && user.role === 'admin' && (
          <NavLink className="links-general-style" to="/admin-dashboard">
            Admin dashboard
          </NavLink>
        )}
        {!user.isAuthenticated ? (
          <NavLink to="/auth" className="btn">
            Login <BiLogIn />
          </NavLink>
        ) : (
          <button onClick={handleLogoutBtn} className="btn">
            Logout <BiLogOutCircle />
          </button>
        )}
      </div>
    </NavBarContainer>
  );
}
