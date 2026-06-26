function CubeFaces() {
  return (
    <>
      <div className="cube-face cube-front" />
      <div className="cube-face cube-back" />
      <div className="cube-face cube-right" />
      <div className="cube-face cube-left" />
      <div className="cube-face cube-top" />
      <div className="cube-face cube-bottom" />
    </>
  );
}

export function Hero3DShapes() {
  return (
    <div
      className="hero-3d-scene pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Cubes */}
      <div className="shape-3d shape-cube shape-cube-1">
        <CubeFaces />
      </div>
      <div className="shape-3d shape-cube shape-cube-2">
        <CubeFaces />
      </div>
      <div className="shape-3d shape-cube shape-cube-3">
        <CubeFaces />
      </div>
      <div className="shape-3d shape-cube shape-cube-4">
        <CubeFaces />
      </div>

      {/* Rings */}
      <div className="shape-ring shape-ring-1" />
      <div className="shape-ring shape-ring-2" />
      <div className="shape-ring shape-ring-3" />

      {/* Diamonds */}
      <div className="shape-diamond shape-diamond-1" />
      <div className="shape-diamond shape-diamond-2" />
      <div className="shape-diamond shape-diamond-3" />

      {/* Triangles */}
      <div className="shape-triangle shape-triangle-1" />
      <div className="shape-triangle shape-triangle-2" />

      {/* Floating dots grid */}
      <div className="shape-dots shape-dots-1" />
    </div>
  );
}
