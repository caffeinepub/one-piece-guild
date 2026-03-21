import { Crown, Medal, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useLeaderboard } from "../hooks/useQueries";

const RankBadge = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Crown className="w-5 h-5 rank-gold" />;
  if (rank === 2) return <Medal className="w-5 h-5 rank-silver" />;
  if (rank === 3) return <Medal className="w-5 h-5 rank-bronze" />;
  return (
    <span
      className="heading-gaming text-sm"
      style={{
        color: "#9AA0A6",
        width: "20px",
        display: "inline-block",
        textAlign: "center",
      }}
    >
      #{rank}
    </span>
  );
};

export default function LeaderboardPage() {
  const { data: players = [], isLoading } = useLeaderboard();

  const samplePlayers = [
    {
      username: "ZORO_SLAYER",
      userId: "4523891",
      gameLevel: BigInt(98),
      registeredAt: BigInt(0),
    },
    {
      username: "LUFFY_GOD",
      userId: "3049611812",
      gameLevel: BigInt(95),
      registeredAt: BigInt(0),
    },
    {
      username: "NAMI_STORM",
      userId: "7823401",
      gameLevel: BigInt(91),
      registeredAt: BigInt(0),
    },
    {
      username: "SANJI_KICK",
      userId: "5892341",
      gameLevel: BigInt(88),
      registeredAt: BigInt(0),
    },
    {
      username: "USOPP_SNIPER",
      userId: "2934821",
      gameLevel: BigInt(82),
      registeredAt: BigInt(0),
    },
    {
      username: "ROBIN_DEVIL",
      userId: "1928374",
      gameLevel: BigInt(79),
      registeredAt: BigInt(0),
    },
  ];

  const displayPlayers = players.length > 0 ? players : samplePlayers;

  return (
    <div className="min-h-screen pt-20 pb-16" style={{ background: "#0B0B0D" }}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8 text-center"
        >
          <Trophy
            className="w-12 h-12 mx-auto mb-3"
            style={{
              color: "#FFD700",
              filter: "drop-shadow(0 0 10px rgba(255,215,0,0.5))",
            }}
          />
          <h1
            className="heading-gaming text-3xl"
            style={{
              color: "#F2F3F5",
              textShadow: "0 0 15px rgba(255,42,58,0.3)",
            }}
          >
            LEADERBOARD
          </h1>
          <p
            className="text-sm mt-2"
            style={{ color: "#9AA0A6", fontFamily: "'Rajdhani', sans-serif" }}
          >
            ONE PIECE Guild Rankings — Sorted by Game Level
          </p>
        </motion.div>

        {/* Top 3 podium */}
        {displayPlayers.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            {/* 2nd place */}
            <div className="card-gaming p-4 text-center mt-8">
              <Medal className="w-8 h-8 mx-auto mb-2 rank-silver" />
              <p
                className="heading-gaming text-xs"
                style={{ color: "#C0C0C0" }}
              >
                2ND PLACE
              </p>
              <p
                className="font-bold mt-1 text-sm"
                style={{
                  color: "#F2F3F5",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.7rem",
                }}
              >
                {displayPlayers[1].username}
              </p>
              <p className="heading-gaming text-lg rank-silver">
                {String(displayPlayers[1].gameLevel)}
              </p>
              <p className="text-xs" style={{ color: "#9AA0A6" }}>
                LVL
              </p>
            </div>
            {/* 1st place */}
            <div
              className="card-gaming p-4 text-center"
              style={{
                borderColor: "#FFD700",
                boxShadow: "0 0 20px rgba(255,215,0,0.3)",
              }}
            >
              <Crown className="w-10 h-10 mx-auto mb-2 rank-gold" />
              <p
                className="heading-gaming text-xs"
                style={{ color: "#FFD700" }}
              >
                1ST PLACE
              </p>
              <p
                className="font-bold mt-1"
                style={{
                  color: "#F2F3F5",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.7rem",
                }}
              >
                {displayPlayers[0].username}
              </p>
              <p className="heading-gaming text-2xl rank-gold">
                {String(displayPlayers[0].gameLevel)}
              </p>
              <p className="text-xs" style={{ color: "#9AA0A6" }}>
                LVL
              </p>
            </div>
            {/* 3rd place */}
            <div className="card-gaming p-4 text-center mt-8">
              <Medal className="w-8 h-8 mx-auto mb-2 rank-bronze" />
              <p
                className="heading-gaming text-xs"
                style={{ color: "#CD7F32" }}
              >
                3RD PLACE
              </p>
              <p
                className="font-bold mt-1 text-sm"
                style={{
                  color: "#F2F3F5",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.7rem",
                }}
              >
                {displayPlayers[2].username}
              </p>
              <p className="heading-gaming text-lg rank-bronze">
                {String(displayPlayers[2].gameLevel)}
              </p>
              <p className="text-xs" style={{ color: "#9AA0A6" }}>
                LVL
              </p>
            </div>
          </motion.div>
        )}

        {/* Full table */}
        {isLoading ? (
          <div
            className="flex justify-center py-16"
            data-ocid="leaderboard.loading_state"
          >
            <p
              style={{
                color: "#9AA0A6",
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "0.7rem",
              }}
            >
              LOADING RANKINGS...
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="card-gaming overflow-hidden"
            data-ocid="leaderboard.table"
          >
            <div
              className="px-6 py-4"
              style={{ borderBottom: "1px solid #6A0F16" }}
            >
              <div className="grid grid-cols-12 gap-2">
                <div
                  className="col-span-1 heading-gaming text-xs"
                  style={{ color: "#9AA0A6" }}
                >
                  RANK
                </div>
                <div
                  className="col-span-5 heading-gaming text-xs"
                  style={{ color: "#9AA0A6" }}
                >
                  PLAYER
                </div>
                <div
                  className="col-span-4 heading-gaming text-xs"
                  style={{ color: "#9AA0A6" }}
                >
                  UID
                </div>
                <div
                  className="col-span-2 heading-gaming text-xs text-right"
                  style={{ color: "#9AA0A6" }}
                >
                  LEVEL
                </div>
              </div>
            </div>
            <div>
              {displayPlayers.map((player, i) => (
                <motion.div
                  key={player.userId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ backgroundColor: "rgba(214,31,45,0.05)" }}
                  className="px-6 py-4 grid grid-cols-12 gap-2 items-center cursor-default"
                  style={{
                    borderBottom: "1px solid rgba(106,15,22,0.4)",
                    background:
                      i < 3
                        ? `rgba(${i === 0 ? "255,215,0" : i === 1 ? "192,192,192" : "205,127,50"},0.04)`
                        : "transparent",
                  }}
                  data-ocid={`leaderboard.row.${i + 1}`}
                >
                  <div className="col-span-1 flex justify-center">
                    <RankBadge rank={i + 1} />
                  </div>
                  <div className="col-span-5">
                    <p
                      className="text-sm font-bold"
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "0.7rem",
                        color:
                          i === 0
                            ? "#FFD700"
                            : i === 1
                              ? "#C0C0C0"
                              : i === 2
                                ? "#CD7F32"
                                : "#F2F3F5",
                      }}
                    >
                      {player.username}
                    </p>
                  </div>
                  <div className="col-span-4">
                    <p
                      className="text-xs"
                      style={{
                        color: "#9AA0A6",
                        fontFamily: "'Rajdhani', sans-serif",
                      }}
                    >
                      {player.userId}
                    </p>
                  </div>
                  <div className="col-span-2 text-right">
                    <span
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        background: "rgba(214,31,45,0.2)",
                        color: "#FF2A3A",
                        fontFamily: "'Orbitron', sans-serif",
                      }}
                    >
                      {String(player.gameLevel)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {displayPlayers.length === 0 && !isLoading && (
          <div
            className="card-gaming p-12 text-center"
            data-ocid="leaderboard.empty_state"
          >
            <Trophy
              className="w-12 h-12 mx-auto mb-3"
              style={{ color: "#6b7280" }}
            />
            <p
              style={{
                color: "#9AA0A6",
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "0.7rem",
              }}
            >
              NO PLAYERS REGISTERED YET
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
