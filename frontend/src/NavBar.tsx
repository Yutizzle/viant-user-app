import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <div className="navbar-container">
      <span>User</span>
      <nav className="navbar-links">
        <Link to="/">List</Link>
        <Link to="/add">Add</Link>
        <Link to="/edit">Edit</Link>
      </nav>
    </div>
  );
};
