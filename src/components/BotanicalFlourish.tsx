import React from 'react';

interface FlourishProps {
  className?: string;
}

export const BotanicalDivider: React.FC<FlourishProps> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
    <span className="h-px w-14 bg-[#C6A467]/45" />
    <svg
      width="28"
      height="22"
      viewBox="0 0 28 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#C6A467] shrink-0"
    >
      <path
        d="M14 19V5M14 5C14 5 11.5 2 9 2C6.8 2 5.5 3.8 6.5 6C7.5 8.2 11.5 9.2 14 9.5M14 5C14 5 16.5 2 19 2C21.2 2 22.5 3.8 21.5 6C20.5 8.2 16.5 9.2 14 9.5M14 13.5C11.2 13.2 8.2 12.2 6.8 14C5.4 15.8 7 18.2 9.5 18C11.8 17.8 13.2 15.8 14 13.5ZM14 13.5C16.8 13.2 19.8 12.2 21.2 14C22.6 15.8 21 18.2 18.5 18C16.2 17.8 14.8 15.8 14 13.5Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="h-px w-14 bg-[#C6A467]/45" />
  </div>
);

export const CornerBlossom: React.FC<FlourishProps> = ({ className = '' }) => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`text-[#C6A467]/60 pointer-events-none ${className}`}
    aria-hidden="true"
  >
    <path
      d="M8 48C14 34 24 22 44 12"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
    />
    <path
      d="M22 30C18 24 19 18 24 16C26 21 25 26 22 30Z"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinejoin="round"
    />
    <path
      d="M31 21C35 16 41 16 44 20C39 23 35 23 31 21Z"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinejoin="round"
    />
    <circle cx="44" cy="12" r="2" stroke="currentColor" strokeWidth="0.9" />
  </svg>
);
