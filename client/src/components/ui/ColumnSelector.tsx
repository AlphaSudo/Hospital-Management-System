import { RefObject } from "react";
import { ColumnToggle } from "@/components/types/appointment";

interface ColumnSelectorProps {
  columns: ColumnToggle[];
  setColumns: (columns: ColumnToggle[]) => void;
  columnSelectorRef: RefObject<HTMLDivElement>;
  showColumnSelector: boolean;
}

export const ColumnSelector = ({ columns, setColumns, columnSelectorRef, showColumnSelector }: ColumnSelectorProps) => (
  showColumnSelector && (
    <div
      ref={columnSelectorRef}
      className="absolute top-12 right-0 z-30 w-64 bg-[#f2f2f4] rounded-lg shadow-lg border border-[#5D0A72]/10 overflow-hidden max-h-[400px] overflow-y-auto"
    >
      <div className="sticky top-0 bg-[#e9eaec] p-3 border-b border-gray-300">
        <h3 className="text-gray-700 font-medium text-base">Show/Hide Column</h3>
      </div>
      {columns.map((column) => (
        <div
          key={column.id}
          className="flex items-center px-4 py-3 hover:bg-gray-100 border-b border-gray-200"
        >
          <input
            type="checkbox"
            id={`column-${column.id}`}
            checked={column.visible}
            onChange={() => setColumns(columns.map((c) => (c.id === column.id ? { ...c, visible: !c.visible } : c)))}
            className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            aria-label={`Toggle visibility of ${column.label} column`}
          />
          <label htmlFor={`column-${column.id}`} className="ml-3 text-sm text-gray-700 cursor-pointer">
            {column.label}
          </label>
        </div>
      ))}
    </div>
  )
);