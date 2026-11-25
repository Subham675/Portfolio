# Subham Karmakar — Developer Portfolio

Personal portfolio website for **Subham Karmakar** (`.NET Full-Stack Developer`), designed with a warm-paper & obsidian bento layout, electric lime (`#C8F560`) accents, sticky-stacking project cards, and a mobile-friendly inline CV viewer.

---

## ✨ Features

- **Light & Dark Theme Toggle** — Persists preference in `localStorage`, respects system theme, syncs mobile `<meta name="theme-color">`, and transitions with a circular View Transitions wipe.
- **Hero & Bento Overview** — Live India (`IST / UTC+5:30`) clock pill, animated stat counters, grouped tech stack chips, and an infinite tech marquee strip.
- **Sticky-Stacking Work Cards** — Scroll-driven scale & dim progression across 5 featured builds:
  - **CityHangAround** *(Honeybee Digital Internship · Laravel → Next.js migration)*
  - **Issue-Tracker** *(ASP.NET Core MVC `.NET 10`, EF Core, LINQ, SQL Server, Razor, Bootstrap)*
  - **Myra — AI Voice Assistant** *(Python, LiveKit, Google Realtime API, `asyncio`)*
  - **Advanced PHP Online Quiz App** *(PHP, MySQL, Google Gemini API, 11-table relational schema)*
  - **Terminal 1** *(Fine Dining & Table Reservation Platform · PHP MVC, Razorpay, Google OAuth 2.0, Docker, PHPUnit)*
- **Cross-Device Inline CV Viewer** — Self-hosted **PDF.js** (`assets/vendor/pdfjs/`) renders [Subham_Resume.pdf](./assets/Subham_Resume.pdf) crisply on **Android, iOS Safari, and Desktop**, alongside one-click Download and full-screen open actions.
- **Day/Night Animated Skyline Footer** — Custom SVG Cooch Behar rooftop & heritage skyline that switches sun/moon, stars, and lit windows between Light and Dark modes.

---

## 📂 Project Structure

```text
Portfolio/
├── index.html                        # Main semantic HTML page & SEO/JSON-LD metadata
├── vercel.json                       # Vercel static hosting & inline PDF header rules
├── .gitignore
├── README.md
└── assets/
    ├── Subham_Resume.pdf             # Embedded & downloadable CV PDF
    ├── css/
    │   └── main.css                  # Theme tokens, bento grid, cards, animations
    ├── js/
    │   └── main.js                   # Theme wipe, clock, stack progress, PDF.js renderer
    ├── vendor/pdfjs/                 # Self-hosted PDF.js library & worker (v3.11.174)
    └── images/
        ├── favicon.svg
        ├── hero-portrait.jpg
        ├── about-evening.jpg
        ├── about-night.jpg
        ├── avatar-suit.jpg
        └── projects/
            └── cityhangaround.png
```

---

## 🚀 Deploy Free on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Import **`Subham675/Portfolio`**.
3. Keep **Framework Preset** set to **Other** (zero build step needed) and click **Deploy**.
4. `vercel.json` automatically sets `cleanUrls` and serves `/assets/Subham_Resume.pdf` inline as `application/pdf`.

---

## 💻 Local Preview

Run any static HTTP server from the repository root (avoid `file://` so PDF.js can fetch the local PDF):

```bash
npx serve .
# or with Python:
python -m http.server 4173
```

---

## 📬 Connect

- **Email:** karmakarsubham194@gmail.com
- **LinkedIn:** [linkedin.com/in/subham-karmakar](https://linkedin.com/in/subham-karmakar)
- **GitHub:** [github.com/Subham675](https://github.com/Subham675)
