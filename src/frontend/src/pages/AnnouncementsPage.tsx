import { Loader2, Megaphone, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAnnouncements, usePostAnnouncement } from "../hooks/useQueries";

export default function AnnouncementsPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { data: announcements = [], isLoading } = useAnnouncements();
  const { mutateAsync, isPending } = usePostAnnouncement();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body || !author) {
      toast.error("Please fill all fields.");
      return;
    }
    try {
      await mutateAsync({ title, body, author });
      toast.success("Announcement posted!");
      setTitle("");
      setBody("");
      setAuthor("");
      setShowForm(false);
    } catch {
      toast.error("Failed to post announcement.");
    }
  };

  const formatDate = (ts: bigint) => {
    return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const sampleAnnouncements = [
    {
      title: "WEEKLY SQUAD WAR \u2014 SIGN UP NOW",
      body: "All members must register for the weekly squad war by Friday 11 PM. Minimum level 30 required. Contact the leader for team assignments.",
      author: "CAPTAIN LUFFY",
      timestamp: BigInt(
        Date.now() * 1_000_000 - 2 * 24 * 60 * 60 * 1_000_000_000,
      ),
    },
    {
      title: "NEW RECRUITMENT DRIVE OPEN",
      body: "We are recruiting 5 elite members for our tournament squad. Requirements: Level 60+, KDA > 3.0, minimum 100 matches. Apply by sending your UID to the leader.",
      author: "CAPTAIN LUFFY",
      timestamp: BigInt(
        Date.now() * 1_000_000 - 5 * 24 * 60 * 60 * 1_000_000_000,
      ),
    },
    {
      title: "GUILD RULES UPDATE \u2014 READ CAREFULLY",
      body: "1. Respect all members. 2. No hacking or cheating. 3. Active participation in weekly events is mandatory. 4. Guild chat must remain in English. Violations result in immediate removal.",
      author: "CAPTAIN LUFFY",
      timestamp: BigInt(
        Date.now() * 1_000_000 - 10 * 24 * 60 * 60 * 1_000_000_000,
      ),
    },
  ];

  const displayAnnouncements =
    announcements.length > 0 ? announcements : sampleAnnouncements;

  return (
    <div className="min-h-screen pt-20 pb-16" style={{ background: "#0B0B0D" }}>
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8 flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-3">
              <Megaphone className="w-6 h-6" style={{ color: "#D61F2D" }} />
              <h1
                className="heading-gaming text-2xl"
                style={{ color: "#F2F3F5" }}
              >
                ANNOUNCEMENTS
              </h1>
            </div>
            <p
              className="text-sm mt-1"
              style={{ color: "#9AA0A6", fontFamily: "'Rajdhani', sans-serif" }}
            >
              Official updates from guild leadership
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="btn-gaming text-xs px-4 py-2 flex items-center gap-2"
            data-ocid="announcements.open_modal_button"
          >
            <Plus className="w-4 h-4" />
            POST
          </button>
        </motion.div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="card-gaming p-6 mb-6"
            data-ocid="announcements.panel"
          >
            <h2
              className="heading-gaming text-sm mb-4"
              style={{ color: "#F2F3F5" }}
            >
              POST ANNOUNCEMENT
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="ann-title"
                  className="block text-xs mb-1 tracking-widest"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#9AA0A6",
                  }}
                >
                  TITLE
                </label>
                <input
                  id="ann-title"
                  className="input-gaming"
                  placeholder="Announcement title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  data-ocid="announcements.input"
                />
              </div>
              <div>
                <label
                  htmlFor="ann-body"
                  className="block text-xs mb-1 tracking-widest"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#9AA0A6",
                  }}
                >
                  MESSAGE
                </label>
                <textarea
                  id="ann-body"
                  className="input-gaming"
                  rows={4}
                  placeholder="Write your announcement..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  data-ocid="announcements.textarea"
                />
              </div>
              <div>
                <label
                  htmlFor="ann-author"
                  className="block text-xs mb-1 tracking-widest"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#9AA0A6",
                  }}
                >
                  AUTHOR
                </label>
                <input
                  id="ann-author"
                  className="input-gaming"
                  placeholder="Your name / title"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  data-ocid="announcements.input"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="btn-gaming flex-1"
                  disabled={isPending}
                  data-ocid="announcements.submit_button"
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                  ) : (
                    "POST ANNOUNCEMENT"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2 rounded text-sm"
                  style={{
                    border: "1px solid #6A0F16",
                    color: "#9AA0A6",
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                  }}
                  data-ocid="announcements.cancel_button"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {isLoading ? (
          <div
            className="flex justify-center py-16"
            data-ocid="announcements.loading_state"
          >
            <p
              style={{
                color: "#9AA0A6",
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "0.7rem",
              }}
            >
              LOADING...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayAnnouncements.map((ann, i) => (
              <motion.div
                key={ann.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-gaming p-6"
                data-ocid={`announcements.item.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3
                    className="heading-gaming text-sm flex-1"
                    style={{
                      color: "#F2F3F5",
                      textShadow: "0 0 8px rgba(255,42,58,0.2)",
                    }}
                  >
                    {ann.title}
                  </h3>
                  <span
                    className="text-xs flex-shrink-0"
                    style={{
                      color: "#9AA0A6",
                      fontFamily: "'Rajdhani', sans-serif",
                    }}
                  >
                    {formatDate(ann.timestamp)}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{
                    color: "#B0B6BD",
                    fontFamily: "'Rajdhani', sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  {ann.body}
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className="h-px flex-1"
                    style={{
                      background:
                        "linear-gradient(to right, #6A0F16, transparent)",
                    }}
                  />
                  <span
                    className="text-xs px-2"
                    style={{
                      color: "#D61F2D",
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    \u2014 {ann.author}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
