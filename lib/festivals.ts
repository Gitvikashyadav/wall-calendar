export const FESTIVALS: Record<string, { name: string; color: string }> = {
  "1-1": { name: "New Year's Day", color: "#e91e63" },
  "1-14": { name: "Makar Sankranti", color: "#ff9800" },
  "1-26": { name: "Republic Day", color: "#ff9800" },
  "2-14": { name: "Valentine's Day", color: "#e91e63" },
  "3-25": { name: "Holi", color: "#9c27b0" },
  "4-14": { name: "Ambedkar Jayanti", color: "#2196f3" },
  "5-1": { name: "Labour Day", color: "#f44336" },
  "8-15": { name: "Independence Day", color: "#ff9800" },
  "8-26": { name: "Janmashtami", color: "#673ab7" },
  "10-2": { name: "Gandhi Jayanti", color: "#ff9800" },
  "11-1": { name: "Diwali", color: "#ffc107" },
  "12-25": { name: "Christmas", color: "#4caf50" },
  "12-31": { name: "New Year's Eve", color: "#9c27b0" },
};

export function getFestival(month: number, day: number) {
  return FESTIVALS[`${month + 1}-${day}`] || null;
}
