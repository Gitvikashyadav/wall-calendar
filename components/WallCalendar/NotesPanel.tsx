"use client";
import { Note } from "@/components/WallCalendar/types";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function NotesPanel({
  onSave,
  selectedDate,
  notes,
  month,
  year,
}: {
  onSave: (text: string, dateKey?: string) => void;
  selectedDate: Date | null;
  notes: Note[];
  month: number;
  year: number;
}) {
  // Filter notes for current month/year only, sorted by day
  const monthNotes = notes
    .filter((n) => {
      const [y, m] = n.date.split("-").map(Number);
      return y === year && m - 1 === month;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  // Each ruled line is 18px tall — max 6 lines fit in 108px area
  const LINE_HEIGHT = 18;
  const MAX_LINES = 6;

  return (
    <div
      style={{
        width: "110px",
        flexShrink: 0,
        padding: "8px 8px 8px 10px",
        borderRight: "1px solid #f3f4f6",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p
        style={{
          fontSize: "10px",
          color: "#888b92ff",
          marginBottom: "6px",
          fontWeight: 500,
        }}
      >
        Notes
      </p>

      {/* Lined area — notes displayed as single lines on each rule */}
      <div
        style={{
          width: "100%",
          height: `${LINE_HEIGHT * MAX_LINES}px`,
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 17px, #e5e7eb 17px, #e5e7eb 18px)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {monthNotes.slice(0, MAX_LINES).map((note) => {
          const day = note.date.split("-")[2];
          return (
            <div
              key={note.id}
              style={{
                height: `${LINE_HEIGHT}px`,
                lineHeight: `${LINE_HEIGHT}px`,
                fontSize: "9px",
                color: "#413f3fff",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                paddingRight: "2px",
              }}
            >
              {day} {MONTHS[month]}: {note.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
