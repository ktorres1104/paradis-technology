const PalmLogo = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Base wall / platform */}
    <rect x="10" y="72" width="80" height="28" fill="#161f5c" />

    {/* Wall buttress (curved bottom of tower) */}
    <path
      d="M22 72 C22 65 18 60 18 55 L42 55 L42 72 Z"
      fill="#161f5c"
    />

    {/* Tower body */}
    <rect x="28" y="30" width="36" height="42" fill="#161f5c" />

    {/* Tower dome base (straight sides flaring out) */}
    <path
      d="M22 30 L78 30 L72 18 L28 18 Z"
      fill="#161f5c"
    />

    {/* Tower dome (rounded top) */}
    <path
      d="M28 18 Q28 4 50 4 Q72 4 72 18 Z"
      fill="#161f5c"
    />

    {/* Finial ball on top */}
    <circle cx="50" cy="3" r="4" fill="#161f5c" />

    {/* Window cutout (negative space) */}
    <rect x="43" y="42" width="14" height="20" rx="2" fill="#f4f5f3" />
  </svg>
);

export default PalmLogo;
