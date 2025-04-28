import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { useToast } from "@/hooks/use-toast";
import { Doctor, ColumnToggle } from "@/components/types/doctor";
import SortableHeader from "@/components/ui/SortableHeader";
import { useDoctorsTable } from "@/hooks/useDoctorsTable";
import { SearchBar } from "@/components/ui/SearchBar";
import { ActionButtons } from "@/components/ui/ActionButtons";
import { ColumnSelector } from "@/components/ui/ColumnSelector";
import { DoctorTableRow } from "./DoctorTableRow";
import { Pagination } from "@/components/ui/Pagination";

interface DoctorsTableCardProps {
  doctors: Doctor[];
  setDoctors: (doctors: Doctor[]) => void;
  selectedDoctors: number[];
  setSelectedDoctors: (ids: number[]) => void;
  columns: ColumnToggle[];
  setColumns: (columns: ColumnToggle[]) => void;
  showColumnSelector: boolean;
  setShowColumnSelector: (value: boolean) => void;
  columnSelectorRef: React.RefObject<HTMLDivElement>;
  sortColumn: string | null;
  setSortColumn: (column: string | null) => void;
  sortOrder: 'asc' | 'desc' | null;
  setSortOrder: (order: 'asc' | 'desc' | null) => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  itemsPerPage: number;
  setItemsPerPage: Dispatch<SetStateAction<number>>;
  onAddClick: () => void;
  onEditClick: (doctor: Doctor) => void;
  onDeleteClick: (id: number) => void;
  initialDoctors: Doctor[];
}

export default function DoctorsTableCard({
  doctors,
  setDoctors,
  selectedDoctors,
  setSelectedDoctors,
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
  initialDoctors,
}: DoctorsTableCardProps) {
  const { toast } = useToast();
  const [selectAll, setSelectAll] = useState(false);

  const {
    searchTerm,
    setSearchTerm,
    currentDoctors,
    totalPages,
    handleSortClick,
    handleRefreshTable,
    handleXlsxDownload,
  } = useDoctorsTable({
    doctors,
    setDoctors,
    initialDoctors,
    sortColumn,
    setSortColumn,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  });

  const handleSelectAll = useCallback(() => {
    // Select ALL doctors, not just the current page
    setSelectedDoctors(
      selectAll ? [] : doctors.map((doctor) => doctor.id)
    );
    setSelectAll(!selectAll);
  }, [selectAll, doctors, setSelectedDoctors]);

  const handleSelectDoctor = useCallback(
    (id: number) => {
      setSelectedDoctors(
        selectedDoctors.includes(id)
          ? selectedDoctors.filter((doctorId) => doctorId !== id)
          : [...selectedDoctors, id]
      );
    },
    [selectedDoctors, setSelectedDoctors]
  );

  const handleBulkDelete = useCallback(() => {
    if (selectedDoctors.length === 0) return;

    setDoctors(doctors.filter((doctor) => !selectedDoctors.includes(doctor.id)));
    setSelectedDoctors([]);
    // Reset the selectAll checkbox state
    setSelectAll(false);

    toast({
      title: 'Doctors Deleted',
      description: `${selectedDoctors.length} doctor${selectedDoctors.length > 1 ? 's' : ''} successfully removed.`,
      variant: 'destructive',
      className: 'bg-[#450A0A] border border-red-700/50 text-white',
    });
  }, [doctors, selectedDoctors, setDoctors, setSelectedDoctors, setSelectAll, toast]);

  const columnConfig = [
    { id: 'name', key: 'name', label: 'Name' },
    { id: 'department', key: 'department', label: 'Department' },
    { id: 'specialization', key: 'specialization', label: 'Specialization' },
    { id: 'availability', key: 'availability', label: 'Availability' },
    { id: 'mobile', key: 'mobile', label: 'Mobile', sortable: false },
    { id: 'degree', key: 'degree', label: 'Degree' },
    { id: 'experience', key: 'experience', label: 'Experience (Years)' },
    { id: 'consultationFee', key: 'consultationFee', label: 'Consultation Fee' },
    { id: 'email', key: 'email', label: 'Email', sortable: false },
  ];

  return (
    <div className="p-0.5 rounded-[1rem] 
   bg-[conic-gradient(#072f93_0deg,#03115e_45deg,#031b78_90deg,#0f42c1_135deg,#021a70_180deg,#031a63_225deg,#0a70d2_270deg,#0e82ea_315deg,#072f93_360deg)]
   grid 
   shadow-[0_4px_8px_rgba(7,47,147,0.3),0_0_12px_rgba(14,130,234,0.4)]">
      <div className="bg-[#05002E] rounded-xl overflow-hidden shadow-[inset_0_2px_4px_rgba(3,17,94,0.6),inset_0_-2px_6px_rgba(2,26,112,0.8)]">
        <div className="p-5 flex items-center justify-between border-b border-[#5D0A72]/10">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />
          <ActionButtons
            selectedAppointments={selectedDoctors} // Reusing the same component with different props
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
        <div className="overflow-x-auto p-4 bg-[#05002E]">
          <table className="w-full bg-[#05002E]">
            <thead>
              <tr className="text-left text-[#94A3B8] bg-[#03001c]">
                <th className="py-4 px-6 font-medium rounded-l-lg">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="rounded border-[#5D0A72]/30 text-[#5D0A72] focus:ring-[#5D0A72]/30 h-4 w-4"
                    aria-label="Select all doctors"
                  />
                </th>
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
                    )
                )}
                <th className="py-4 px-6 font-medium rounded-r-lg text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5D0A72]/10">
              {currentDoctors.length > 0 ? (
                currentDoctors.map((doctor) => (
                  <DoctorTableRow
                    key={doctor.id}
                    doctor={doctor}
                    selectedDoctors={selectedDoctors}
                    handleSelectDoctor={handleSelectDoctor}
                    onEditClick={onEditClick}
                    onDeleteClick={onDeleteClick}
                    columns={columns}
                  />
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan={columnConfig.length + 2} className="py-6 text-[#94A3B8]">
                    {searchTerm.trim() ? 'No doctors matching your search' : 'No doctors available'}
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
          totalItems={doctors.length}
        />
      </div>
    </div>
  );
}