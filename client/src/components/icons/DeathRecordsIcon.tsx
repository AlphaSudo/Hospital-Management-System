import React from 'react';

interface DeathRecordsIconProps {
  className?: string;
}

const DeathRecordsIcon: React.FC<DeathRecordsIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="#81D4FA"
    >
      <title>death-records</title>
      <path
        fillRule="evenodd"
        d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm-1 3h2v3h3v2h-3v3h-2v-3H8v-2h3V8z"
      />
    </svg>
  );
};

export default DeathRecordsIcon;