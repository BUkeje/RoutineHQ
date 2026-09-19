import { NavLink } from "react-router-dom";

function Navbar({ onNewClick }) {
  return (
    <nav className="navbar">
      <NavLink className="navbar-logo" to="/">
        Routine<span>HQ</span>
      </NavLink>

      <div className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/routines"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Routines
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Tasks
        </NavLink>
      </div>

      <button className="new-button" onClick={onNewClick}>
        <span className="new-button-plus">+</span>
        New
      </button>
    </nav>
  );
}

export default Navbar;
