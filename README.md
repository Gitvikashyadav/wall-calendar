# 🗓️ Wall Calendar Component

A beautifully crafted interactive wall calendar built with **Next.js**, **TypeScript**, and pure inline styles — no UI libraries, no CSS frameworks. Designed to feel like a real physical wall calendar on your screen.

---

## ✨ Live Demo

🔗 [View Live on Vercel](https://your-vercel-link.vercel.app)

📹 [Watch Video Walkthrough](https://loom.com/your-video-link)

---

## 📸 Preview

![Calendar Preview](./public/preview.png)

---

## 🚀 Getting Started

### Prerequisites

- Node.js `18+`
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/wall-calendar.git

# 2. Navigate into the project
cd wall-calendar

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧩 Features

| Feature                 | Description                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| 📅 Month Navigation     | Navigate forward/backward through months with prev/next buttons                                   |
| 🖼️ Hero Image           | Each month displays a unique full-width mountain landscape photo with smooth crossfade transition |
| 📝 Notes                | Click any date to open a modal and write a note — saved notes appear in the left panel lined area |
| 🎉 Festival Tooltips    | Hover over any festival date to see the festival name — disappears when you move away             |
| 📆 Date Range Selection | Click two dates to highlight a range across the calendar grid                                     |
| 🔒 No Past Navigation   | Cannot navigate before the current month                                                          |
| 📱 Responsive Design    | Adapts gracefully from mobile to desktop                                                          |

---

## 🏗️ Project Structure

├── app/
│ └── page.tsx # Root page
│
├── components/
│ └── WallCalendar/
│ ├── index.tsx # Main calendar container + modal logic
│ ├── HeroImage.tsx # Month image with crossfade transition
│ ├── MonthHeader.tsx # Month + year banner with geometric design
│ ├── CalendarGrid.tsx # Day grid, hover tooltips, date range
│ ├── NotesPanel.tsx # Left panel — displays saved notes on ruled lines
│ └── types.ts # Shared TypeScript types
│
├── hooks/
│ └── useCalendar.ts # All calendar state — notes, navigation, range
│
└── lib/
├── calendarUtils.ts # getDaysInMonth, getFirstDayOfMonth, isSameDay
├── festivals.ts # Festival dates + colors map
└── monthImages.ts # Unsplash mountain images per month

---

## 🧠 Architecture & Design Decisions

### State Management

All state lives in a single custom hook `useCalendar.ts`. This keeps `index.tsx` clean and makes the logic fully testable in isolation. No external state library (Redux/Zustand) was needed — React's built-in `useState` is sufficient for this scope.
useCalendar.ts
├── currentDate → which month is displayed
├── range → selected start/end date range
├── notes[] → array of { id, date, text }
├── canGoPrev → prevents navigating before current month
└── addNote() → upserts a note by date key (YYYY-MM-DD)

## 🧪 How to Test Key Features

**Notes:**

1. Click any date on the calendar
2. Write a note in the modal → click Save Note
3. The note appears in the left panel on the corresponding ruled line

**Festival Tooltip:**

1. Hover over any highlighted date (has a small colored dot)
2. Festival name appears above the date
3. Move mouse away — tooltip disappears immediately

**Date Range:**

1. Click a start date — it highlights
2. Click an end date — the range between both dates highlights in the grid

**Month Navigation:**

1. Click **next** to go forward — hero image crossfades smoothly
2. Click **prev** — disabled on the current month (cannot go to past)
