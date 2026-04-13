"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/ravikarmakar",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/ravikarmakar",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/ravikarmakar",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
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
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mx-auto max-w-2xl text-center"
        >
          {/* Glassmorphism Card */}
          <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-12 backdrop-blur-xl md:p-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
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
              transition={{ delay: 0.4, duration: 0.6 }}
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
                      <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                      ravikarmkar94457@gmail.com
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
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
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
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
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
