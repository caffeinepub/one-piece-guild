import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Sword, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "HOME" },
  { to: "/join", label: "JOIN" },
  { to: "/chat", label: "CHAT" },
  { to: "/announcements", label: "ANNOUNCEMENTS" },
  { to: "/leaderboard", label: "LEADERBOARD" },
  { to: "/tournament", label: "TOURNAMENT" },
  { to: "/complaints", label: "COMPLAINTS" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(11, 11, 13, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #6A0F16",
        boxShadow: "0 2px 20px rgba(214, 31, 45, 0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Sword className="w-5 h-5" style={{ color: "#D61F2D" }} />
            <span
              className="heading-gaming text-lg"
              style={{
                color: "#FF2A3A",
                textShadow: "0 0 10px #FF2A3A, 0 0 20px rgba(255,42,58,0.5)",
              }}
            >
              ONE PIECE
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${currentPath === link.to ? "active" : ""}`}
                style={{
                  color: currentPath === link.to ? "#F2F3F5" : "#9AA0A6",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/join"
              className="hidden sm:block btn-gaming text-xs px-4 py-2"
              data-ocid="nav.primary_button"
            >
              JOIN GUILD
            </Link>
            <button
              type="button"
              className="lg:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
              style={{ color: "#D61F2D" }}
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          className="lg:hidden"
          style={{ background: "#0F1012", borderTop: "1px solid #6A0F16" }}
        >
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 rounded-lg text-sm"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: currentPath === link.to ? "#FF2A3A" : "#9AA0A6",
                  background:
                    currentPath === link.to
                      ? "rgba(214,31,45,0.1)"
                      : "transparent",
                  borderLeft:
                    currentPath === link.to
                      ? "3px solid #D61F2D"
                      : "3px solid transparent",
                }}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
