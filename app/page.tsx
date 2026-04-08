import WallCalendar from "@/components/WallCalendar";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <WallCalendar />
    </main>
  );
}
