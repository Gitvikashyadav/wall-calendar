import { MONTHS } from "@/lib/calendarUtils";
export default function MonthHeader({ date }: { date: Date }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "80px",
        marginTop: "-80px",
        zIndex: 10,
      }}
    >
      <svg
        viewBox="0 0 340 80"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <polygon
          points="0,80 0,45 120,0 230,80"
          fill="#29B6F6"
          opacity="0.95"
        />
        <polygon
          points="0,80 90,20 220,0 340,80"
          fill="#0277BD"
          opacity="0.97"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          right: "14px",
          bottom: "10px",
          textAlign: "right",
          zIndex: 5,
        }}
      >
        <div
          style={{
            color: "#7de4f8",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.06em",
          }}
        >
          {date.getFullYear()}
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: "22px",
            fontWeight: 900,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            textShadow: "0 1px 4px rgba(0,0,0,0.25)",
          }}
        >
          {MONTHS[date.getMonth()]}
        </div>
      </div>
    </div>
  );
}
