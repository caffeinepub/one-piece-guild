import { Sword } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="py-10 mt-16"
      style={{
        background: "#0B0B0D",
        borderTop: "1px solid #6A0F16",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sword className="w-5 h-5" style={{ color: "#D61F2D" }} />
          <span
            className="heading-gaming text-base"
            style={{
              color: "#FF2A3A",
              textShadow: "0 0 8px rgba(255,42,58,0.5)",
            }}
          >
            ONE PIECE
          </span>
        </div>
        <p
          className="text-sm mb-1"
          style={{ color: "#9AA0A6", fontFamily: "'Rajdhani', sans-serif" }}
        >
          DOMINATING THE BATTLEFIELD — GUILD UID: 3049611812
        </p>
        <p className="text-xs" style={{ color: "#6b7280" }}>
          © {year}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#9AA0A6" }}
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
