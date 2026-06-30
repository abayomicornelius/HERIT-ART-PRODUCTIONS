# HERIT ART PRODUCTIONS

**The Central Home for African Creativity.**

HERIT ART PRODUCTIONS (H.ART) is a Nigerian creative powerhouse that merges Theatre, Film, Music, and Social Impact into one unified platform. From original stage productions to world-class recording studios, from an open creative network to professional equipment rentals — H.ART exists to tell African stories with excellence and purpose.

---

## Table of Contents

- [About](#about)
- [Platform Features](#platform-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Design System](#design-system)
- [Services](#services)
- [Connect With Us](#connect-with-us)

---

## About

HERIT ART PRODUCTIONS was built on the belief that African creative professionals deserve a platform as ambitious as the stories they tell. We don't just produce content — we build infrastructure for a creative generation.

**Our pillars:**

| Pillar | What We Do |
|--------|-----------|
| 🎭 Theatre | Original stage productions, classical and contemporary |
| 🎬 Film | Independent film production and direction |
| 🎵 Music | Recording, mixing, mastering, live performance |
| 🌍 Social Impact | Community programmes, outreach, and education through art |

---

## Platform Features

### Public-Facing

| Feature | Description |
|---------|-------------|
| **Productions** | Browse and book tickets for upcoming theatre, film and concert productions |
| **Events** | Discover featured events and past shows with full details |
| **H.ART Studios** | View and book world-class studio spaces — rehearsal rooms, recording booths, creative suites |
| **H.ART Audio** | Book audio production services — recording, mixing, mastering, film scoring, sound design |
| **Creative Network** | Discover and connect with vetted African creative professionals (actors, directors, composers, dancers, writers and more) |
| **Creative Services** | Explore the full range of creative services H.ART offers to brands and individuals |
| **Equipment Rentals** | Rent professional-grade cameras, lighting rigs, sound equipment, and staging gear by the day |
| **Costume House** | Browse and reserve period and contemporary costumes for productions, events and shoots |
| **H.ART Academy** | Masterclasses and workshops led by Africa's top creative professionals |
| **Pricing** | Transparent, tiered pricing for every division — Creative Agency, Studios, Audio, Academy, and Network |
| **Blog** | News, announcements, and stories from the H.ART community |
| **Contact** | Multiple ways to reach the H.ART team |

### Platform Dashboards

| Dashboard | Users |
|-----------|-------|
| **Admin** | Manage users, productions, events, payments, bookings, costumes, rentals, studios and pricing |
| **Production Company** | Manage brand partnerships, creative projects, team members, and analytics |
| **Brand** | Create and review content projects, manage team, track subscription |
| **User** | My bookings, tickets, projects, payment history, notifications, and profile |

### Animations & UX

- Scroll-reveal entrance animations powered by `IntersectionObserver`
- Floating particle backgrounds and ambient glow orbs throughout hero sections
- Shimmer hover effects on every card (`shimmer-card`)
- Animated gradient text on key headings
- Staggered section entrances with configurable delay classes
- Ripple effect on call-to-action buttons
- Mouse-tracking radial glow on the homepage hero
- Dark / Light mode toggle (persisted preference)
- Redesigned navbar with collapsible "More" dropdown, animated gold underline indicator, and glassy backdrop blur

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 18](https://react.dev/) |
| Build Tool | [Vite 5](https://vitejs.dev/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| Routing | [React Router DOM 6](https://reactrouter.com/) |
| CSS Variables | Custom design tokens (`--hap-bg`, `--ink`, `--gold`, etc.) |
| Animations | Custom Tailwind keyframes + CSS utility classes |
| Icons / Emoji | Native emoji (no external icon library dependency) |
| Auth | Context-based auth with role gating (admin / production / brand / user) |
| State | React `useState` + `useContext` — no external state library |

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/abayomicornelius/HERIT-ART-PRODUCTIONS.git

# Navigate into the project
cd HERIT-ART-PRODUCTIONS

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production (outputs to /dist)
npm run preview   # Preview the production build locally
```

---

## Project Structure

```
HERIT-ART-PRODUCTIONS/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── PublicLayout.jsx       # Navbar, footer, theme toggle
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── UserLayout.jsx
│   │   │   ├── ProductionLayout.jsx
│   │   │   └── BrandLayout.jsx
│   │   └── ui/
│   │       ├── Modal.jsx
│   │       ├── StarRating.jsx
│   │       ├── Badge.jsx
│   │       └── TagsInput.jsx
│   ├── context/
│   │   ├── AuthContext.jsx            # Auth state, login, logout, roles
│   │   ├── ThemeContext.jsx           # Dark / light mode
│   │   └── ToastContext.jsx           # Global toast notifications
│   ├── data/
│   │   ├── productions.js
│   │   ├── studios.js
│   │   ├── audioServices.js
│   │   ├── creatives.js
│   │   ├── rentals.js
│   │   ├── costumes.js
│   │   ├── pricing.js
│   │   ├── reviews.js
│   │   ├── payments.js
│   │   ├── notifications.js
│   │   └── mockData.js
│   ├── hooks/
│   │   └── useScrollReveal.js         # IntersectionObserver scroll animations
│   ├── pages/
│   │   ├── public/                    # All public-facing pages
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Productions.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Studios.jsx
│   │   │   ├── AudioServices.jsx
│   │   │   ├── CreativeNetwork.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Rentals.jsx
│   │   │   ├── Costumes.jsx
│   │   │   ├── Academy.jsx
│   │   │   ├── Pricing.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Blog.jsx
│   │   ├── auth/                      # Sign in, Sign up, Forgot password
│   │   ├── admin/                     # Admin dashboard pages
│   │   ├── user/                      # User portal pages
│   │   ├── production/                # Production company portal
│   │   └── brand/                     # Brand partner portal
│   ├── App.jsx                        # Route definitions
│   ├── main.jsx
│   └── index.css                      # Tailwind imports + animation utilities
├── tailwind.config.js                 # Custom tokens, keyframes, animations
├── vite.config.js
├── package.json
└── README.md
```

---

## Pages & Routes

### Public Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About HERIT ART |
| `/productions` | Productions list |
| `/productions/:id` | Production detail |
| `/events` | Events |
| `/events/:id` | Event detail |
| `/studios` | H.ART Studios |
| `/studios/book/:id` | Studio booking |
| `/audio` | H.ART Audio Services |
| `/network` | Creative Network |
| `/network/:id` | Creative profile |
| `/network/register` | Join as a Creative |
| `/services` | Creative Services |
| `/rentals` | Equipment Rentals |
| `/costumes` | Costume House |
| `/academy` | H.ART Academy |
| `/pricing` | Pricing |
| `/blog` | Blog |
| `/contact` | Contact |
| `/search` | Search |

### Auth Routes

| Route | Page |
|-------|------|
| `/signin` | Sign In |
| `/signup` | Sign Up |
| `/forgot-password` | Forgot Password |

### Dashboard Routes (role-protected)

| Route | Role |
|-------|------|
| `/admin` | Admin |
| `/dashboard` | User |
| `/production/dashboard` | Production Company |
| `/brand/dashboard` | Brand Partner |

---

## Design System

### Color Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--hap-bg` | `#0a0a0a` (dark) / `#f9f6f0` (light) | Page background |
| `--gold` | `#c9a84c` | Primary brand accent |
| `--gold-hover` | `#d4b866` | Hover state |
| `--hap-surface` | `#111111` | Card backgrounds |
| `--ink` | `255 255 255` (dark) / `10 10 10` (light) | Text |

### Custom Animation Classes

```css
.shimmer-card       /* Card with sweep shimmer on hover */
.glow-border        /* Animated gold border glow */
.text-gold-animate  /* Animated gradient gold text */
.tilt-card          /* Perspective tilt on hover */
.ripple-btn         /* Material-style ripple on click */
.particle           /* Floating ambient particle */
```

### Scroll Reveal

Add `data-reveal` to any element to have it animate in when scrolled into view. Pair with `.delay-100` through `.delay-800` for staggered entrances.

```jsx
<div data-reveal className="delay-200">...</div>
```

---

## Services

### Creative Agency
Full-service creative agency for brands and individuals — brand identity, campaign strategy, content production, social media management, event activation.

### H.ART Studios
State-of-the-art rehearsal and creative studio spaces available for hourly and daily booking. Equipped with professional lighting, sound, mirrors, and green room facilities.

### H.ART Audio
Professional audio production services including:
- Recording sessions (vocals, instruments, podcast)
- Mixing & mastering
- Film and TV scoring
- Theatre music composition
- Sound design
- Jingle and commercial audio

### Equipment Rentals
Camera systems, lighting rigs, audio equipment, staging, and more — daily rental with delivery options available.

### Costume House
Extensive wardrobe collection spanning historical periods, contemporary fashion, theatrical, and cultural attire. Available for film, theatre, events, and editorial shoots.

### H.ART Academy
Launching Q1 2027. Professional masterclasses and workshops led by Africa's foremost creative practitioners across Acting, Cinematography, Film Scoring, Scriptwriting, Dance, and Photography.

---

## Connect With Us

| Platform | Link |
|----------|------|
| 🌐 Website | [heritartproductions.com](https://linktr.ee/heritartproductions) |
| 📸 Instagram | [@heritartproductions](https://www.instagram.com/heritartproductions) |
| ▶️ YouTube | [@herit_artproduction](https://youtube.com/@herit_artproduction) |
| 🎵 TikTok | [@herit.art.production](https://www.tiktok.com/@herit.art.production) |
| 𝕏 Twitter / X | [@art_herit55305](https://x.com/art_herit55305) |
| 📘 Facebook | [heritartproductions](https://www.facebook.com/heritartproductions) |
| 💬 WhatsApp | [+234 806 122 5812](https://wa.me/2348061225812) |
| 🧵 Threads | [@heritartproductions](https://www.threads.com/@heritartproductions) |

---

## License

© 2026 HERIT ART PRODUCTIONS. All rights reserved.

This codebase is proprietary. No part of this project may be reproduced, distributed, or transmitted in any form without the prior written permission of HERIT ART PRODUCTIONS.
