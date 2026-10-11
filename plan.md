Act as a Principal Full-Stack Engineer and Product Architect. Build a production-grade, offline-first Progressive Web Application (PWA) called "GATE-Pace: 90-Day PSU Velocity Engine" tailored specifically for GATE Computer Science aspirants.

### 1. Core Mission & Problem Statement
The app must track a strict 90-day, 3-block daily study schedule (7.5 hours/day) across 10 CS technical subjects, Engineering Mathematics, and General Aptitude. It must eliminate manual friction by unifying:
1. Hourly task tracking with interactive checklists.
2. A timed 20–25 PYQ performance logger.
3. A structured "Mistake Diary" categorized by cognitive error taxonomy.
4. Schedule velocity metrics (Ahead / On-Track / Behind).
5. Native local alarms/reminders.
6. A contextual AI mentor drawer that knows the user's current day, weak topics, and velocity.

---

### 2. Recommended Tech Stack
- Frontend: Next.js 15 (App Router, Server Components), TypeScript, Tailwind CSS v4, Lucide Icons.
- Component Library: shadcn/ui (Radix Primitives) with native Light/Dark theme switching (`next-themes`).
- State & Cache: Zustand (with `persist` middleware for local cache) + TanStack React Query.
- Visualizations: Recharts / Tremor for analytics and burn-down charts.
- Local Storage & Notifications: IndexedDB (via `idb` or `dexie.js`) for full offline support; Web Notification API + Service Worker for precise browser alarms.
- Backend & Database: Supabase / PostgreSQL with Prisma ORM (or local-first SQLite/Dexie sync).
- AI Engine: Vercel AI SDK (`ai/rsc`) integrating Claude 3.5 Sonnet / GPT-4o with streaming markdown support.

---

### 3. Detailed Data Models & Schema Design

#### `DayPlan` (Pre-seeded with 90 Days)
- `id`: string (UUID)
- `dayNumber`: integer (1 to 90)
- `phase`: enum ('CORE_FOUNDATION', 'SYSTEMS_AND_THEORY', 'WAR_ROOM_MOCKS')
- `title`: string
- `block1_focus`: string (e.g., "C Pointers, Memory Layout, Operator Precedence")
- `block2_pyqTarget`: integer (default: 25)
- `block3_eveningFocus`: string (e.g., "Quant: Ratios & Proportions | Error Scrub")
- `isCompleted`: boolean
- `completedAt`: timestamp (nullable)

#### `TaskItem`
- `id`: string
- `dayNumber`: integer
- `timeSlot`: enum ('BLOCK_1_MORNING', 'BLOCK_2_AFTERNOON', 'BLOCK_3_EVENING')
- `scheduledStartTime`: string ("07:00")
- `scheduledEndTime`: string ("10:00")
- `title`: string
- `isCompleted`: boolean
- `actualMinutesSpent`: integer

#### `PYQLog` (20–25 Questions / Day)
- `id`: string
- `dayNumber`: integer
- `questionNumber`: integer (1 to 25)
- `subject`: string
- `topic`: string
- `questionType`: enum ('MCQ', 'MSQ', 'NAT')
- `timeTakenSeconds`: integer
- `status`: enum ('CORRECT_FIRST_TRY', 'CORRECT_SLOW', 'INCORRECT', 'UNATTEMPTED_STUCK')
- `gateYear`: string (optional, e.g., "2021-Set1")

#### `MistakeEntry` (The Error Log)
- `id`: string
- `dayNumber`: integer
- `subject`: string
- `topic`: string
- `errorCategory`: enum (
    'CALCULATION_ARITHMETIC', 
    'MISREAD_QUESTION', 
    'EDGE_CASE_BLINDSPOT', 
    'CONCEPTUAL_GAP', 
    'TIME_PRESSURE'
  )
- `problemStatement`: markdown
- `userError`: text
- `correctApproach`: markdown
- `referenceLinks`: array of strings
- `isResolved`: boolean (requires re-solving correctly twice)

#### `UserVelocityMetrics` (Computed)
- `scheduledDaysElapsed`: integer
- `completedDaysCount`: integer
- `velocityScore`: float (`completedDays / scheduledDays`)
- `aheadBehindDelta`: integer (e.g., +2 days ahead, -1.5 days behind)
- `averagePyqAccuracy`: percentage
- `averageSecondsPerNAT`: integer

---

### 4. Key Functional Features & Logic

#### A. Interactive Daily Command Center (To-Do & Timeline)
- Render the current day's card with active progress bars.
- Display the three non-negotiable blocks with visual countdown timers:
  * Block 1: 07:00 AM – 10:00 AM (Deep Concept Breakdown)
  * Block 2: 11:30 AM – 02:00 PM (PYQ Timed Drill)
  * Block 3: 05:00 PM – 07:00 PM (Aptitude, Engg Math & Mistake Diary)
- Direct link attachment module: users can paste GateOverflow links, NPTEL timestamps, or PDF page numbers.
- In-place rich-text / Markdown notes editor with automatic auto-save on debounce (500ms).

#### B. PYQ Stopwatch & Performance Logger
- An integrated mini-stopwatch for every question:
  * Soft warning at 2:00 minutes.
  * Hard alert / Circuit-breaker at 3:30 minutes ("Flag as Stuck").
- One-click status buttons: Correct, Stuck, or Failed.
- Direct CTA: "Send to Mistake Diary" when marked Failed or Stuck.

#### C. Smart Alarm & Reminder System
- Use Service Worker Push / Web Notifications API:
  * Pre-alarm 10 minutes prior to Block 1 (06:50 AM).
  * Block 2 PYQ kickoff notification (11:20 AM).
  * Block 3 Mistake Scrub alert (04:50 PM).
  * Missed task ping if a scheduled block passes with 0% checked tasks.

#### D. Analytics Engine & Visual Velocity Dashboard
- **Velocity Meter:** Visual gauge showing if the user is ahead (green), on pace (blue), or slipping behind schedule (red).
- **Cumulative Hours Burn-up / Burn-down Chart:** Planned vs Actual study hours.
- **Root-Cause Error Distribution (Donut / Bar Chart):** Visual breakdown of why marks are lost (e.g., 40% Calculation, 30% Edge Cases, 20% Concept).
- **Subject Mastery Matrix:** Heatmap showing completed vs weak subjects based on PYQ accuracy.

#### E. Contextual AI Study Copilot (Chat Drawer)
- Slide-over sheet (`/components/AICopilotDrawer.tsx`) accessible anywhere via `Ctrl + K` or floating action button.
- System Prompt Context Injection:
  Inject the user's active day, yesterday's failed topics from the Mistake Diary, and current pace.
- Preset Quick Prompts:
  * "Generate 3 tricky NAT edge cases for today's topic."
  * "Explain this error in my Mistake Diary with a physical analogy."
  * "I missed 2 hours today—adjust my evening block without compromising PYQ volume."

---

### 5. UI/UX Design Specifications
- **Design System:** Clean, high-density dashboard inspired by Linear and Raycast.
- **Themes:** 
  * Dark mode: Deep zinc/slate (`#09090b`), high-contrast text, subtle blue/violet accents.
  * Light mode: Crisp white/off-white (`#f8fafc`), clean borders, dark navy typography.
- Keyboard shortcuts: `J`/`K` to navigate days, `Space` to toggle active task, `T` to start timer.

Produce the project directory structure, schema definitions, and core implementation files.