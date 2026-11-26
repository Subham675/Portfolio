# Subham Karmakar — Developer Portfolio

Personal portfolio website for **Subham Karmakar** (`.NET Developer`), designed with a warm-paper & obsidian bento layout, electric lime (`#C8F560`) accents, sticky-stacking project cards, and a streamlined resume & developer essentials section.

---

## ✨ Features

- **Light & Dark Theme Toggle** — Persists preference in `localStorage`, respects system theme, syncs mobile `<meta name="theme-color">`, and transitions with a circular View Transitions wipe.
- **Hero & Bento Overview** — Live India (`IST / UTC+5:30`) clock pill, animated stat counters, grouped tech stack chips, and an infinite tech marquee strip.
- **Sticky-Stacking Work Cards** — Scroll-driven scale & dim progression across 6 featured builds:
  - **CityHangAround** *(Honeybee Digital Internship · Laravel → Next.js migration)*
  - **Issue-Tracker** *(ASP.NET Core MVC `.NET 10`, EF Core, LINQ, SQL Server, Razor, Bootstrap)*
  - **Myra — AI Voice Assistant** *(Python, LiveKit, Google Realtime API, `asyncio`)*
  - **Advanced PHP Online Quiz App** *(PHP, MySQL, Google Gemini API, 11-table relational schema)*
  - **Terminal 1** *(Fine Dining & Table Reservation Platform · PHP MVC, Razorpay, Google OAuth 2.0, Docker, PHPUnit)*
  - **CommonGround · Local** *(Classifieds Marketplace · Laravel 11 MVC, Breeze Auth, Eloquent ORM, Tailwind CSS, AJAX)*
- **Resume & Developer Essentials** — Direct one-click download for [Subham karmakar Resume.docx](./assets/Subham%20karmakar%20Resume.docx), alongside a compact bento grid covering engineering focus, extended databases/AI tools, academic credentials, and quick contact links.
- **Day/Night Animated Skyline Footer** — Custom SVG Cooch Behar rooftop & heritage skyline that switches sun/moon, stars, and lit windows between Light and Dark modes.

---

## 📂 Project Structure

```text
Portfolio/
├── index.html                           # Main semantic HTML page & SEO/JSON-LD metadata
├── vercel.json                          # Vercel static hosting configuration
├── .gitignore
├── README.md
└── assets/
    ├── Subham karmakar Resume.docx      # Downloadable updated Word resume
    ├── css/
    │   └── main.css                     # Theme tokens, bento grid, cards, animations
    ├── js/
    │   └── main.js                      # Theme wipe, clock, stack progress, clipboard helper
    └── images/
        ├── favicon.svg
        ├── hero-portrait.jpg
        ├── about-evening.jpg
        ├── about-night.jpg
        ├── avatar-suit.jpg
        └── projects/
            ├── cityhangaround.png
            ├── cityhangaround-nextjs.png
            ├── issue-tracker.png
            ├── myra.jpg
            ├── quiz-app.jpg
            ├── terminal1.jpg
            └── marketplace.png
```

---

## 🚀 Deploy Free on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Import **`Subham675/Portfolio`**.
3. Keep **Framework Preset** set to **Other** (zero build step needed) and click **Deploy**.
4. `vercel.json` automatically enables `cleanUrls` for clean static routing.

---

## 💻 Local Preview

Run any static HTTP server from the repository root:

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
