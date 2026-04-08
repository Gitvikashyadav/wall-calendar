import { useState, useEffect } from "react";
import { MONTH_IMAGES } from "@/lib/monthImages";

export default function HeroImage({ month }: { month: number }) {
  const [displayedSrc, setDisplayedSrc] = useState(MONTH_IMAGES[month]);
  const [nextSrc, setNextSrc] = useState<string | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const newSrc = MONTH_IMAGES[month];
    if (newSrc === displayedSrc) return;

    // Preload the new image first, then crossfade
    const img = new Image();
    img.src = newSrc;
    img.onload = () => {
      setNextSrc(newSrc);
      setFading(true);
      setTimeout(() => {
        setDisplayedSrc(newSrc);
        setNextSrc(null);
        setFading(false);
      }, 400); // matches transition duration below
    };
  }, [month]);

  return (
    <div
      style={{
        width: "100%",
        height: "220px", // fixed — never changes
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
        background: "#e2e8f0", // placeholder color while loading
      }}
    >
      {/* Current image — fades out */}
      <img
        src={displayedSrc}
        alt="Month hero"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          opacity: fading ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Next image — fades in on top */}
      {nextSrc && (
        <img
          src={nextSrc}
          alt="Month hero next"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: fading ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
      )}
    </div>
  );
}
