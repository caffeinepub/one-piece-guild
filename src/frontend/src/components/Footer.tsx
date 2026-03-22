import { Shield } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="py-10 mt-16"
      style={{ background: "#06060E", borderTop: "1px solid #2D1B69" }}
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Shield className="w-5 h-5" style={{ color: "#7C3AED" }} />
          <span
            className="heading-gaming text-base"
            style={{
              color: "#A78BFA",
              textShadow: "0 0 8px rgba(139,92,246,0.5)",
            }}
          >
            ONE PIECE
          </span>
        </div>
        <p
          className="text-sm mb-1"
          style={{ color: "#8080A0", fontFamily: "'Rajdhani', sans-serif" }}
        >
          WAKANDA FOREVER — GUILD UID: 3049611812
        </p>
        <p className="text-xs" style={{ color: "#5A5A78" }}>
          © {year}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#8080A0" }}
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
