import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <header className="app-header">
      <h1>AI Pulse</h1>
      <p className="tagline">What's happening across AI, right now</p>

      <div className="tabs">
        <Link
          to="/"
          className={location.pathname === "/" ? "tab active" : "tab"}
        >
          News
        </Link>
        <Link
          to="/research"
          className={location.pathname === "/research" ? "tab active" : "tab"}
        >
          Research
        </Link>
      </div>
    </header>
  );
}

export default Header;