export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-[var(--text-muted)]">
          &copy; {new Date().getFullYear()} Ravi Karmakar. All rights reserved.
        </p>
        <p className="text-sm text-[var(--text-muted)]">
          Built with{" "}
          <span className="text-white">Next.js</span> &{" "}
          <span className="text-red-400">&#10084;</span>
        </p>
      </div>
    </footer>
  );
}
