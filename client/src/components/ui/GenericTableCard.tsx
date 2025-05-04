import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { useToast } from "@/hooks/use-toast";
import { ColumnToggle } from "@/components/types/common";
import SortableHeader from "@/components/ui/SortableHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { ActionButtons } from "@/components/ui/ActionButtons";
import { ColumnSelector } from "@/components/ui/ColumnSelector";
import { GenericTableRow } from "@/components/ui/GenericTableRow";
import { Pagination } from "@/components/ui/Pagination";
import { useTable } from "@/hooks/useTable";

interface ColumnConfig {
  id: string;
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: any) => React.ReactNode; // Optional render function for custom cell content
}

interface GenericTableCardProps<T> {
  items: T[];
  setItems: (items: T[]) => void;
  selectedItems: number[];
  setSelectedItems: Dispatch<SetStateAction<number[]>>;
  columns: ColumnToggle[];
  setColumns: (columns: ColumnToggle[]) => void; // Expected prop
  showColumnSelector: boolean;
  setShowColumnSelector: (value: boolean) => void;
  columnSelectorRef: React.RefObject<HTMLDivElement>;
  sortColumn: string | null;
  setSortColumn: (column: string | null) => void;
  sortOrder: "asc" | "desc" | null;
  setSortOrder: (order: "asc" | "desc" | null) => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  itemsPerPage: number;
  setItemsPerPage: Dispatch<SetStateAction<number>>;
  onAddClick: () => void;
  onEditClick: (item: T) => void;
  onDeleteClick: (id: number) => void;
  initialItems: T[];
  columnConfig: ColumnConfig[];
  getExportData: (item: T) => Record<string, any>;
  exportFileName: string;
  entityName: string; // New prop for entity name
}

