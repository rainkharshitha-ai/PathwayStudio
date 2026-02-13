import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow sticky-top"
      style={{ zIndex: 1050 }}   // ✅ keeps navbar above hero
    >
      <div className="container">

        {/* BRAND */}
        <Link className="navbar-brand fw-bold" to="/">
          Pathway Modeling Studio
        </Link>

        {/* TOGGLE BUTTON (MOBILE) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          data-bs-auto-close="false"
        >
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/gallery">Gallery</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/become-model">Become Model</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

            <li className="nav-item ms-lg-3">
              <Link className="nav-link" to="/login">Login</Link>
            </li>

            <li className="nav-item ms-lg-2">
              <Link
                to="/get-started"
                className="btn btn-danger rounded-pill px-4"
              >
                Get Started →
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
