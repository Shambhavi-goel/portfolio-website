# Shambhavi Goel — Personal Portfolio

A modern, interactive personal portfolio website built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## ✨ Features

- **Dark / Light mode** toggle with localStorage persistence
- **Particle hero background** (tsParticles — lazy-loaded, 60fps capped)
- **Typewriter animation** cycling through roles (react-type-animation)
- **Filterable project cards** by tag (Mobile / Web / AI-ML / Blockchain)
- **Animated vertical timeline** for education
- **Scroll-triggered reveal animations** (Framer Motion `whileInView`)
- **Glassmorphism cards** with hover glow and lift effects
- **Contact form** via Formspree (no backend required)
- **Fully responsive** — mobile-first across all breakpoints
- **SEO-ready** — Open Graph, Twitter card, meta tags

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 📁 Key Files to Personalise

| File | What to do |
|------|-----------|
| `public/resume.pdf` | **Add your resume PDF here** (currently a placeholder link) |
| `public/profile.jpg` | **Add your profile photo** and update `components/About.tsx` |
| `components/Contact.tsx` | Replace `YOUR_FORM_ID` in `FORMSPREE_ENDPOINT` with your Formspree form ID |
| `lib/data.ts` | All your bio data — projects, skills, education, certs |
| `app/layout.tsx` | Update the Open Graph `url` to your Vercel/custom domain |

### Setting up the profile photo

In `components/About.tsx`, find the placeholder comment and replace with:

```tsx
<Image src="/profile.jpg" alt="Shambhavi Goel" fill className="object-cover" />
```

### Setting up Formspree (Contact Form)

1. Sign up at [formspree.io](https://formspree.io) (free)
2. Create a new form → copy the **form ID** (e.g., `xpzgjwqr`)
3. In `components/Contact.tsx`, replace:
   ```ts
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
   ```
   with your actual endpoint.

---

## 🏗️ Project Structure

```
portfolio-website/
├── app/
│   ├── layout.tsx         # Root layout — SEO, fonts, ThemeProvider
│   ├── page.tsx           # Assembles all sections
│   └── globals.css        # Design system: tokens, glass, buttons
├── components/
│   ├── Navbar.tsx         # Sticky nav with mobile drawer
│   ├── Hero.tsx           # Full-viewport hero with particles
│   ├── About.tsx          # Bio + highlight cards
│   ├── Education.tsx      # Animated timeline
│   ├── Skills.tsx         # Grouped skill bars + chip cloud
│   ├── Projects.tsx       # Filterable project grid
│   ├── Certifications.tsx # Awards + cert badges + stats
│   ├── Contact.tsx        # Formspree contact form
│   ├── Footer.tsx         # Nav, socials, copyright
│   ├── ThemeProvider.tsx  # Dark/light context
│   └── ui/
│       ├── SectionWrapper.tsx    # Framer Motion scroll-reveal wrapper
│       ├── ThemeToggle.tsx       # Animated sun/moon toggle
│       └── ParticleBackground.tsx # tsParticles hero background
├── lib/
│   └── data.ts            # All content data (single source of truth)
├── public/
│   ├── resume.pdf         # ← ADD YOUR RESUME HERE
│   └── profile.jpg        # ← ADD YOUR PHOTO HERE
└── tailwind.config.ts     # Design tokens, animations
```

---

## 🌐 Deployment (Vercel)

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo
3. Leave defaults (Next.js auto-detected) → **Deploy**
4. For a custom domain: **Project Settings → Domains → Add Domain**

```bash
# Build for production (optional local check)
npm run build
npm run start
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary accent | `#7C3AED` (violet) |
| Secondary accent | `#A78BFA` (light violet) |
| Tertiary | `#06B6D4` (cyan) |
| Dark background | `#0F0F1A` |
| Card surface | `#1A1A2E` |
| Font — Heading | Space Grotesk |
| Font — Body | Inter |

---

## 📄 License

MIT — feel free to use and adapt.

---

*Built with ❤️ using Next.js, Tailwind CSS & Framer Motion.*
