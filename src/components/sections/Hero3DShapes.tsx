export function Hero3DShapes() {
  return (
    <div className="hero-3d-scene pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="shape-3d shape-cube shape-cube-1">
        <div className="cube-face cube-front" />
        <div className="cube-face cube-back" />
        <div className="cube-face cube-right" />
        <div className="cube-face cube-left" />
        <div className="cube-face cube-top" />
        <div className="cube-face cube-bottom" />
      </div>
      <div className="shape-3d shape-cube shape-cube-2">
        <div className="cube-face cube-front" />
        <div className="cube-face cube-back" />
        <div className="cube-face cube-right" />
        <div className="cube-face cube-left" />
        <div className="cube-face cube-top" />
        <div className="cube-face cube-bottom" />
      </div>
      <div className="shape-ring shape-ring-1" />
      <div className="shape-ring shape-ring-2" />
    </div>
  );
}
