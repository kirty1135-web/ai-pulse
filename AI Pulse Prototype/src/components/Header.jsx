import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

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
        <Link to="/bookmarks" className={location.pathname=== "/bookmarks" ? "tab active" : "tab"}>Bookmarks</Link>
        <button onClick={toggleTheme} aria-label="Toggle dark mode">
        {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}

export default Header;