import { Link } from "react-router-dom";
import { useRef } from "react";

function Navbar() {

  const navRef = useRef(null);

  const closeNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.remove("show");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow sticky-top"
      style={{ zIndex: 1050 }}
    >
      <div className="container">

        {/* BRAND */}
        <Link className="navbar-brand fw-bold" to="/" onClick={closeNavbar}>
          Pathway Modeling Studio
        </Link>

        {/* TOGGLE BUTTON */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          ref={navRef}
        >
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeNavbar}>Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/gallery" onClick={closeNavbar}>Gallery</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/become-model" onClick={closeNavbar}>Become Model</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={closeNavbar}>Contact</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/application-status" onClick={closeNavbar}>
                Application Status
              </Link>
            </li>

            <li className="nav-item ms-lg-3">
              <Link className="nav-link" to="/login" onClick={closeNavbar}>Login</Link>
            </li>

            <li className="nav-item ms-lg-2">
              <Link
                to="/get-started"
                className="btn btn-danger rounded-pill px-4"
                onClick={closeNavbar}
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