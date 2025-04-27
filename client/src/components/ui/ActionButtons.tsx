interface ActionButtonsProps {
  selectedAppointments: number[];
  handleBulkDelete: () => void;
  handleRefreshTable: () => void;
  handleXlsxDownload: () => void;
  showColumnSelector: boolean;
  setShowColumnSelector: (value: boolean) => void;
  onAddClick: () => void;
}

export const ActionButtons = ({
  selectedAppointments,
  handleBulkDelete,
  handleRefreshTable,
  handleXlsxDownload,
  showColumnSelector,
  setShowColumnSelector,
  onAddClick,
}: ActionButtonsProps) => (
  <div className="flex items-center gap-2">
    {selectedAppointments.length > 0 && (
      <button
        onClick={handleBulkDelete}
        className="relative bg-[#450A0A] text-white p-2 rounded-lg hover:bg-[#5A0000] transition-colors border border-red-700/40 group"
        aria-label={`Delete ${selectedAppointments.length} selected appointments`}
      >
        <span className="absolute invisible group-hover:visible bg-[#450A0A] text-white text-xs px-2 py-1 rounded-lg -bottom-full left-1/2 transform -translate-x-1/2 z-50">
          Delete {selectedAppointments.length} Selected
        </span>
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>
    )}
    <button
      onClick={handleRefreshTable}
      className="relative bg-[#05002E] text-[#94A3B8] p-2 rounded-lg hover:bg-[#0A004A]/20 transition-colors border border-[#5D0A72]/10 group"
      aria-label="Refresh table"
    >
      <span className="absolute invisible group-hover:visible bg-[#3466ad] text-white text-xs px-2 py-1 rounded-lg -bottom-full left-1/2 transform -translate-x-1/2 z-50">
        Refresh Table
      </span>
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M8 16H3v5" />
      </svg>
    </button>
    <button
      onClick={handleXlsxDownload}
      className="relative bg-[#05002E] text-[#94A3B8] p-2 rounded-lg hover:bg-[#0A004A]/20 transition-colors border border-[#5D0A72]/10 group"
      aria-label="Export to Excel"
    >
      <span className="absolute invisible group-hover:visible bg-[#3466ad] text-white text-xs px-2 py-1 rounded-lg -bottom-full left-1/2 transform -translate-x-1/2 z-50">
        Export to Excel
      </span>
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M8 13h2" />
        <path d="M8 17h2" />
        <path d="M14 13h2" />
        <path d="M14 17h2" />
      </svg>
    </button>
    <button
      onClick={() => setShowColumnSelector(!showColumnSelector)}
      className="relative bg-[#05002E] text-[#94A3B8] p-2 rounded-lg hover:bg-[#0A004A]/20 transition-colors border border-[#5D0A72]/10 group"
      aria-label="Show/Hide Columns"
    >
      <span className="absolute invisible group-hover:visible bg-[#3466ad] text-white text-xs px-2 py-1 rounded-lg -bottom-full left-1/2 transform -translate-x-1/2 z-50">
        Show/Hide Columns
      </span>
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.5523 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
        />
      </svg>
    </button>
    <button
      onClick={onAddClick}
      className="relative bg-[#05002E] text-[#94A3B8] p-2 rounded-lg hover:bg-[#0A004A]/20 transition-colors border border-[#5D0A72]/10 group"
      aria-label="Add New Appointment"
    >
      <span className="absolute invisible group-hover:visible bg-[#3466ad] text-white text-xs px-2 py-1 rounded-lg -bottom-full left-1/2 transform -translate-x-1/2 z-50">
        Add New Appointment
      </span>
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  </div>
);