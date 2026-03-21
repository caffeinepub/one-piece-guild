import { Link } from "@tanstack/react-router";
import { Shield, Trophy, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import ParticleField from "../components/ParticleField";
import { useChatMessages, useLeaderboard } from "../hooks/useQueries";

export default function HomePage() {
  const { data: leaderboard } = useLeaderboard();
  const { data: chatMessages } = useChatMessages();

  const topPlayers = leaderboard?.slice(0, 5) ?? [];
  const recentMessages = chatMessages?.slice(-4) ?? [];

  return (
    <div style={{ background: "#0B0B0D" }}>
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden hero-bg">
        <ParticleField count={50} />
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-xs tracking-[0.3em] mb-4"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: "#D61F2D",
                textShadow: "0 0 8px rgba(214,31,45,0.6)",
              }}
            >
              FREE FIRE GUILD \u2022 UID: 3049611812
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="heading-gaming animate-text-pulse"
            style={{
              fontSize: "clamp(3rem, 10vw, 7rem)",
              lineHeight: 1,
              color: "#F2F3F5",
              letterSpacing: "0.05em",
            }}
          >
            <span
              style={{
                color: "#FF2A3A",
                textShadow: "0 0 20px #FF2A3A, 0 0 40px rgba(255,42,58,0.5)",
              }}
            >
              ONE
            </span>{" "}
            <span>PIECE</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="heading-gaming mt-2 mb-6"
            style={{
              fontSize: "clamp(0.9rem, 3vw, 1.4rem)",
              color: "#9AA0A6",
              letterSpacing: "0.3em",
            }}
          >
            DOMINATING THE BATTLEFIELD
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base mb-8 max-w-lg mx-auto"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              color: "#B0B6BD",
              fontSize: "1.1rem",
            }}
          >
            Join the strongest crew. Conquer every battlefield.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/join"
              className="btn-gaming text-base"
              data-ocid="home.primary_button"
            >
              JOIN NOW
            </Link>
            <Link
              to="/leaderboard"
              className="btn-gaming text-base"
              data-ocid="home.secondary_button"
              style={{
                background: "transparent",
                border: "1px solid #6A0F16",
                boxShadow: "none",
              }}
            >
              VIEW LEADERBOARD
            </Link>
          </motion.div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: "linear-gradient(to bottom, transparent, #0B0B0D)",
          }}
        />
      </section>

      {/* Stats bar */}
      <section
        className="py-8"
        style={{
          background: "#0F1012",
          borderTop: "1px solid #6A0F16",
          borderBottom: "1px solid #6A0F16",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                label: "GUILD MEMBERS",
                value: leaderboard?.length ?? "\u2014",
              },
              { icon: Trophy, label: "TOURNAMENTS WON", value: "12" },
              { icon: Shield, label: "GUILD LEVEL", value: "98" },
              { icon: Zap, label: "WIN RATE", value: "87%" },
            ].map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <Icon
                  className="w-6 h-6 mx-auto mb-2"
                  style={{ color: "#D61F2D" }}
                />
                <p
                  className="heading-gaming text-2xl"
                  style={{
                    color: "#FF2A3A",
                    textShadow: "0 0 8px rgba(255,42,58,0.5)",
                  }}
                >
                  {String(value)}
                </p>
                <p
                  className="text-xs tracking-widest mt-1"
                  style={{
                    color: "#9AA0A6",
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-column feature section */}
      <section className="py-16 gaming-grid-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Leaderboard card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-gaming p-6"
              data-ocid="home.card"
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5" style={{ color: "#D61F2D" }} />
                <h3
                  className="heading-gaming text-sm"
                  style={{ color: "#F2F3F5" }}
                >
                  TOP PLAYERS
                </h3>
              </div>
              {topPlayers.length === 0 ? (
                <p className="text-sm" style={{ color: "#9AA0A6" }}>
                  No players yet. Be the first!
                </p>
              ) : (
                <div className="space-y-3">
                  {topPlayers.map((p, i) => (
                    <div
                      key={p.userId}
                      className="flex items-center justify-between"
                      data-ocid={`home.item.${i + 1}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`heading-gaming text-sm w-6 text-center ${i === 0 ? "rank-gold" : i === 1 ? "rank-silver" : i === 2 ? "rank-bronze" : ""}`}
                          style={{ color: i > 2 ? "#9AA0A6" : undefined }}
                        >
                          #{i + 1}
                        </span>
                        <span
                          className="text-sm"
                          style={{
                            color: "#F2F3F5",
                            fontFamily: "'Rajdhani', sans-serif",
                          }}
                        >
                          {p.username}
                        </span>
                      </div>
                      <span
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          background: "rgba(214,31,45,0.2)",
                          color: "#FF2A3A",
                          fontFamily: "'Orbitron', sans-serif",
                        }}
                      >
                        LVL {String(p.gameLevel)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <Link
                to="/leaderboard"
                className="block mt-4 text-xs text-center py-2 rounded"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#D61F2D",
                  border: "1px solid #6A0F16",
                  letterSpacing: "0.1em",
                }}
                data-ocid="home.link"
              >
                FULL LEADERBOARD \u2192
              </Link>
            </motion.div>

            {/* Chat preview card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-gaming p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5" style={{ color: "#D61F2D" }} />
                <h3
                  className="heading-gaming text-sm"
                  style={{ color: "#F2F3F5" }}
                >
                  GUILD CHAT
                </h3>
              </div>
              <div className="space-y-3 min-h-[120px]">
                {recentMessages.length === 0 ? (
                  <p className="text-sm" style={{ color: "#9AA0A6" }}>
                    No messages yet. Start chatting!
                  </p>
                ) : (
                  recentMessages.map((msg, i) => (
                    <div
                      key={`${msg.sender}-${i}`}
                      className="text-sm"
                      style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                      <span style={{ color: "#FF2A3A", fontWeight: 700 }}>
                        {msg.sender}:{" "}
                      </span>
                      <span style={{ color: "#B0B6BD" }}>{msg.content}</span>
                    </div>
                  ))
                )}
              </div>
              <Link
                to="/chat"
                className="block mt-4 text-xs text-center py-2 rounded"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#D61F2D",
                  border: "1px solid #6A0F16",
                  letterSpacing: "0.1em",
                }}
                data-ocid="home.secondary_button"
              >
                OPEN CHAT \u2192
              </Link>
            </motion.div>

            {/* Tournament promo card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-gaming p-6 relative overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(214,31,45,0.2) 0%, transparent 70%)",
                }}
              />
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5" style={{ color: "#D61F2D" }} />
                <h3
                  className="heading-gaming text-sm"
                  style={{ color: "#F2F3F5" }}
                >
                  TOURNAMENT
                </h3>
              </div>
              <div
                className="text-center py-4 mb-4 rounded-lg"
                style={{
                  background: "rgba(214,31,45,0.1)",
                  border: "1px solid #6A0F16",
                }}
              >
                <p
                  className="heading-gaming text-xl"
                  style={{ color: "#FF2A3A" }}
                >
                  BATTLE ROYALE
                </p>
                <p
                  className="text-sm mt-1"
                  style={{
                    color: "#9AA0A6",
                    fontFamily: "'Rajdhani', sans-serif",
                  }}
                >
                  April 15, 2026
                </p>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <div>
                  <p
                    style={{
                      color: "#9AA0A6",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "0.75rem",
                    }}
                  >
                    ENTRY FEE
                  </p>
                  <p className="heading-gaming" style={{ color: "#F2F3F5" }}>
                    \u20b950
                  </p>
                </div>
                <div className="text-right">
                  <p
                    style={{
                      color: "#9AA0A6",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "0.75rem",
                    }}
                  >
                    PRIZE POOL
                  </p>
                  <p className="heading-gaming" style={{ color: "#FFD700" }}>
                    \u20b9500
                  </p>
                </div>
              </div>
              <Link
                to="/tournament"
                className="btn-gaming block text-center text-xs"
                data-ocid="home.button"
              >
                REGISTER NOW
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
