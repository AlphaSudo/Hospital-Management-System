import { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const SearchBar = ({ searchTerm, setSearchTerm, setCurrentPage }: SearchBarProps) => (
  <div className="relative w-64">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg
        className="h-4 w-4 text-[#94A3B8]/70"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
    <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
      }}
      className="bg-[#02001E] text-sm py-2 pl-10 pr-4 rounded-lg text-[#94A3B8] placeholder-[#94A3B8]/50 focus:outline-none focus:ring-1 focus:ring-[#5D0A72]/50 border border-[#5D0A72]/10 w-full"
      aria-label="Search appointments"
    />
  </div>
);