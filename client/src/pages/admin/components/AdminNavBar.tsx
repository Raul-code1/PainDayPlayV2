import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

import AdminNavLinks from '../utils/nav-admin-links';
import { AdminNavBarContainer } from '../styled-components/admin-nav-bar';

export default function AdminNavBar() {
  return (
    <AdminNavBarContainer>
      <Link className="links-general-style" to="/">
        Home <AiOutlineHome />
      </Link>
      {AdminNavLinks.map(({ id, text, url }) => (
        <Link className=" links-general-style" to={url} key={id}>
          {text}
        </Link>
      ))}
    </AdminNavBarContainer>
  );
}
