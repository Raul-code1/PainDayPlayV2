import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <h3>Home page</h3>
      <br />
      <p>Home page</p>
      <button className="btn">Hello</button>
      <Link to="/auth">Auth</Link>
    </>
  );
}
