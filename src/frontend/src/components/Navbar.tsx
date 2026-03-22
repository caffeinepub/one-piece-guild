import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Shield, X } from "lucide-react";
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
        background: "rgba(6, 6, 14, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #2D1B69",
        boxShadow: "0 2px 24px rgba(124, 58, 237, 0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-5 h-5" style={{ color: "#7C3AED" }} />
            <span
              className="heading-gaming text-lg"
              style={{
                color: "#A78BFA",
                textShadow: "0 0 10px #8B5CF6, 0 0 20px rgba(139,92,246,0.4)",
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
                  color: currentPath === link.to ? "#F0EEF8" : "#8080A0",
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
              style={{ color: "#7C3AED" }}
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
          style={{ background: "#0A0A16", borderTop: "1px solid #2D1B69" }}
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
                  color: currentPath === link.to ? "#A78BFA" : "#8080A0",
                  background:
                    currentPath === link.to
                      ? "rgba(124,58,237,0.12)"
                      : "transparent",
                  borderLeft:
                    currentPath === link.to
                      ? "3px solid #7C3AED"
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
