import { Calendar, IndianRupee, Loader2, Shield, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useRegisterTournament } from "../hooks/useQueries";

export default function TournamentPage() {
  const [playerName, setPlayerName] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [gameLevel, setGameLevel] = useState("");
  const [paymentNote, setPaymentNote] = useState("");
  const { mutateAsync, isPending } = useRegisterTournament();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName || !playerId || !gameLevel || !paymentNote) {
      toast.error("Please fill all fields.");
      return;
    }
    try {
      await mutateAsync({
        playerId,
        gameLevel: BigInt(gameLevel),
        playerName,
        paymentNote,
      });
      toast.success(
        "Tournament registration submitted! Await confirmation after payment verification.",
      );
      setPlayerName("");
      setPlayerId("");
      setGameLevel("");
      setPaymentNote("");
    } catch {
      toast.error("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16" style={{ background: "#0B0B0D" }}>
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden mb-8 py-16"
          style={{
            background:
              "linear-gradient(135deg, #0F0609 0%, #1a0308 50%, #0F0609 100%)",
            border: "1px solid #6A0F16",
            boxShadow: "0 0 40px rgba(214,31,45,0.2)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(214,31,45,0.15) 0%, transparent 70%)",
            }}
          />
          <div className="relative text-center px-4">
            <Trophy
              className="w-12 h-12 mx-auto mb-4"
              style={{
                color: "#FFD700",
                filter: "drop-shadow(0 0 10px rgba(255,215,0,0.5))",
              }}
            />
            <h1
              className="heading-gaming"
              style={{
                fontSize: "clamp(1.8rem, 5vw, 3rem)",
                color: "#F2F3F5",
                textShadow: "0 0 20px rgba(255,42,58,0.4)",
              }}
            >
              BATTLE ROYALE
            </h1>
            <p
              className="heading-gaming mt-1"
              style={{
                fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
                color: "#D61F2D",
                letterSpacing: "0.2em",
              }}
            >
              TOURNAMENT
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: Calendar,
              label: "DATE",
              value: "APRIL 15, 2026",
              color: "#9AA0A6",
            },
            {
              icon: IndianRupee,
              label: "ENTRY FEE",
              value: "\u20b950",
              color: "#FF2A3A",
            },
            {
              icon: Trophy,
              label: "PRIZE POOL",
              value: "\u20b9500",
              color: "#FFD700",
            },
          ].map(({ icon: Icon, label, value, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="card-gaming p-6 text-center"
            >
              <Icon
                className="w-8 h-8 mx-auto mb-2"
                style={{ color: "#D61F2D" }}
              />
              <p
                className="text-xs tracking-widest mb-1"
                style={{
                  color: "#9AA0A6",
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                {label}
              </p>
              <p className="heading-gaming text-2xl" style={{ color }}>
                {value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-gaming p-6"
          >
            <h2
              className="heading-gaming text-sm mb-4"
              style={{ color: "#F2F3F5" }}
            >
              PRIZE BREAKDOWN
            </h2>
            <div className="space-y-3">
              {[
                { place: "1ST PLACE", prize: "\u20b9300", color: "#FFD700" },
                { place: "2ND PLACE", prize: "\u20b9150", color: "#C0C0C0" },
                { place: "3RD PLACE", prize: "\u20b950", color: "#CD7F32" },
              ].map(({ place, prize, color }) => (
                <div
                  key={place}
                  className="flex justify-between items-center py-2"
                  style={{ borderBottom: "1px solid #6A0F16" }}
                >
                  <span
                    className="heading-gaming text-xs"
                    style={{ color: "#9AA0A6" }}
                  >
                    {place}
                  </span>
                  <span className="heading-gaming text-lg" style={{ color }}>
                    {prize}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-gaming p-6 flex items-center justify-center"
          >
            <div className="flex items-center gap-4">
              <div className="text-center">
                <Shield
                  className="w-16 h-16"
                  style={{
                    color: "#D61F2D",
                    filter: "drop-shadow(0 0 10px rgba(214,31,45,0.6))",
                  }}
                />
                <p
                  className="heading-gaming text-xs mt-2"
                  style={{ color: "#F2F3F5" }}
                >
                  YOUR TEAM
                </p>
              </div>
              <div className="text-center">
                <p
                  className="heading-gaming text-3xl"
                  style={{
                    color: "#FF2A3A",
                    textShadow:
                      "0 0 15px #FF2A3A, 0 0 30px rgba(255,42,58,0.5)",
                  }}
                >
                  VS
                </p>
              </div>
              <div className="text-center">
                <Shield
                  className="w-16 h-16"
                  style={{
                    color: "#6b7280",
                    filter: "drop-shadow(0 0 5px rgba(107,114,128,0.4))",
                  }}
                />
                <p
                  className="heading-gaming text-xs mt-2"
                  style={{ color: "#9AA0A6" }}
                >
                  CHALLENGERS
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl mb-8"
          style={{
            background: "rgba(214,31,45,0.1)",
            border: "1px solid #6A0F16",
          }}
          data-ocid="tournament.panel"
        >
          <h3
            className="heading-gaming text-sm mb-3"
            style={{ color: "#FF2A3A" }}
          >
            ⚡ PAYMENT INSTRUCTIONS
          </h3>
          <div
            className="space-y-2 text-sm"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "#B0B6BD" }}
          >
            <p>
              1. Send <strong style={{ color: "#FF2A3A" }}>₹50</strong> to UPI
              ID: <strong style={{ color: "#FFD700" }}>onepiece@upi</strong>
            </p>
            <p>
              2. Include your{" "}
              <strong style={{ color: "#FF2A3A" }}>Player UID</strong> in the
              payment note
            </p>
            <p>3. Fill the registration form below with payment reference</p>
            <p>4. Wait for confirmation within 24 hours</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-gaming p-8"
        >
          <h2
            className="heading-gaming text-lg mb-6"
            style={{ color: "#F2F3F5" }}
          >
            REGISTER FOR TOURNAMENT
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="tournament.panel"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="t-player-name"
                  className="block text-xs mb-2 tracking-widest"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#9AA0A6",
                  }}
                >
                  PLAYER NAME
                </label>
                <input
                  id="t-player-name"
                  className="input-gaming"
                  placeholder="In-game name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  data-ocid="tournament.input"
                />
              </div>
              <div>
                <label
                  htmlFor="t-player-id"
                  className="block text-xs mb-2 tracking-widest"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#9AA0A6",
                  }}
                >
                  PLAYER UID
                </label>
                <input
                  id="t-player-id"
                  className="input-gaming"
                  placeholder="Free Fire UID"
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  data-ocid="tournament.input"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="t-game-level"
                className="block text-xs mb-2 tracking-widest"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#9AA0A6",
                }}
              >
                GAME LEVEL
              </label>
              <input
                id="t-game-level"
                type="number"
                className="input-gaming"
                placeholder="Your game level"
                value={gameLevel}
                onChange={(e) => setGameLevel(e.target.value)}
                data-ocid="tournament.input"
              />
            </div>
            <div>
              <label
                htmlFor="t-payment-note"
                className="block text-xs mb-2 tracking-widest"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#9AA0A6",
                }}
              >
                PAYMENT NOTE
              </label>
              <input
                id="t-payment-note"
                className="input-gaming"
                placeholder="UPI transaction ID or payment reference"
                value={paymentNote}
                onChange={(e) => setPaymentNote(e.target.value)}
                data-ocid="tournament.input"
              />
            </div>
            <button
              type="submit"
              className="btn-gaming w-full"
              disabled={isPending}
              data-ocid="tournament.submit_button"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                "REGISTER FOR TOURNAMENT"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
