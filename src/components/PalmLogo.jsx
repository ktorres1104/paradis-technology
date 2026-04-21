const PalmLogo = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="garitaGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00d2ff" />
        <stop offset="100%" stopColor="#0066ff" />
      </linearGradient>
    </defs>

    {/* Base wall / platform */}
    <rect x="10" y="72" width="80" height="28" fill="url(#garitaGrad)" />

    {/* Wall buttress (curved bottom of tower) */}
    <path
      d="M22 72 C22 65 18 60 18 55 L42 55 L42 72 Z"
      fill="url(#garitaGrad)"
    />

    {/* Tower body */}
    <rect x="28" y="30" width="36" height="42" fill="url(#garitaGrad)" />

    {/* Tower dome base (straight sides flaring out) */}
    <path
      d="M22 30 L78 30 L72 18 L28 18 Z"
      fill="url(#garitaGrad)"
    />

    {/* Tower dome (rounded top) */}
    <path
      d="M28 18 Q28 4 50 4 Q72 4 72 18 Z"
      fill="url(#garitaGrad)"
    />

    {/* Finial ball on top */}
    <circle cx="50" cy="3" r="4" fill="url(#garitaGrad)" />

    {/* Window cutout (negative space) */}
    <rect x="43" y="42" width="14" height="20" rx="2" fill="#07091a" />
  </svg>
);

export default PalmLogo;