export default function GenericTableCard<T extends { id: number }>({
  items,
  setItems,
  selectedItems,
  setSelectedItems,
  columns,
  setColumns,
  showColumnSelector,
  setShowColumnSelector,
  columnSelectorRef,
  sortColumn,
  setSortColumn,
  sortOrder,
  setSortOrder,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  onAddClick,
  onEditClick,
  onDeleteClick,
  initialItems,
  columnConfig,
  getExportData,
  exportFileName,
  entityName, // Destructure entityName
}: GenericTableCardProps<T>) {
  const { toast } = useToast();
  const [selectAll, setSelectAll] = useState(false);

  const {
    searchTerm,
    setSearchTerm,
    currentItems,
    totalPages,
    handleSortClick,
    handleRefreshTable,
    handleXlsxDownload,
  } = useTable({
    items,
    setItems,
    initialItems,
    sortColumn,
    setSortColumn,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    getExportData,
    exportFileName,
    setSelectedItems,
    setSelectAll,
    entityName, // Pass entityName to useTable
  });

  const handleSelectAll = useCallback(() => {
    setSelectedItems(selectAll ? [] : items.map((item) => item.id));
    setSelectAll(!selectAll);
  }, [selectAll, items, setSelectedItems]);

  const handleSelectItem = useCallback(
    (id: number) => {
      setSelectedItems(
        selectedItems.includes(id)
          ? selectedItems.filter((itemId) => itemId !== id)
          : [...selectedItems, id],
      );
    },
    [selectedItems, setSelectedItems],
  );

  const handleBulkDelete = useCallback(() => {
    if (selectedItems.length === 0) return;

    // Calculate the number of items on the current page before deletion
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    // const currentPageItemsCount = items.slice(start, end).length;

    // Filter out the selected items
    const updatedItems = items.filter(
      (item) => !selectedItems.includes(item.id),
    );

    // Check if the current page will be empty after deletion
    const updatedCurrentPageItems = updatedItems.slice(start, end);
    const isCurrentPageEmpty = updatedCurrentPageItems.length === 0;

    // Update the items
    setItems(updatedItems);
    setSelectedItems([]);
    setSelectAll(false);

    // If the current page is empty and not the first page, go to the previous page
    if (isCurrentPageEmpty && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }

    toast({
      title: "Items Deleted",
      description: `${selectedItems.length} item${selectedItems.length > 1 ? "s" : ""} successfully removed.`,
      variant: "destructive",
      className: "bg-[#450A0A] border border-red-700/50 text-white",
    });
  }, [items, selectedItems, setItems, setSelectedItems, toast]);

  return (
    <div className="p-0.5 rounded-[1rem] bg-[conic-gradient(#072f93_0deg,#03115e_45deg,#031b78_90deg,#0f42c1_135deg,#021a70_180deg,#031a63_225deg,#0a70d2_270deg,#0e82ea_315deg,#072f93_360deg)] grid shadow-[0_4px_8px_rgba(7,47,147,0.3),0_0_12px_rgba(14,130,234,0.4)]">
      <div className="bg-[#05002E] rounded-xl overflow-hidden shadow-[inset_0_2px_4px_rgba(3,17,94,0.6),inset_0_-2px_6px_rgba(2,26,112,0.8)]">
        <div className="p-5 flex items-center justify-between border-b border-[#5D0A72]/10">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCurrentPage={setCurrentPage}
          />
          <ActionButtons
            selectedAppointments={selectedItems}
            handleBulkDelete={handleBulkDelete}
            handleRefreshTable={handleRefreshTable}
            handleXlsxDownload={handleXlsxDownload}
            showColumnSelector={showColumnSelector}
            setShowColumnSelector={setShowColumnSelector}
            onAddClick={onAddClick}
          />
        </div>
        <ColumnSelector
          columns={columns}
          setColumns={setColumns}
          columnSelectorRef={columnSelectorRef}
          showColumnSelector={showColumnSelector}
        />
        <div className="relative max-h-[57vh] overflow-x-auto overflow-y-auto bg-[#05002E] custom-scrollbar">
          <table className="w-full bg-[#05002E]">
            <thead className="sticky top-0 z-10 bg-[#03001c] shadow-sm">
              <tr className="text-left text-[#94A3B8] bg-[#03001c]">
                {columns.find((c) => c.id === "checkbox")?.visible && (
                  <th className="py-4 px-6 font-medium rounded-l-lg">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="rounded border-[#5D0A72]/30 text-[#5D0A72] focus:ring-[#5D0A72]/30 h-4 w-4"
                      aria-label="Select all items"
                    />
                  </th>
                )}
                {columnConfig.map(
                  (col) =>
                    columns.find((c) => c.id === col.id)?.visible && (
                      <th key={col.id} className="py-4 px-6 font-medium">
                        {col.sortable !== false ? (
                          <SortableHeader
                            label={col.label}
                            columnKey={col.key}
                            sortColumn={sortColumn}
                            sortOrder={sortOrder}
                            onSort={handleSortClick}
                          />
                        ) : (
                          col.label
                        )}
                      </th>
                    ),
                )}
                {columns.find((c) => c.id === "actions")?.visible && (
                  <th className="py-4 px-6 font-medium rounded-r-lg text-center">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5D0A72]/10">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <GenericTableRow
                    key={item.id}
                    item={item}
                    selectedItems={selectedItems}
                    handleSelectItem={handleSelectItem}
                    onEditClick={onEditClick} // Ensure onEditClick is passed with type (item: T) => void
                    onDeleteClick={onDeleteClick}
                    columns={columns}
                    columnConfig={columnConfig}
                  />
                ))
              ) : (
                <tr className="text-center">
                  <td
                    colSpan={
                      (columns.find((c) => c.id === "checkbox")?.visible
                        ? 1
                        : 0) +
                      (columns.find((c) => c.id === "actions")?.visible
                        ? 1
                        : 0) +
                      columnConfig.filter(
                        (col) => columns.find((c) => c.id === col.id)?.visible,
                      ).length
                    }
                    className="py-6 text-[#94A3B8]"
                  >
                    {searchTerm.trim()
                      ? "No items matching your search"
                      : "No items available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          totalItems={items.length}
        />
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #05002E;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #81D4FA;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4FC3F7;
        }
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #81D4FA #05002E;
        }
      `}</style>
    </div>
  );
}