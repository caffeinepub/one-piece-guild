import { AlertTriangle, Loader2, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useComplaints, useSendComplaint } from "../hooks/useQueries";

export default function ComplaintsPage() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const { data: complaints = [], isLoading } = useComplaints();
  const { mutateAsync, isPending } = useSendComplaint();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !message) {
      toast.error("Please fill all fields.");
      return;
    }
    try {
      await mutateAsync({ username, message });
      toast.success(
        "Your complaint has been submitted. We'll review it shortly.",
      );
      setUsername("");
      setMessage("");
    } catch {
      toast.error("Failed to submit complaint.");
    }
  };

  const formatDate = (ts: bigint) => {
    return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-16" style={{ background: "#06060E" }}>
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6" style={{ color: "#7C3AED" }} />
            <h1
              className="heading-gaming text-2xl"
              style={{ color: "#F0EEF8" }}
            >
              COMPLAINTS & SUPPORT
            </h1>
          </div>
          <p
            className="text-sm mt-1"
            style={{ color: "#8080A0", fontFamily: "'Rajdhani', sans-serif" }}
          >
            Submit complaints, reports, or support requests to guild management
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-gaming p-8 mb-8"
        >
          <h2
            className="heading-gaming text-sm mb-6"
            style={{ color: "#F0EEF8" }}
          >
            SUBMIT A COMPLAINT
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="complaints.panel"
          >
            <div>
              <label
                htmlFor="c-username"
                className="block text-xs mb-2 tracking-widest"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#8080A0",
                }}
              >
                YOUR USERNAME
              </label>
              <input
                id="c-username"
                className="input-gaming"
                placeholder="Enter your in-game name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                data-ocid="complaints.input"
              />
            </div>
            <div>
              <label
                htmlFor="c-message"
                className="block text-xs mb-2 tracking-widest"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#8080A0",
                }}
              >
                MESSAGE
              </label>
              <textarea
                id="c-message"
                className="input-gaming"
                rows={5}
                placeholder="Describe your complaint or support request in detail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                data-ocid="complaints.textarea"
              />
            </div>
            <button
              type="submit"
              className="btn-gaming w-full"
              disabled={isPending}
              data-ocid="complaints.submit_button"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                "SUBMIT COMPLAINT"
              )}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5" style={{ color: "#7C3AED" }} />
            <h2 className="heading-gaming text-sm" style={{ color: "#F0EEF8" }}>
              SUBMITTED COMPLAINTS
            </h2>
          </div>

          {isLoading ? (
            <div
              className="flex justify-center py-8"
              data-ocid="complaints.loading_state"
            >
              <p
                style={{
                  color: "#8080A0",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.7rem",
                }}
              >
                LOADING...
              </p>
            </div>
          ) : complaints.length === 0 ? (
            <div
              className="card-gaming p-8 text-center"
              data-ocid="complaints.empty_state"
            >
              <p
                style={{
                  color: "#8080A0",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.7rem",
                }}
              >
                NO COMPLAINTS SUBMITTED YET
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {complaints.map((c, i) => (
                <motion.div
                  key={`${c.username}-${String(c.timestamp)}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card-gaming p-5"
                  data-ocid={`complaints.item.${i + 1}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className="text-sm font-bold"
                      style={{
                        color: "#8B5CF6",
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "0.75rem",
                      }}
                    >
                      {c.username}
                    </span>
                    <span
                      className="text-xs"
                      style={{
                        color: "#8080A0",
                        fontFamily: "'Rajdhani', sans-serif",
                      }}
                    >
                      {formatDate(c.timestamp)}
                    </span>
                  </div>
                  <p
                    className="text-sm"
                    style={{
                      color: "#A0A0C0",
                      fontFamily: "'Rajdhani', sans-serif",
                    }}
                  >
                    {c.message}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
