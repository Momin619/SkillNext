# SkillNext

A frontend career guidance app where users can explore career paths or get personalized recommendations based on their skills and preferences.

> ⚠️ Practice project — SkillNext is a fictional company, not a real service.

---

## Key Features

- Browse sectors, fields, and subfields manually
- Get career recommendations via a multi-step form
- Soft skill selection (Thinking, Working, Social)
- Weighted scoring algorithm for top 3 career matches
- Smooth page transitions and scroll animations
- Responsive dark-themed UI

---

## How It Works

There are **two ways** to explore careers:

**1. Manual Exploration** — Browse freely through the Sector List page:
`Sector List → Sector → Field → Subfield Detail`

**2. Career Form** — Fill a 5-step form with your preferences:
- Name & email
- Preferred sector & field
- Salary range and work style (Remote / On-site / Hybrid)
- Soft skills selection

The app scores each subfield using salary match (40%), work style (30%), skill overlap (20%), and field popularity (10%) — then shows your top 3 matches.

---

## Technologies Used

| Tool | Purpose |
|---|---|
| React 19 + Vite | Frontend framework and build tool |
| Tailwind CSS v4 + shadcn/ui + MUI | Styling and UI components |
| React Router DOM v7 | Client-side routing |
| Framer Motion + GSAP | Page and component animations |
| Three.js + React Three Fiber | 3D elements |
| React Hook Form | Multi-step form handling |
| Recharts | Data charts |
| Lenis | Smooth scroll |
| React Hot Toast | Success and error notifications |
| Vercel | Deployment |

---

## Getting Started

```bash
git clone https://github.com/momin619/skillnext.git
cd skillnext
npm install
npm run dev
```

---

## Folder Structure

```
src/
├── components/
    ├── About/        # About 
│   ├── Home/         # Hero, Features, Testimonials, WorkFlow
│   ├── Career/       # Sector, Fields, Subfield components
│   ├── CareerForm/   # Multi-step form + skill selection
│   └── ui/           # Navbar, Footer, Loader, PageTransition
├── pages/            # Page wrappers for each route
├── data/             # Sector/field/subfield JSON data
└── styles/           # Global CSS + Tailwind entry
```

---

🔗 Live Demo — [add your Vercel link here]
