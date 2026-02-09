interface CloudEdgeProps {
  position?: "top" | "bottom";
  fillColor?: string;
  className?: string;
}

export default function CloudEdge({
  position = "bottom",
  fillColor = "var(--color-paper)",
  className = "",
}: CloudEdgeProps) {
  const isTop = position === "top";

  return (
    <div
      className={`absolute left-0 w-full pointer-events-none ${
        isTop ? "top-0 -translate-y-1" : "bottom-0 translate-y-1"
      } ${className}`}
      style={{ zIndex: 10 }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-15 sm:h-20 lg:h-30" 
        style={{ transform: isTop ? "rotate(180deg)" : "none" }}
      >
        <path
          d="M0,0 C150,80 350,80 600,50 C850,20 1050,80 1200,0 L1200,120 L0,120 Z"
          style={{ fill: fillColor }}
        />
      </svg>
    </div>
  );
}
