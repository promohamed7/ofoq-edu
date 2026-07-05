# Ofoq Edu 🎓

A modern multilingual educational platform that helps students explore academic programs, professional diplomas, training courses, articles, and registration services through a responsive web experience.

This repository is participating in the **TestSprite Season 3 – Build the Loop Hackathon**, demonstrating a real AI-assisted development workflow powered by TestSprite verification loops.

---

# 🌐 Live Demo

https://ofoq-edu.vercel.app/

---

# 📌 Project Overview

Ofoq Edu is an educational platform designed to help students discover and enroll in educational programs through an intuitive Arabic-first experience.

The platform provides:

- Academic Programs
- Professional Diplomas
- Online Courses
- Educational Articles
- Registration Services
- Contact & Enrollment

---

# 🚀 Tech Stack

- HTML5
- CSS3
- JavaScript
- Tailwind CSS
- Vercel
- TestSprite CLI

---

# 🏗 Architecture

The project is deployed as a static website hosted on Vercel.

Project structure:

```
.
├── ar/
├── contact/
├── media/
├── static/
├── testsprite-plans/
├── LOOP.md
├── Phases.md
├── README.md
└── index.html
```

---

# 🧪 TestSprite Verification Workflow

This project follows a real engineering verification workflow instead of relying only on manual testing.

Every development cycle follows:

```
Plan
   ↓
Implement
   ↓
Code Review
   ↓
Verify (TestSprite)
   ↓
Root Cause Analysis
   ↓
Fix (if needed)
   ↓
Verify Again
   ↓
Update LOOP.md
```

The verification process is the core of this repository.

---

# ✅ Current Verification Coverage

Current TestSprite plans cover major user journeys including:

- Homepage Navigation
- About Page
- Courses
- Contact
- Accounts / Sign In
- Contact Form Validation

Additional verification scenarios are continuously added throughout development.

---

# 🤖 TestSprite Integration

The repository is integrated with the TestSprite CLI.

Each feature is validated using real cloud-based verification against the live deployment.

Typical workflow:

1. Implement a feature
2. Run TestSprite verification
3. Analyze failures
4. Fix the root cause
5. Verify again
6. Document the iteration

---

# 📖 Development Documentation

Project documentation includes:

- **README.md** — Project overview
- **Phases.md** — Development roadmap
- **LOOP.md** — Verification history
- **testsprite-plans/** — TestSprite verification plans

---

# 🚀 Local Development

Clone the repository:

```bash
git clone https://github.com/promohamed7/ofoq-edu.git
cd ofoq-edu
```

Serve the static site:

```bash
python -m http.server 8000
```

or

```bash
npx serve .
```

Then open:

```
http://localhost:8000
```

---

# 🧪 Running TestSprite

Install the CLI:

```bash
npm install -g @testsprite/testsprite-cli
```

Run a specific verification plan:

```bash
testsprite test run <TEST_ID> --wait
```

The project uses cloud-based verification against the deployed Vercel application.

---

# ⚙ GitHub Actions

GitHub Actions automatically execute the TestSprite verification workflow to help ensure application quality and prevent regressions.

---

# 🏆 TestSprite Season 3

This repository is developed as part of the **TestSprite Season 3 – Build the Loop Hackathon**.

The primary objective is not only delivering a working educational platform, but also demonstrating a professional engineering workflow based on:

- AI-assisted development
- Continuous verification
- Root cause analysis
- Iterative improvements
- Documented verification loops

Every successful verification cycle is documented in **LOOP.md**.