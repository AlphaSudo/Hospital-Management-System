import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  label: string; // For aria-label
  tooltip: string;
  children: React.ReactNode; // For the SVG icon
  className?: string; // Allow custom styling overrides/additions
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  label,
  tooltip,
  children,
  className = "bg-[#05002E] text-[#94A3B8] hover:bg-[#0A004A]/20 border-[#5D0A72]/10", // Default styles
  disabled = false,
}) => {
  const baseStyle = "relative p-2 rounded-lg transition-colors border group disabled:opacity-50 disabled:cursor-not-allowed";
  const tooltipStyle = "absolute invisible group-hover:visible bg-[#3466ad] text-white text-xs px-2 py-1 rounded-lg -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-50"; // Adjusted bottom position

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${className}`}
      aria-label={label}
      disabled={disabled}
    >
      <span className={tooltipStyle}>
        {tooltip}
      </span>
      {children} {/* SVG Icon */}
    </button>
  );
};

export default ActionButton;