export const GrowNexLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 800 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="nexGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f26522" />
        <stop offset="100%" stopColor="#ff9a66" />
      </linearGradient>
      <style>
        {`
          .logo-text { font-family: ui-sans-serif, system-ui, sans-serif; font-weight: 800; font-size: 160px; letter-spacing: -0.04em; }
          .logo-subtext { font-family: ui-sans-serif, system-ui, sans-serif; font-weight: 600; font-size: 26px; letter-spacing: 0.58em; fill: rgba(255,255,255,0.7); }
        `}
      </style>
    </defs>
    
    <text x="40" y="150" className="logo-text">
      <tspan fill="white">Grow</tspan>
      <tspan fill="url(#nexGradient)">Nex</tspan>
    </text>
    
    <text x="50" y="205" className="logo-subtext">BUSINESS SOLUTIONS</text>
  </svg>
);
