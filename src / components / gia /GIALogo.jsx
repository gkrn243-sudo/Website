xport default function GIALogo({ size = 40, showText = true }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative flex items-center justify-center rounded-2xl gia-gradient-bg shadow-lg"
        style={{ width: size, height: size, minWidth: size }}
      >
        <span
          className="font-bold text-white select-none"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: size * 0.42,
            letterSpacing: '-0.03em',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          SA
        </span>
        {/* Glow ring */}
        <div
          className="absolute inset-0 rounded-2xl opacity-30"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            filter: 'blur(8px)',
            zIndex: -1,
          }}
        />
      </div>
      {showText && (
        <span
          className="gia-gradient-text font-bold tracking-tight select-none"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: size * 0.5,
          }}
        >
          Samald
        </span>
      )}
    </div>
  );
}
