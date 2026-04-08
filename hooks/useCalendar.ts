"use client";
import { useState } from "react";
import { DateRange, Note } from "@/components/WallCalendar/types";

export function useCalendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [notes, setNotes] = useState<Note[]>([]);

  // Only allow going back if not on the initial month
  const [initialMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const canGoPrev = currentDate > initialMonth;

  function prevMonth() {
    if (!canGoPrev) return;
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  function nextMonth() {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  function handleDayClick(date: Date) {
    const { start, end } = range;
    if (!start || (start && end)) {
      setRange({ start: date, end: null }); // reset, pick new start
    } else {
      if (date < start) {
        setRange({ start: date, end: start }); // swap
      } else {
        setRange({ start, end: date });
      }
    }
  }

  function addNote(text: string, dateKey?: string) {
    const key = dateKey ?? new Date().toISOString().split("T")[0];
    setNotes((prev) => {
      const existing = prev.findIndex((n) => n.date === key);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { ...updated[existing], text };
        return updated;
      }
      return [...prev, { id: Date.now().toString(), date: key, text }];
    });
  }

  return {
    currentDate,
    range,
    notes,
    canGoPrev,
    prevMonth,
    nextMonth,
    handleDayClick,
    addNote,
  };
}
