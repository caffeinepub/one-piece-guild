import { Bot, MessageSquare, Send } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useChatMessages, useSendChatMessage } from "../hooks/useQueries";

const BOT_NAME = "ONE PIECE BOT";

function getBotReply(content: string): string | null {
  const lower = content.toLowerCase();
  if (lower.includes("tournament")) {
    return "Check out our upcoming tournament on the Tournament page! Entry fee: \u20b950";
  }
  if (lower.includes("leader")) {
    return "Our guild leader manages announcements. Check the Announcements section!";
  }
  return null;
}

export default function ChatPage() {
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const { data: messages = [], isLoading } = useChatMessages();
  const { mutateAsync, isPending } = useSendChatMessage();
  const bottomRef = useRef<HTMLDivElement>(null);
  const msgCount = messages.length;

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional scroll-to-bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgCount]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sender.trim() || !message.trim()) {
      toast.error("Enter your name and a message.");
      return;
    }
    try {
      await mutateAsync({ sender: sender.trim(), content: message.trim() });
      const botReply = getBotReply(message);
      if (botReply) {
        await mutateAsync({ sender: BOT_NAME, content: botReply });
      }
      setMessage("");
    } catch {
      toast.error("Failed to send message.");
    }
  };

  const formatTime = (ts: bigint) => {
    return new Date(Number(ts) / 1_000_000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="min-h-screen pt-20 pb-4 flex flex-col"
      style={{ background: "#06060E" }}
    >
      <div
        className="max-w-3xl w-full mx-auto px-4 flex flex-col flex-1"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-6"
        >
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6" style={{ color: "#7C3AED" }} />
            <h1 className="heading-gaming text-xl" style={{ color: "#F0EEF8" }}>
              GUILD CHAT
            </h1>
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{
                background: "rgba(34,197,94,0.2)",
                color: "#22c55e",
                fontFamily: "'Orbitron', sans-serif",
              }}
            >
              LIVE
            </span>
          </div>
          <p
            className="text-sm mt-1"
            style={{ color: "#8080A0", fontFamily: "'Rajdhani', sans-serif" }}
          >
            Chat updates every 3 seconds. BOT responds to keywords:
            "tournament", "leader"
          </p>
        </motion.div>

        <div
          className="flex-1 rounded-xl p-4 overflow-y-auto mb-4 space-y-3"
          style={{
            background: "#0D0D18",
            border: "1px solid #2D1B69",
            minHeight: 0,
            maxHeight: "calc(100vh - 320px)",
          }}
          data-ocid="chat.panel"
        >
          {isLoading ? (
            <div
              className="flex items-center justify-center h-32"
              data-ocid="chat.loading_state"
            >
              <p
                style={{
                  color: "#8080A0",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.7rem",
                }}
              >
                LOADING MESSAGES...
              </p>
            </div>
          ) : messages.length === 0 ? (
            <div
              className="flex items-center justify-center h-32"
              data-ocid="chat.empty_state"
            >
              <p
                style={{
                  color: "#8080A0",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.7rem",
                }}
              >
                NO MESSAGES YET. START THE CONVERSATION!
              </p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <motion.div
                key={`${msg.sender}-${String(msg.timestamp)}`}
                initial={{ opacity: 0, x: msg.sender === BOT_NAME ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-2"
                data-ocid={`chat.item.${i + 1}`}
              >
                <div className="flex-shrink-0">
                  {msg.sender === BOT_NAME ? (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(124,58,237,0.3)",
                        border: "1px solid #7C3AED",
                      }}
                    >
                      <Bot className="w-4 h-4" style={{ color: "#8B5CF6" }} />
                    </div>
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: "rgba(124,58,237,0.2)",
                        border: "1px solid #2D1B69",
                        color: "#F0EEF8",
                        fontFamily: "'Orbitron', sans-serif",
                      }}
                    >
                      {msg.sender.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-xs font-bold"
                      style={{
                        color: msg.sender === BOT_NAME ? "#FFD700" : "#8B5CF6",
                        fontFamily: "'Orbitron', sans-serif",
                      }}
                    >
                      {msg.sender}
                    </span>
                    <span className="text-xs" style={{ color: "#6b7280" }}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  <p
                    className="text-sm mt-0.5"
                    style={{
                      color: "#A0A0C0",
                      fontFamily: "'Rajdhani', sans-serif",
                    }}
                  >
                    {msg.content}
                  </p>
                </div>
              </motion.div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSend} className="flex gap-2 pb-4">
          <input
            className="input-gaming"
            placeholder="Your name"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            style={{ width: "140px", flexShrink: 0 }}
            data-ocid="chat.input"
          />
          <input
            className="input-gaming flex-1"
            placeholder="Type a message... (try: 'tournament' or 'leader')"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            data-ocid="chat.input"
          />
          <button
            type="submit"
            className="btn-gaming px-4 flex items-center gap-2"
            disabled={isPending}
            data-ocid="chat.submit_button"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">SEND</span>
          </button>
        </form>
      </div>
    </div>
  );
}
