import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-14 w-auto" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 56 56"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circle Border */}
        <circle
          cx="28"
          cy="28"
          r="24"
          stroke="#0c4a6e"
          strokeWidth="1.5"
          opacity="0.3"
        />

        {/* Top Left Corner - Tech Square */}
        <rect
          x="10"
          y="10"
          width="8"
          height="8"
          fill="#0284c7"
          rx="1.5"
        />

        {/* Top Right Corner - Smaller Tech Square */}
        <rect
          x="38"
          y="10"
          width="6"
          height="6"
          fill="#0ea5e9"
          rx="1"
          opacity="0.8"
        />

        {/* Center Large Circle (O) */}
        <circle
          cx="28"
          cy="28"
          r="10"
          fill="none"
          stroke="#075985"
          strokeWidth="2"
        />

        {/* Inner Dot */}
        <circle
          cx="28"
          cy="28"
          r="3"
          fill="#0284c7"
        />

        {/* Bottom Left Accent Line */}
        <line
          x1="12"
          y1="42"
          x2="20"
          y2="42"
          stroke="#0ea5e9"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Bottom Right Accent */}
        <rect
          x="38"
          y="40"
          width="4"
          height="4"
          fill="#0284c7"
          opacity="0.6"
          rx="0.5"
        />

        {/* Tech Lines - Representing connectivity */}
        <line
          x1="18"
          y1="24"
          x2="24"
          y2="28"
          stroke="#0284c7"
          strokeWidth="1.5"
          opacity="0.5"
          strokeLinecap="round"
        />
        <line
          x1="32"
          y1="28"
          x2="38"
          y2="32"
          stroke="#0284c7"
          strokeWidth="1.5"
          opacity="0.5"
          strokeLinecap="round"
        />

        {/* Top accent gradient effect using multiple circles */}
        <circle
          cx="28"
          cy="16"
          r="2"
          fill="#0ea5e9"
          opacity="0.6"
        />

        {/* Bottom accent */}
        <circle
          cx="28"
          cy="40"
          r="2"
          fill="#0284c7"
          opacity="0.7"
        />
      </svg>
    </div>
  );
};

export default Logo;
