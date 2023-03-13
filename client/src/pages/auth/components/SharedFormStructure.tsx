import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

type Props = {
  title: string;
  path: string;
  linkText: string;
  children: React.ReactNode;
};

export default function SharedFormStructure({ children, title, path, linkText }: Props) {
  return (
    <div className="child section ">
      <div>
        <h2>{title}</h2>
        <p>Start interacting with the community</p>
      </div>
      {/* Children are the forms of login/register  */}
      {children}
      <div className="link-container">
        <Link className="link" to={path}>
          {linkText}
        </Link>
        <Link className="link back-home-link" to={'/'}>
          Back home <AiOutlineHome />
        </Link>
      </div>
    </div>
  );
}
