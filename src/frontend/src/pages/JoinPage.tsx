import { Loader2, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useRegisterPlayer } from "../hooks/useQueries";

export default function JoinPage() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [gameLevel, setGameLevel] = useState("");
  const { mutateAsync, isPending } = useRegisterPlayer();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !userId || !gameLevel) {
      toast.error("Please fill all fields.");
      return;
    }
    try {
      await mutateAsync({ username, userId, gameLevel: BigInt(gameLevel) });
      toast.success(
        "Welcome to ONE PIECE Guild! Your registration is confirmed.",
      );
      setUsername("");
      setUserId("");
      setGameLevel("");
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen pt-20 pb-16 flex items-center justify-center gaming-grid-bg"
      style={{ background: "#06060E" }}
    >
      <div className="max-w-md w-full mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card-gaming p-8"
        >
          <div className="text-center mb-8">
            <UserPlus
              className="w-12 h-12 mx-auto mb-4"
              style={{ color: "#7C3AED" }}
            />
            <h1
              className="heading-gaming text-2xl"
              style={{
                color: "#F0EEF8",
                textShadow: "0 0 10px rgba(139,92,246,0.3)",
              }}
            >
              JOIN THE GUILD
            </h1>
            <p
              className="mt-2 text-sm"
              style={{ color: "#8080A0", fontFamily: "'Rajdhani', sans-serif" }}
            >
              Register as a member of ONE PIECE Free Fire Guild
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="join.panel"
          >
            <div>
              <label
                htmlFor="join-username"
                className="block text-xs mb-2 tracking-widest"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#8080A0",
                }}
              >
                PLAYER NAME
              </label>
              <input
                id="join-username"
                className="input-gaming"
                placeholder="Enter your in-game name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                data-ocid="join.input"
              />
            </div>

            <div>
              <label
                htmlFor="join-userid"
                className="block text-xs mb-2 tracking-widest"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#8080A0",
                }}
              >
                PLAYER UID
              </label>
              <input
                id="join-userid"
                className="input-gaming"
                placeholder="Enter your Free Fire UID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                data-ocid="join.input"
              />
            </div>

            <div>
              <label
                htmlFor="join-level"
                className="block text-xs mb-2 tracking-widest"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#8080A0",
                }}
              >
                GAME LEVEL
              </label>
              <input
                id="join-level"
                type="number"
                min="1"
                max="100"
                className="input-gaming"
                placeholder="Enter your current game level (1-100)"
                value={gameLevel}
                onChange={(e) => setGameLevel(e.target.value)}
                data-ocid="join.input"
              />
            </div>

            <button
              type="submit"
              className="btn-gaming w-full mt-2"
              disabled={isPending}
              data-ocid="join.submit_button"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  REGISTERING...
                </span>
              ) : (
                "JOIN NOW"
              )}
            </button>
          </form>

          <div
            className="mt-6 p-4 rounded-lg text-center"
            style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid #2D1B69",
            }}
          >
            <p
              className="text-xs"
              style={{ color: "#8080A0", fontFamily: "'Rajdhani', sans-serif" }}
            >
              By joining, you agree to follow guild rules and compete with
              honor. Guild UID:{" "}
              <span style={{ color: "#8B5CF6" }}>3049611812</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
