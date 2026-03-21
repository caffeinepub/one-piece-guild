import { Bot, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
}

function getAIReply(input: string): string {
  const q = input.toLowerCase();

  if (
    q.includes("tournament") ||
    q.includes("register") ||
    q.includes("registration")
  ) {
    return "Tournament mein register karne ke liye Tournament page par jao. Entry fee \u20b950 hai. UPI ID 9328343183 par payment karo aur apna UID note mein likho. 24 ghante mein confirmation milegi.";
  }
  if (
    q.includes("upi") ||
    q.includes("payment") ||
    q.includes("pay") ||
    q.includes("fee")
  ) {
    return "Tournament entry fee \u20b950 hai. Payment ke liye UPI ID: 9328343183 use karo. Payment ke baad apna transaction ID registration form mein dalo.";
  }
  if (q.includes("join") || q.includes("guild") || q.includes("member")) {
    return "ONE PIECE Guild join karne ke liye Join page par jao aur apna in-game name, UID aur game level fill karo. Our leaders review karenge aur confirm karenge!";
  }
  if (q.includes("leader") || q.includes("admin") || q.includes("boss")) {
    return "Guild leaders ke announcements Announcements page par milenge. Leaders ko contact karne ke liye Complaints page use kar sakte ho ya Guild Chat mein message karo.";
  }
  if (
    q.includes("complaint") ||
    q.includes("problem") ||
    q.includes("issue") ||
    q.includes("report")
  ) {
    return "Koi bhi complaint ya problem ke liye Complaints page par jao. Apna naam, type aur detail bharo. Guild leaders review karenge.";
  }
  if (
    q.includes("leaderboard") ||
    q.includes("rank") ||
    q.includes("top") ||
    q.includes("score")
  ) {
    return "Guild leaderboard dekhne ke liye Leaderboard page par jao. Wahan top players aur unke kills/wins dekh sakte ho!";
  }
  if (q.includes("chat") || q.includes("message") || q.includes("talk")) {
    return "Guild members se baat karne ke liye Guild Chat page par jao. Wahan real-time messages bhej sakte ho. 'tournament' ya 'leader' type karo BOT se info paane ke liye!";
  }
  if (
    q.includes("prize") ||
    q.includes("reward") ||
    q.includes("win") ||
    q.includes("winner")
  ) {
    return "Tournament prize pool \u20b9500 hai! 1st place: \u20b9300, 2nd place: \u20b9150, 3rd place: \u20b950. Participate karo aur jeeto!";
  }
  if (
    q.includes("hello") ||
    q.includes("hi") ||
    q.includes("hey") ||
    q.includes("namaste") ||
    q.includes("hii")
  ) {
    return "Namaste! Main ONE PIECE Guild AI Assistant hoon. Tournament, joining, payment, leaderboard -- kisi bhi cheez ke baare mein puch sakte ho!";
  }
  if (q.includes("free fire") || q.includes("ff") || q.includes("game")) {
    return "ONE PIECE ek Free Fire guild hai! Hum tournaments organize karte hain, leaderboard maintain karte hain aur active guild members ka ek strong community banate hain.";
  }
  return "Samajh nahi aaya. Tournament, joining, payment, leaderboard, ya complaints ke baare mein puch sakte ho. Main help karne ki koshish karoonga!";
}

let msgIdCounter = 1;

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "ai",
      text: "Namaste! Main ONE PIECE Guild AI Assistant hoon. Kaise help kar sakta hoon? Tournament, payment, joining -- kuch bhi puch sakte ho!",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const msgCount = messages.length;

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional scroll-to-bottom on new message
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgCount, open]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg: Message = {
      id: msgIdCounter++,
      role: "user",
      text: input.trim(),
    };
    const aiReply: Message = {
      id: msgIdCounter++,
      role: "ai",
      text: getAIReply(input.trim()),
    };
    setMessages((prev) => [...prev, userMsg, aiReply]);
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, #D61F2D, #8B0000)",
          boxShadow: "0 0 20px rgba(214,31,45,0.6), 0 4px 15px rgba(0,0,0,0.5)",
          border: "1px solid #FF2A3A",
        }}
        aria-label="AI Assistant"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Bot className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: "#141519",
              border: "1px solid #6A0F16",
              boxShadow:
                "0 0 30px rgba(214,31,45,0.3), 0 10px 40px rgba(0,0,0,0.6)",
              height: "420px",
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center gap-3"
              style={{
                background: "linear-gradient(135deg, #1a0308, #0F0609)",
                borderBottom: "1px solid #6A0F16",
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(214,31,45,0.3)",
                  border: "1px solid #D61F2D",
                }}
              >
                <Bot className="w-4 h-4" style={{ color: "#FF2A3A" }} />
              </div>
              <div>
                <p
                  className="text-xs font-bold"
                  style={{
                    color: "#F2F3F5",
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  AI ASSISTANT
                </p>
                <p
                  className="text-xs"
                  style={{
                    color: "#22c55e",
                    fontFamily: "'Rajdhani', sans-serif",
                  }}
                >
                  Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[85%] rounded-xl px-3 py-2 text-sm"
                    style={{
                      background:
                        msg.role === "user"
                          ? "rgba(214,31,45,0.25)"
                          : "rgba(255,255,255,0.06)",
                      border:
                        msg.role === "user"
                          ? "1px solid #6A0F16"
                          : "1px solid rgba(255,255,255,0.08)",
                      color: "#D0D5DB",
                      fontFamily: "'Rajdhani', sans-serif",
                      lineHeight: 1.4,
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={sendMessage}
              className="p-3 flex gap-2"
              style={{ borderTop: "1px solid #6A0F16" }}
            >
              <input
                className="input-gaming flex-1 text-sm"
                placeholder="Kuch bhi puch sakte ho..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ padding: "0.5rem 0.75rem", fontSize: "0.82rem" }}
              />
              <button
                type="submit"
                className="btn-gaming px-3"
                style={{ padding: "0.5rem 0.75rem" }}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
