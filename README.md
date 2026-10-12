<div align="center">

# ⚡ GATE-Pace: 90-Day PSU Velocity Engine

### *The High-Retention Daily Execution Cockpit & Study OS for GATE CS & IT / DA Aspirants*

[![Next.js](https://img.shields.io/badge/Next.js-16.4.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-State_&_Offline_Persist-orange?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![Target: GATE 2027](https://img.shields.io/badge/Target-IIT_Madras_GATE_2027-teal?style=for-the-badge)](https://gate2027.iitm.ac.in)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMangeshlawande%2FGate-prep&root-directory=gate-pace)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

**GATE-Pace** is an offline-first, production-grade Progressive Web Application (PWA) and preparation framework tailored specifically for Computer Science & Information Technology (CS & IT) and Data Science & AI (DA) aspirants targeting a **Top 100 All India Rank (AIR)** and **PSU recruitment** (IOCL, ONGC, NTPC, BARC, ISRO, DRDO, POSOCO).

It eliminates manual friction and cognitive overload by unifying hourly study tracking, precision per-question PYQ pacing stopwatches, a structured mistake diary with cognitive error taxonomy, an interactive formula flashcard vault, and an embedded hybrid **Graph-RAG AI Guide Bot**.

[Explore Features](#-key-features) • [Quick Start](#-quick-start--installation) • [Deploy to Vercel](#-deploy-to-vercel) • [Architecture](#-architecture--project-structure) • [GATE 2027 Overview](#-official-gate-2027-intel) • [Roadmap Blueprint](#-90-day-study-architecture)

</div>

---

## 📑 Table of Contents

- [Vision & The Core Problem](#-vision--the-core-problem)
- [Key Features](#-key-features)
  - [1. Daily Command Center & 90-Day Matrix](#1-daily-command-center--90-day-matrix)
  - [2. Precision Timers & PYQ Question Pacer](#2-precision-timers--pyq-question-pacer)
  - [3. Structured Mistake Diary (Cognitive Taxonomy)](#3-structured-mistake-diary-cognitive-taxonomy)
  - [4. Hybrid Graph-RAG AI Study Guide Bot](#4-hybrid-graph-rag-ai-study-guide-bot)
  - [5. Interactive Formula Vault & Flashcard Deck](#5-interactive-formula-vault--flashcard-deck)
  - [6. Resource Hub & Rich Markdown Notes](#6-resource-hub--rich-markdown-notes)
  - [7. Analytics & Velocity Engine](#7-analytics--velocity-engine)
  - [8. Official GATE 2027 Portal & Syllabus Explorer](#8-official-gate-2027-portal--syllabus-explorer)
  - [9. Automated PDF Roadmap Generator](#9-automated-pdf-roadmap-generator)
- [90-Day Study Architecture](#-90-day-study-architecture)
- [Official GATE 2027 Intel & Weightages](#-official-gate-2027-intel)
- [Architecture & Project Structure](#-architecture--project-structure)
- [Tech Stack](#-tech-stack)
- [Quick Start & Installation](#-quick-start--installation)
- [Deploy to Vercel](#-deploy-to-vercel)
- [Keyboard Shortcuts & Pro Tips](#-keyboard-shortcuts--pro-tips)
- [Data Privacy & Offline Vault](#-data-privacy--offline-vault)
- [Contributing & License](#-contributing--license)

---

## 🎯 Vision & The Core Problem

Standard GATE preparation routinely breaks down due to three silent killers:
1. **Unpaced Question Solving**: Spending 10+ minutes on a single 1-mark question without realizing it destroys real-exam simulation.
2. **Superficial Error Analysis**: Marking a question as "wrong" without diagnosing *why* (calculation blunder vs. edge-case blindspot vs. conceptual flaw) ensures the mistake recurs on exam day.
3. **Passive Revision**: Re-reading notes instead of high-frequency spaced repetition and formula retrieval drills.

**GATE-Pace solves this through strict operational discipline:**
- A non-negotiable **7.5 hours/day, 3-block daily schedule**.
- Built-in **2:00 min pacing warnings** and **3:30 min circuit-breakers** for practice questions.
- A **Mistake Diary** requiring **2 consecutive correct re-attempts** to close an error ticket.
- High-contrast **Cyber-Focus** dark & crisp light themes with gamified rank tiers and soundscapes (40Hz Gamma wave, White noise, Brown noise).

---

## ✨ Key Features

### 1. Daily Command Center & 90-Day Matrix
- **Seamless Timeline Navigation**: Jump to any day (Day 1 to 90) or any specific calendar date using instant navigation or `[J]` / `[K]` keyboard shortcuts.
- **3-Block Daily Architecture**:
  - **Block 1 (07:00 – 10:00)**: Deep Concept Breakdown (Core Tech).
  - **Block 2 (11:30 – 14:00)**: Timed PYQ Drills (Target: 20–25 quality questions).
  - **Block 3 (17:00 – 19:00)**: Engineering Math, General Aptitude & Mistake Diary Scrub.
- **Dynamic Task Cockpit**: 3-state task toggles (`[TODO]`, `[ACTIVE]`, `[DONE]`), real-time completion progress meters, and dynamic sync with the user profile rank badge.
- **Embedded Daily Blueprint**: Direct hourly breakdown embedded into the tasks view for zero-context-switch execution.

### 2. Precision Timers & PYQ Question Pacer
- **Dual Timer Suite**:
  - **Session Stopwatch & Pomodoro Timer**: Circular progress, interval breaks, and automated activity logging.
  - **PYQ Per-Question Pacer**:
    - 🔔 *Pacing Alert (2:00 mins)*: Audio-visual warning to maintain target CBT speed.
    - ⚠️ *Circuit-Breaker (3:30 mins)*: Hard alert instructing the candidate to flag and move on.
    - Quick 1-click outcome tagging: `Correct First Try`, `Correct Slow`, `Incorrect`, or `Stuck`.
- **Activity Work Log**: Automatic timeline of "What I did & When" with block tags, subjects, and personal reflections.

### 3. Structured Mistake Diary (Cognitive Taxonomy)
Instead of generic notes, every blunder is categorized under a 5-dimension cognitive error taxonomy:
- 🧮 **Calculation / Arithmetic**: Overflow, sign errors, precision truncation, virtual calculator slips.
- 👓 **Misread Question**: Missed "NOT", "FALSE", unit mismatches (KB vs Kb), 0-indexed vs 1-indexed.
- 👁️ **Edge Case Blindspot**: Null pointer, empty graph, single-node tree, base case omissions, cycle detection.
- 💡 **Conceptual Gap**: Misunderstanding theorem preconditions, algorithm complexity constraints.
- ⏳ **Time Pressure**: Rushing in the last 20 seconds.
- **Remediation Protocol**: Mistakes stay open until successfully resolved twice in fresh attempts.
- **Root-Cause Visual Analytics**: Real-time distribution chart showing exactly where marks are bleeding.

### 4. Hybrid Graph-RAG AI Study Guide Bot
Located at `/bot`, the embedded AI Mentor combines:
- **Vector Database**: In-memory semantic embeddings over core GATE CS concepts, algorithms, and theorems.
- **Knowledge Graph Database**: Nodes representing concepts, prerequisites, related subjects, and high-yield questions with bi-directional relationship traversal.
- **Rich Markdown Engine**: Streams responses formatted with hierarchical headings, alert callouts, syntax-highlighted code blocks, and direct GateOverflow/NPTEL reference links.

### 5. Interactive Formula Vault & Flashcard Deck
- Complete, curated cheat sheets covering all 10 core subjects + Engineering Mathematics (Master Theorem, AMAT/EMAT memory hierarchy formulas, Paging & TLB equations, Graph theory bounds, Relational algebra & Normal forms, etc.).
- **Interactive Flashcard Mode**: Flip cards for rapid active recall and daily memory drills.

### 6. Resource Hub & Rich Markdown Notes
- Curated directory of official resources, including GateOverflow links, NPTEL course maps, standard textbooks, and the official TCS Virtual Calculator simulator.
- In-app **Markdown Notes Editor** with code syntax support, tag filtering, and instant "Starred ⭐" pins.

### 7. Analytics & Velocity Engine
- **Study Hours Burn-Down**: Planned vs. actual daily study hours.
- **Taxonomy Accuracy Matrix**: Granular accuracy tracking across `MCQ` (Multiple Choice), `MSQ` (Multiple Select), and `NAT` (Numerical Answer Type) questions.
- **Gamification & Ranks**:
  - Continuous study streak tracking with freeze protection.
  - Rank hierarchy progression: *Aspirant* ➔ *Top 1000* ➔ *PSU Contender* ➔ *AIR 1 Apex Titan*.
  - Celebratory confetti effects (`canvas-confetti`) and synthesized Web Audio chime on block completions.
  - Ambient focus audio generators (40Hz Gamma wave, White noise, Brown noise).

### 8. Official GATE 2027 Portal & Syllabus Explorer
- **IIT Madras Organizing Institute Intel**: Exam dates (Feb 6–21, 2027), 3-Hour CBT format, 65 questions, 100 marks.
- **Marking Scheme Details**:
  - MCQ: 1 mark (-0.33) & 2 marks (-0.66) negative marking.
  - MSQ: No negative marking, zero partial marks.
  - NAT: No negative marking, strict numerical entry.
- **Subject-Wise Weightages & High-Yield Questions**: Sample questions with detailed solutions, common exam traps, and direct search hooks to GateOverflow & Google.

### 9. Automated PDF Roadmap Generator
- Includes `generate_gate_plan.py` — a Python automation script using ReportLab to render a clean, high-resolution printable PDF roadmap (`GATE_CS_90Day_PSU_Roadmap.pdf`).

---

## 📅 90-Day Study Architecture

The curriculum is distributed into three cohesive 30-day tactical phases:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       GATE 90-DAY PSU VELOCITY TIMELINE                     │
└─────────────────────────────────────────────────────────────────────────────┘

 Phase 1: Days 1 – 30          Phase 2: Days 31 – 60         Phase 3: Days 61 – 90
 ┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
 │   CORE FOUNDATION    │      │  SYSTEMS & THEORY    │      │   WAR ROOM MOCKS     │
 │                      │      │                      │      │                      │
 │ • C Programming & DS │ ───► │ • Operating Systems  │ ───► │ • Full Length CBTs   │
 │ • Algorithms & Comps │      │ • Computer Networks  │      │ • NAT Accuracy Drills│
 │ • Discrete Math      │      │ • DBMS & SQL/Txns    │      │ • Mistake Scrubbing  │
 │ • Digital Logic      │      │ • Theory of Comput.  │      │ • Speed Pacing       │
 │ • Engg Math & Apti   │      │ • Compiler Design    │      │ • Formula Retention  │
 └──────────────────────┘      └──────────────────────┘      └──────────────────────┘
   Daily Target: 20 Qs           Daily Target: 25 Qs           Daily Target: 35+ Qs
```

### Daily 3-Block Schedule Breakdown

| Block | Time Window | Focus Area | Deliverables |
|:---|:---|:---|:---|
| **Block 1: Morning** | `07:00 – 10:00` (3.0h) | Core Technical Concept Breakdown | Theory mastery, standard textbook problems, code implementation. |
| **Block 2: Afternoon** | `11:30 – 14:00` (2.5h) | Timed PYQ Drills | 20–25 PYQs with question-level stopwatch timer and pacing alerts. |
| **Block 3: Evening** | `17:00 – 19:00` (2.0h) | Math, Aptitude & Error Scrub | Engg Mathematics, Verbal/Numerical Aptitude, and Mistake Diary analysis. |

---

## 📊 Official GATE 2027 Intel & Weightages

Organized by **Indian Institute of Technology Madras (IIT Madras)**:

| Subject | Weightage (Marks) | Key Focus Topics |
|:---|:---:|:---|
| **General Aptitude** | **15%** (15 Marks) | Verbal ability, quantitative reasoning, spatial aptitude, data interpretation |
| **Engineering Mathematics** | **13%** (13 Marks) | Linear algebra (eigenvalues, rank), calculus, probability & distributions |
| **Discrete Mathematics** | **~8%** (8 Marks) | Propositional logic, sets & relations, combinatorics, graph theory |
| **Programming & Data Structures** | **~10-12%** (11 Marks) | C pointers, recursion, stacks/queues, trees (BST, AVL), heaps, hashing |
| **Algorithms** | **~8-10%** (9 Marks) | Asymptotic analysis, divide & conquer, greedy, dynamic programming, graphs |
| **Theory of Computation** | **~8-10%** (9 Marks) | DFA/NFA minimization, regular expressions, CFL/PDA, pumping lemma, Turing machines, undecidability |
| **Operating Systems** | **~8-10%** (9 Marks) | CPU scheduling, semaphores & synchronization, deadlocks, virtual memory & paging |
| **Computer Networks** | **~7-9%** (8 Marks) | IP addressing & CIDR, TCP flow/congestion control, routing algorithms, sliding window protocols |
| **Databases (DBMS)** | **~7-8%** (8 Marks) | ER diagrams, relational algebra, SQL, normalization (BCNF/3NF), ACID transactions & serializability |
| **Computer Organization & Arch.** | **~8-9%** (8 Marks) | Pipelining & hazards, cache mapping (direct/set-associative), memory hierarchy, addressing modes |
| **Digital Logic** | **~4-6%** (5 Marks) | Boolean minimization (K-Maps), combinational circuits (mux/demux), sequential circuits (flip-flops, counters) |
| **Compiler Design** | **~4-5%** (5 Marks) | Lexical analysis, LL(1) / LR parsers, syntax-directed translation (SDT), intermediate code generation |

---

## 📁 Architecture & Project Structure

The project is structured with a root package proxying into the Next.js application in `gate-pace`, alongside standalone Python roadmap generation scripts and official syllabus reference assets:

```text
GATE/
├── package.json                   # Root orchestrator scripts (npm run dev/build/start)
├── FEATURES.md                    # Exhaustive feature verification & implementation checklist
├── plan.md                        # Master architectural blueprint & design specifications
├── generate_gate_plan.py          # Standalone ReportLab Python script for PDF roadmap generation
├── GATE_CS_90Day_PSU_Roadmap.pdf  # Generated 90-Day visual roadmap PDF
├── cs_gate2027_syllabus.pdf       # Official IIT Madras CS syllabus
├── DA_gate_syllabus.pdf           # Official Data Science & AI syllabus
├── GA_GATE2027_Syllabus.pdf       # Official General Aptitude syllabus
├── GATE2027-IB.pdf                # Official Information Brochure
├── gate-pace/                     # Next.js 16 Web Application
│   ├── package.json               # Next.js dependencies & scripts
│   ├── tsconfig.json              # TypeScript configuration
│   ├── next.config.ts             # Next.js configuration
│   ├── public/                    # Static assets & icons
│   └── src/
│       ├── app/
│       │   ├── page.tsx           # Home: GATE 2027 Portal & Overview
│       │   ├── syllabus/page.tsx  # Syllabus Explorer & Topic Directory
│       │   ├── tasks/page.tsx     # Daily Command Center & 90-Day Blueprint
│       │   ├── dashboard/page.tsx # Analytics, Timers, Mistake Diary & Formulas
│       │   ├── bot/page.tsx       # Hybrid Graph-RAG AI Guide Bot
│       │   ├── plan/page.tsx      # Comprehensive 90-Day Plan Viewer
│       │   ├── layout.tsx         # Root layout with Navbar & theme provider
│       │   └── globals.css        # Tailwind CSS v4 design tokens
│       ├── components/
│       │   ├── Navbar.tsx         # Responsive navigation & dynamic status badge
│       │   ├── CommandCenter.tsx  # Daily task management & block timelines
│       │   ├── PrecisionTimer.tsx # Stopwatch, Pomodoro & activity logger
│       │   ├── PYQDrillLogger.tsx # Question timer with 2:00/3:30 pacing alerts
│       │   ├── MistakeDiary.tsx   # 5-Taxonomy blunder logger & remediation engine
│       │   ├── FormulaVault.tsx   # Interactive cheat sheets & flashcards deck
│       │   ├── ResourcesHub.tsx   # Curated links & in-app Markdown notes editor
│       │   ├── AnalyticsDashboard.tsx # Burn-down charts, accuracy & rank telemetry
│       │   ├── Gate2027Portal.tsx # Weightages, taxonomy & sample questions
│       │   ├── GateBot.tsx        # Graph-RAG conversational AI interface
│       │   ├── MarkdownMessage.tsx# Formatted markdown renderer for AI responses
│       │   ├── RoadmapView.tsx    # Visual milestone timeline
│       │   └── WeeklyPlanView.tsx # Week-by-week subject distribution
│       ├── store/
│       │   └── gateStore.ts       # Zustand offline-first persistent store
│       ├── lib/
│       │   ├── botEngine.ts       # Query processor uniting vector & graph queries
│       │   ├── vectorDb.ts        # Embedded in-memory semantic vector store
│       │   ├── graphDb.ts         # In-memory concept knowledge graph
│       │   └── knowledgeBase.ts   # Core GATE concepts & reference data
│       ├── data/
│       │   ├── gate2027Info.ts    # Official dates, patterns, weightages & traps
│       │   ├── curriculum.ts      # 90-day pre-seeded curriculum & questions
│       │   ├── formulaDeck.ts     # Subject-by-subject formula revision deck
│       │   ├── resources.ts       # GateOverflow, NPTEL & textbook links
│       │   └── phaseWeeklyBlueprint.ts # Detailed phase milestones
│       └── utils/
│           ├── audio.ts           # Synthesized Web Audio alerts & soundscapes
│           └── confetti.ts        # Celebration confetti triggers
```

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
|:---|:---|:---|
| **Framework** | **Next.js 16 (App Router)** | Modern React server & client components with turbopack bundling |
| **UI Library** | **React 19** | Concurrent rendering, latest hooks & actions |
| **Styling** | **Tailwind CSS v4** | Modern CSS engine with custom neon cyber-focus color palette |
| **State & Storage** | **Zustand 5 (`persist`)** | Offline-first reactive state saved directly to browser LocalStorage |
| **Icons** | **Lucide React** | Clean, high-density SVG icon collection |
| **Visual Effects** | **Canvas Confetti** | Multi-vector particle confetti on task and block completions |
| **Audio Synthesis** | **Web Audio API** | Zero-asset in-browser tone generation for alerts, 40Hz gamma & noise |
| **AI Architecture** | **In-Memory Graph-RAG** | Custom Vector Database + Knowledge Graph relationship traversal |
| **Automation** | **Python 3 & ReportLab** | Script-driven high-resolution PDF roadmap generation |

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js**: `v18.18.0` or higher (Node 20+ recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`
- *(Optional)* **Python 3.10+**: If regenerating PDF roadmaps via `generate_gate_plan.py`

### 1. Clone the Repository
```bash
git clone git@github.com:Mangeshlawande/Gate-prep.git
cd Gate-prep
```

### 2. Install Dependencies
You can install dependencies directly from the root:
```bash
npm install --prefix gate-pace
```
Or navigate into the web application folder:
```bash
cd gate-pace
npm install
```

### 3. Run the Development Server
From the repository root:
```bash
npm run dev
```
Or from within `gate-pace`:
```bash
cd gate-pace
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

### 5. Generate the PDF Roadmap (Optional)
```bash
python3 -m venv venv
source venv/bin/activate
pip install reportlab
python3 generate_gate_plan.py
```
This generates `GATE_CS_90Day_PSU_Roadmap.pdf` in the root folder.

---

## 🌐 Deploy to Vercel

### Option 1: 1-Click Deploy (Recommended)
Deploy directly to Vercel with preconfigured root directory settings:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMangeshlawande%2FGate-prep&root-directory=gate-pace)

---

### 🚀 Live Production Deployment
- **Live URL**: [https://gate-prep-alpha.vercel.app](https://gate-prep-alpha.vercel.app/)

---

Since the Next.js project is located in the `gate-pace/` subfolder, configure the **Root Directory** when importing:

1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **Add New...** ➔ **Project**.
3. Import your GitHub repository: `Mangeshlawande/Gate-prep`.
4. In the **Configure Project** screen:
   - **Framework Preset**: `Next.js` (detected automatically)
   - **Root Directory**: Click **Edit** and choose `gate-pace` ⚠️ *(Critical step)*
   - **Build & Output Settings**: Leave as default (`next build`, output `.next`)
   - **Environment Variables**: None required (100% offline-first client storage)
5. Click **Deploy**. Vercel will build and assign you a live `*.vercel.app` production URL!

---

### Option 3: Deploy via Vercel CLI

You can also deploy directly from your local terminal:

```bash
# 1. Install Vercel CLI globally
npm i -g vercel

# 2. Navigate to the web application folder
cd gate-pace

# 3. Deploy preview
vercel

# 4. Deploy production
vercel --prod
```

---

## ⌨️ Keyboard Shortcuts & Pro Tips

| Key Shortcut | Action | Where |
|:---|:---|:---|
| `[J]` | Move to **Previous Day** (Day $N-1$) | Tasks / Command Center |
| `[K]` | Move to **Next Day** (Day $N+1$) | Tasks / Command Center |
| `[Today]` | Instantly snap back to the current active calendar day | Tasks / Command Center |
| `[Theme Toggle]` | Switch between Cyber Dark and Crisp Light modes | Global Navbar |

> **Pro Tip for Pacing**: During PYQ drill sessions, start the question stopwatch immediately upon reading the problem statement. When you hear the soft beep at 2:00 mins, evaluate whether you are in the execution phase or stuck. If stuck at 3:30 mins, flag the question, hit **"Send to Mistake Diary"**, and move on.

---

## 🔒 Data Privacy & Offline Vault

- **100% Client-Side & Offline-Ready**: Your study hours, solved questions, task statuses, notes, and mistake diary entries are stored locally on your device using Zustand's persistent storage.
- **Data Vault (Backup & Restore)**:
  - Export your complete study progress as a single `.json` snapshot anytime from the **Analytics Dashboard** (`/dashboard`).
  - Import previous backups onto any new laptop or browser with one click — zero vendor lock-in, zero cloud dependency.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to add high-yield questions, update formula flashcards, enhance the AI knowledge graph, or improve the UI:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add AmazingFeature'`)
4. Push to the Branch (`git push origin feat/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

<div align="center">

**Built with focus and precision for GATE Computer Science aspirants.**  
*Aim High • Execute Daily • Secure the PSU / IIT Seat.*

</div>
