import { Link } from "react-router-dom";

function Navbar({ onNewClick }) {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">RoutineHQ</h1>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/routines">Routines</Link>
        <Link to="/tasks">Tasks</Link>

        <button className="new-button" onClick={onNewClick}>
          + New
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
