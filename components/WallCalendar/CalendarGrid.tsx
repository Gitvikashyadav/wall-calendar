import { useState } from "react";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  DAYS,
  isSameDay,
} from "@/lib/calendarUtils";
import { DateRange } from "./types";
import { getFestival } from "@/lib/festivals";

export default function CalendarGrid({
  date,
  range,
  onDayClick,
}: {
  date: Date;
  range: DateRange;
  onDayClick: (d: Date) => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const y = date.getFullYear(),
    m = date.getMonth();
  const total = getDaysInMonth(y, m);
  const first = getFirstDayOfMonth(y, m);
  const today = new Date();
  const prevTotal = getDaysInMonth(y, m - 1 < 0 ? 11 : m - 1);

  type Cell = { d: number; type: "prev" | "curr" | "next"; date: Date };
  const cells: Cell[] = [];
  for (let i = 0; i < first; i++) {
    const d = prevTotal - first + 1 + i;
    cells.push({ d, type: "prev", date: new Date(y, m - 1, d) });
  }
  for (let d = 1; d <= total; d++)
    cells.push({ d, type: "curr", date: new Date(y, m, d) });
  let nx = 1;
  while (cells.length % 7 !== 0)
    cells.push({ d: nx++, type: "next", date: new Date(y, m + 1, nx - 1) });

  return (
    <div style={{ flex: 1, padding: "8px 8px 6px 4px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          marginBottom: "3px",
        }}
      >
        {DAYS.map((d) => (
          <span
            key={d}
            style={{
              textAlign: "center",
              fontSize: "9px",
              fontWeight: 700,
              color: d === "Sat" || d === "Sun" ? "#0288D1" : "#bbb",
            }}
          >
            {d}
          </span>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          rowGap: "1px",
        }}
      >
        {cells.map((cell, i) => {
          const isWk = cell.date.getDay() === 0 || cell.date.getDay() === 6;
          const isTod = isSameDay(cell.date, today);
          const fest = cell.type === "curr" ? getFestival(m, cell.d) : null;
          const isOver = cell.type !== "curr";
          const isHovered = hoveredIndex === i; // ← track per cell

          return (
            <button
              key={i}
              onClick={() => onDayClick(cell.date)}
              onMouseEnter={() => setHoveredIndex(i)} // ← set on enter
              onMouseLeave={() => setHoveredIndex(null)} // ← clear on leave
              style={{
                position: "relative",
                height: "26px",
                border: "none",
                cursor: "pointer",
                background: "transparent",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  fontSize: "10px",
                  fontWeight: isTod ? 700 : 400,
                  color: isOver
                    ? isWk
                      ? "#90caf9"
                      : "#ccc"
                    : isWk
                      ? "#0288D1"
                      : "#374151",
                  outline: isTod ? "1.5px solid #0288D1" : "none",
                }}
              >
                {cell.d}
              </span>

              {fest && (
                <>
                  {/* colored dot */}
                  <span
                    style={{
                      position: "absolute",
                      top: "2px",
                      right: "2px",
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: fest.color,
                    }}
                  />

                  {/* tooltip — only render when this cell is hovered */}
                  {isHovered && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "28px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#1e293b",
                        color: "#fff",
                        fontSize: "9px",
                        padding: "3px 6px",
                        borderRadius: "4px",
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                        zIndex: 10,
                      }}
                    >
                      {fest.name}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
