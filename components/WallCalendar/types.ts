export type DateRange = {
  start: Date | null;
  end: Date | null;
};

export type Note = {
  id: string;
  date: string; // ISO "YYYY-MM-DD"
  text: string;
};

export type CalendarState = {
  currentDate: Date;
  range: DateRange;
  notes: Note[];
};
