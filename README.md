# Ofoq Edu 🎓

A modern educational platform that helps students explore academic programs, courses, articles, and registration information through a responsive multilingual website.

---

## 🌐 Live Demo

**Website:** https://ofoq-edu.vercel.app/

---

## 📌 About the Project

Ofoq Edu is an educational platform designed to provide students with easy access to:

- Academic programs
- Professional diplomas
- Educational articles
- Registration information
- Contact and enrollment services

The project is deployed publicly and continuously verified using the TestSprite CLI as part of the TestSprite Season 3 Hackathon.

---

## 🚀 Tech Stack

- HTML
- CSS
- JavaScript
- Vercel (Hosting)
- TestSprite CLI

---

## 🧪 Verification Workflow

This project follows an iterative verification workflow instead of relying only on manual testing.

Each development cycle follows:

```
Write
   ↓
Verify (TestSprite)
   ↓
Analyze Failures
   ↓
Fix Root Cause
   ↓
Verify Again
```

All verification iterations are documented in:

```
LOOP.md
```

---

## 📂 Project Structure

```
.
├── ar/
├── contact/
├── media/
├── static/
├── testsprite-plans/
├── LOOP.md
├── index.html
└── README.md
```

---

## 🧪 Test Coverage

Current verification covers major user journeys including:

- Homepage navigation
- About page
- Courses
- Contact page
- Blog
- Login page

Additional verification scenarios are continuously added during development.

---

## 🔄 TestSprite Integration

This project uses the **TestSprite CLI** to verify real user flows against the deployed application.

Every completed feature is validated through the following process:

1. Implement feature
2. Run TestSprite verification
3. Investigate failures
4. Fix the root cause
5. Re-run verification
6. Document the iteration

---

## 📖 Development Log

All verification iterations and fixes are recorded in:

```
LOOP.md
```

---

## 🏆 TestSprite Season 3

This repository is being developed as part of the **TestSprite Season 3 – Build the Loop Hackathon**.

The focus of this submission is not only building the application, but also demonstrating a real engineering verification workflow using TestSprite.
