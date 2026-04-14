# Ravi Karmakar — Full-Stack Developer Portfolio

A high-performance, OLED-optimized developer portfolio built to showcase production-grade systems, aesthetic design, and premium web experiences.

### 🚀 Live Demo
**https://ravi-karmakar-portfolio.vercel.app/**

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom CSS variables
- **UI Components:** Shadcn UI & Magic UI
- **Animations:** Framer Motion 
- **Package Manager:** Bun

---

## ✨ Key Features

- **OLED-Optimized Dark Theme:** High contrast, visually striking interface with custom glow palettes designed for modern displays.
- **Data-Driven Architecture:** Entire portfolio content is centralized in `src/lib/constants.ts`, allowing for near "no-code" content updates.
- **Automated Communication:** Integrated Brevo SMTP API for professional, multi-stage interactive contact handling.
- **Cinematic Experience:** Sophisticated scroll reveals, Bento Grids, and Movie Reel galleries with shared element transitions (`layoutId`).
- **Performance Optimized:** Memoized component architecture and specialized asset warmup sequences to ensure butter-smooth 120FPS rendering.

---

## ⚙️ Deployment & Environment

To deploy this portfolio, you must configure the following environment variables. A template is provided in `.env.example`.

### Required Variables:
- `BREVO_API_KEY`: Your Brevo SMTP API key.
- `NEXT_PUBLIC_RECIPIENT_EMAIL`: The email that will receive messages.
- `SENDER_EMAIL`: The email used by Brevo to send notifications.
- `SENDER_NAME`: The display name for outgoing emails.

---

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ravikarmakar/ravi-karmakar-portfolio.git
   cd ravi-karmakar-portfolio
   ```

2. **Install dependencies:**
   We use `bun` for blazingly fast package management.
   ```bash
   bun install
   ```

3. **Run the development server:**
   ```bash
   bun run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application in action.

---

## 📬 Connect

- **LinkedIn:** [linkedin.com/in/ravikarmakar](https://www.linkedin.com/in/ravikarmakar/)
- **GitHub:** [github.com/ravikarmakar](https://github.com/ravikarmakar)
- **Twitter / X:** [x.com/ravi_karmakar4](https://x.com/ravi_karmakar4)
- **Email:** [ravikarmkar94475@gmail.com](mailto:ravikarmkar94475@gmail.com)

<br/>

<p align="center">
  <em>Designed and engineered with precision by Ravi Karmakar ❤️</em>
</p>
