"use client";
import { useState } from "react";
import HeroImage from "./HeroImage";
import MonthHeader from "./MonthHeader";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import { useCalendar } from "@/hooks/useCalendar";
import { getFestival } from "@/lib/festivals";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function WallCalendar() {
  const {
    currentDate,
    range,
    canGoPrev,
    prevMonth,
    nextMonth,
    handleDayClick,
    addNote,
    notes,
  } = useCalendar();
  const [modal, setModal] = useState<{ key: string; date: Date } | null>(null);
  const [modalText, setModalText] = useState("");

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  function onDayClick(date: Date) {
    handleDayClick(date);
    setSelectedDate(date); // ← ADD THIS
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    setModalText(notes.find((n) => n.date === key)?.text || "");
    setModal({ key, date });
    const fest = getFestival(date.getMonth(), date.getDate());
    if (fest) spawnConfetti();
  }

  function spawnConfetti() {
    // Add a flash class to card briefly
    const card = document.getElementById("wall-card");
    if (card) {
      card.style.animation = "pulse 0.4s ease";
      setTimeout(() => (card.style.animation = ""), 400);
    }
  }

  const modalFest = modal
    ? getFestival(modal.date.getMonth(), modal.date.getDate())
    : null;

  return (
    <>
      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 20px 60px rgba(0,0,0,0.35)} 50%{box-shadow:0 20px 60px rgba(2,136,209,0.5)} }
      `}</style>

      <div
        id="wall-card"
        style={{
          width: "340px",
          minHeight: "450px",
          height: "450px",
          borderRadius: "14px",
          overflow: "hidden",
          background: "#fff",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.22), 0 2px 6px rgba(0,0,0,0.12)",
        }}
      >
        {/* Spiral */}
        <div
          style={{
            height: "14px",
            background: "linear-gradient(to bottom,#c8c8c8,#e0e0e0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "0 16px",
          }}
        >
          {Array.from({ length: 13 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#9ca3af",
                border: "1.5px solid #6b7280",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.3)",
              }}
            />
          ))}
        </div>

        <HeroImage month={currentDate.getMonth()} />
        <MonthHeader date={currentDate} />

        <div
          style={{ display: "flex", flexDirection: "row", background: "#fff" }}
        >
          <NotesPanel
            onSave={addNote}
            notes={notes} // ← ADD
            month={currentDate.getMonth()} // ← ADD
            year={currentDate.getFullYear()} // ← ADD
            selectedDate={selectedDate} // ← ADD
          />
          <CalendarGrid
            date={currentDate}
            range={range}
            onDayClick={onDayClick}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "4px 12px 10px",
            borderTop: "1px solid #f3f4f6",
          }}
        >
          {canGoPrev ? (
            <button
              onClick={prevMonth}
              style={{
                fontSize: "10px",
                color: "#0288D1",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "2px",
                fontWeight: 600,
              }}
            >
              <ChevronLeft size={12} /> prev
            </button>
          ) : (
            <span />
          )}
          <button
            onClick={nextMonth}
            style={{
              fontSize: "10px",
              color: "#0288D1",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "2px",
              fontWeight: 600,
              marginLeft: "auto",
            }}
          >
            next <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Note Modal */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "18px",
              width: "260px",
              boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <strong style={{ fontSize: "13px" }}>
                {modal.date.getDate()}{" "}
                {
                  [
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
                  ][modal.date.getMonth()]
                }{" "}
                {modal.date.getFullYear()}
              </strong>
              <button
                onClick={() => setModal(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <X size={14} color="#999" />
              </button>
            </div>
            {modalFest && (
              <div
                style={{
                  display: "inline-block",
                  fontSize: "10px",
                  padding: "2px 8px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  marginBottom: "10px",
                  background: modalFest.color + "22",
                  color: modalFest.color,
                  border: `1px solid ${modalFest.color}44`,
                }}
              >
                🎉 {modalFest.name}
              </div>
            )}
            <textarea
              value={modalText}
              onChange={(e) => setModalText(e.target.value)}
              placeholder="Write a note for this date..."
              style={{
                width: "100%",
                height: "64px",
                fontSize: "11px",
                border: "1px solid #e0e0e0",
                borderRadius: "6px",
                padding: "6px",
                resize: "none",
                outline: "none",
                fontFamily: "inherit",
                color: "#333",
              }}
            />
            <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
              <button
                onClick={() => setModal(null)}
                style={{
                  flex: 1,
                  padding: "7px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 600,
                  background: "none",
                  border: "1px solid #e0e0e0",
                  cursor: "pointer",
                  color: "#666",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  addNote(modalText, modal.key);
                  setModal(null);
                }}
                style={{
                  flex: 1,
                  padding: "7px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 600,
                  background: "#0288D1",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
