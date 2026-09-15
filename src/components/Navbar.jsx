function Navbar({ onNewClick }) {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">RoutineHQ</h1>

      <div className="navbar-links">
        <a href="">Home</a>
        <a href="">Routines</a>
        <a href="">Tasks</a>

        <button
          className="new-button"
          onClick={onNewClick}
        >
          + New
        </button>
      </div>
    </nav>
  );
}

export default Navbar;