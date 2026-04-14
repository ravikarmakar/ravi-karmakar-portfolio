"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";
import { NexusIcon } from "@/components/ui/nexus-icon";
import { SOCIAL_LINKS, PREMIUM_TRANSITION } from "@/lib/constants";

const socials = [
  {
    name: "GitHub",
    href: SOCIAL_LINKS.github,
    icon: <NexusIcon name="github" size={20} />,
  },
  {
    name: "LinkedIn",
    href: SOCIAL_LINKS.linkedin,
    icon: <NexusIcon name="linkedin" size={20} />,
  },
  {
    name: "X (Twitter)",
    href: SOCIAL_LINKS.twitter,
    icon: <NexusIcon name="x" size={20} />,
  },
];

const subjects = [
  { id: "project", label: "Project Inquiry", icon: "🚀" },
  { id: "system", label: "System Design", icon: "💻" },
  { id: "collab", label: "Collaboration", icon: "🤝" },
  { id: "hi", label: "Say Hi", icon: "☕" },
];

type ContactStage = "IDLE" | "SUBJECT" | "EMAIL" | "MESSAGE" | "SUCCESS";

export function ContactSection() {
  const { ref, isInView } = useScrollReveal();
  const [stage, setStage] = useState<ContactStage>("IDLE");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!message || !visitorEmail || isSending) return;
    setIsSending(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          subject: selectedSubject, 
          message,
          visitorEmail // Sending this to the API
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send");

      setStage("SUCCESS");
      
      // Reset after showing success for a while
      setTimeout(() => {
        setStage("IDLE");
        setMessage("");
        setSelectedSubject("");
        setIsSending(false);
      }, 5000);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Something went wrong. Please try again.");
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-t from-[var(--glow-cyan)]/[0.03] to-transparent blur-[100px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={PREMIUM_TRANSITION}
          className="relative mx-auto max-w-2xl text-center"
        >
          {/* Glassmorphism Card */}
          <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-12 backdrop-blur-xl md:p-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...PREMIUM_TRANSITION, delay: 0.2 }}
              className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
            >
              Let&apos;s Build{" "}
              <span className="bg-gradient-to-r from-[var(--glow-cyan)] to-[var(--glow-violet)] bg-clip-text text-transparent">
                Together
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...PREMIUM_TRANSITION, delay: 0.4 }}
              className="mt-4 text-[var(--text-muted)] text-base sm:text-lg"
            >
              Got a project that needs serious engineering muscle? Let&apos;s
              talk architecture, performance, and shipping at scale.
            </motion.p>

            <div className="mt-8 flex flex-col items-center justify-center min-h-[80px]">
              <AnimatePresence mode="wait">
                {stage === "IDLE" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                  >
                    <MagneticButton
                      onClick={() => setStage("SUBJECT")}
                      className="!bg-gradient-to-r !from-[var(--glow-cyan)]/20 !to-[var(--glow-violet)]/20 !border-[var(--glow-cyan)]/30 !text-base !px-10 !py-4"
                    >
                      <NexusIcon name="mail" size={20} className="mr-2" />
                      {SOCIAL_LINKS.email}
                    </MagneticButton>
                  </motion.div>
                )}

                {stage === "SUBJECT" && (
                  <motion.div
                    key="subjects"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-wrap justify-center gap-3"
                  >
                    {subjects.map((sub, i) => (
                      <motion.button
                        key={sub.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => {
                          setSelectedSubject(sub.label);
                          setStage("EMAIL");
                        }}
                        className="group relative flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 px-6 text-sm font-medium text-white transition-all hover:border-[var(--glow-cyan)]/50 hover:bg-white/10"
                      >
                        <span className="text-lg">{sub.icon}</span>
                        {sub.label}
                      </motion.button>
                    ))}
                    <button 
                      onClick={() => setStage("IDLE")}
                      className="text-xs text-[var(--text-muted)] hover:text-white underline underline-offset-4 ml-2"
                    >
                      Cancel
                    </button>
                  </motion.div>
                )}

                {stage === "EMAIL" && (
                  <motion.div
                    key="email"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="relative w-full max-w-md mx-auto"
                  >
                    <div className="absolute -top-6 left-2 flex items-center gap-2">
                       <span className="text-[10px] font-bold text-[var(--glow-cyan)] uppercase tracking-widest">{selectedSubject}</span>
                    </div>
                    <div className="group relative flex items-center">
                      <input
                        autoFocus
                        type="email"
                        placeholder="What's your email?"
                        value={visitorEmail}
                        onChange={(e) => setVisitorEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && visitorEmail.includes("@") && setStage("MESSAGE")}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-6 pr-16 text-white placeholder:text-white/20 focus:border-[var(--glow-cyan)]/50 focus:outline-none transition-all"
                      />
                      <button
                        onClick={() => setStage("MESSAGE")}
                        disabled={!visitorEmail.includes("@")}
                        className={cn(
                          "absolute right-2 flex h-10 w-10 items-center justify-center rounded-xl transition-all",
                          visitorEmail.includes("@")
                            ? "bg-[var(--glow-cyan)] text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]" 
                            : "bg-white/5 text-white/20"
                        )}
                      >
                        <NexusIcon name="send" size={20} />
                      </button>
                    </div>
                    <button 
                      onClick={() => setStage("SUBJECT")}
                      className="absolute -bottom-6 left-2 text-[10px] text-[var(--text-muted)] hover:text-white uppercase tracking-tighter"
                    >
                      ← Back
                    </button>
                  </motion.div>
                )}

                {stage === "MESSAGE" && (
                  <motion.div
                    key="message"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="relative w-full max-w-lg mx-auto"
                  >
                    <div className="absolute -top-6 left-2 flex items-center gap-2">
                       <span className="text-[10px] font-bold text-[var(--glow-cyan)] uppercase tracking-widest">{selectedSubject}</span>
                       <span className="text-[10px] text-white/20 font-mono">/</span>
                       <span className="text-[10px] text-white/40 font-mono tracking-tighter truncate max-w-[150px]">{visitorEmail}</span>
                    </div>
                    <div className="group relative flex items-center">
                      <input
                        autoFocus
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-6 pr-16 text-white placeholder:text-white/20 focus:border-[var(--glow-cyan)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--glow-cyan)]/20 transition-all"
                      />
                      <button
                        onClick={handleSend}
                        disabled={!message || isSending}
                        className={cn(
                          "absolute right-2 flex h-10 w-10 items-center justify-center rounded-xl transition-all",
                          message && !isSending
                            ? "bg-[var(--glow-cyan)] text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-105" 
                            : "bg-white/5 text-white/20"
                        )}
                      >
                        {isSending ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                        ) : (
                          <NexusIcon name="send" size={20} />
                        )}
                      </button>
                    </div>
                    {!isSending && (
                       <button 
                        onClick={() => setStage("EMAIL")}
                        className="absolute -bottom-6 left-2 text-[10px] text-[var(--text-muted)] hover:text-white uppercase tracking-tighter"
                      >
                        ← Back
                      </button>
                    )}
                  </motion.div>
                )}

                {stage === "SUCCESS" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--glow-emerald)]/20 text-[var(--glow-emerald)]">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">Message Dispatched!</p>
                      <p className="text-xs text-[var(--text-muted)]">I&apos;ll get back to you across the nexus shortly.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 flex items-center justify-center gap-4"
            >
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-white/5 text-[var(--text-muted)] transition-all duration-300 hover:border-white/20 hover:text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
