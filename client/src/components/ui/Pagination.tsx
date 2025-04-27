import { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: Dispatch<SetStateAction<number>>;
  itemsPerPage: number;
  setItemsPerPage: Dispatch<SetStateAction<number>>;
  totalItems: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
  itemsPerPage,
  setItemsPerPage,
  totalItems,
}: PaginationProps) => {
  const maxPagesToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  const paginationItems = [];
  for (let i = startPage; i <= endPage; i++) {
    paginationItems.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`px-3 py-1 rounded-md ${
          currentPage === i
            ? "bg-[#3466ad] text-white"
            : "bg-[#02001E] text-[#94A3B8] hover:bg-[#0A004A]/50"
        }`}
        aria-label={`Go to page ${i}`}
      >
        {i}
      </button>,
    );
  }

  return (
    <div className="p-4 bg-[#05002E] border-t border-[#5D0A72]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-2 text-[#94A3B8] text-sm">
        <span>Rows per page:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            handlePageChange(1);
          }}
          className="bg-[#03001c] border border-[#5D0A72]/10 rounded-md p-1 text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#5D0A72]/50"
          aria-label="Select rows per page"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span>
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
          entries
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? "bg-[#03001c]/50 text-[#94A3B8]/50 cursor-not-allowed"
              : "bg-[#03001c] text-[#94A3B8] hover:bg-[#0A004A]/50"
          }`}
          aria-label="Previous page"
        >
          Previous
        </button>
        {paginationItems}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages || totalPages === 0
              ? "bg-[#03001c]/50 text-[#94A3B8]/50 cursor-not-allowed"
              : "bg-[#03001c] text-[#94A3B8] hover:bg-[#0A004A]/50"
          }`}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
};
