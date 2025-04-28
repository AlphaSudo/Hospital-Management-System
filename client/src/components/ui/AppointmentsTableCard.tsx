import { useState, useCallback , Dispatch, SetStateAction } from "react";
import { useToast } from "@/hooks/use-toast";
import { Appointment, ColumnToggle } from "@/components/types/appointment";
import SortableHeader from "@/components/ui/SortableHeader";
import { useAppointmentsTable } from "@/hooks/useAppointmentsTable";
import { SearchBar } from "@/components/ui/SearchBar";
import { ActionButtons } from "@/components/ui/ActionButtons";
import { ColumnSelector } from "@/components/ui/ColumnSelector";
import { TableRow } from "@/components/ui/TableRow";
import { Pagination } from "@/components/ui/Pagination";

interface AppointmentsTableCardProps {
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
  selectedAppointments: number[];
  setSelectedAppointments: (ids: number[]) => void;
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
  onEditClick: (appointment: Appointment) => void;
  onDeleteClick: (id: number) => void;
  initialAppointments: Appointment[];
}

export default function AppointmentsTableCard({
  appointments,
  setAppointments,
  selectedAppointments,
  setSelectedAppointments,
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
  initialAppointments,
}: AppointmentsTableCardProps) {
  const { toast } = useToast();
  const [selectAll, setSelectAll] = useState(false);

  const {
    searchTerm,
    setSearchTerm,
    currentAppointments,
    totalPages,
    handleSortClick,
    handleRefreshTable,
    handleXlsxDownload,
  } = useAppointmentsTable({
    appointments,
    setAppointments,
    initialAppointments,
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
    setSelectedAppointments(
      selectAll ? [] : currentAppointments.map((appointment) => appointment.id)
    );
    setSelectAll(!selectAll);
  }, [selectAll, currentAppointments, setSelectedAppointments]);

  const handleSelectAppointment = useCallback(
    (id: number) => {
      setSelectedAppointments(
        selectedAppointments.includes(id)
          ? selectedAppointments.filter((appointmentId) => appointmentId !== id)
          : [...selectedAppointments, id]
      );
    },
    [selectedAppointments, setSelectedAppointments]
  );

  const handleBulkDelete = useCallback(() => {
    if (selectedAppointments.length === 0) return;

    setAppointments(appointments.filter((appointment) => !selectedAppointments.includes(appointment.id)));
    setSelectedAppointments([]);

    toast({
      title: 'Appointments Deleted',
      description: `${selectedAppointments.length} appointment${selectedAppointments.length > 1 ? 's' : ''} successfully removed.`,
      variant: 'destructive',
      className: 'bg-[#450A0A] border border-red-700/50 text-white',
    });
  }, [appointments, selectedAppointments, setAppointments, setSelectedAppointments, toast]);

  const columnConfig = [
    { id: 'name', key: 'patientName', label: 'Name' },
    { id: 'doctor', key: 'doctor', label: 'Doctor' },
    { id: 'gender', key: 'gender', label: 'Gender' },
    { id: 'date', key: 'date', label: 'Date' },
    { id: 'time', key: 'time', label: 'Time' },
    { id: 'mobile', key: 'phone', label: 'Mobile', sortable: false },
    { id: 'injury', key: 'issue', label: 'Injury' },
    { id: 'email', key: 'email', label: 'Email', sortable: false },
    { id: 'status', key: 'status', label: 'Status' },
    { id: 'visitType', key: 'visitType', label: 'Visit Type' },
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
            selectedAppointments={selectedAppointments}
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
                    aria-label="Select all appointments"
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
              {currentAppointments.length > 0 ? (
                currentAppointments.map((appointment) => (
                  <TableRow
                    key={appointment.id}
                    appointment={appointment}
                    selectedAppointments={selectedAppointments}
                    handleSelectAppointment={handleSelectAppointment}
                    onEditClick={onEditClick}
                    onDeleteClick={onDeleteClick}
                    columns={columns}
                  />
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan={columnConfig.length + 2} className="py-6 text-[#94A3B8]">
                    {searchTerm.trim() ? 'No appointments matching your search' : 'No appointments available'}
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
          totalItems={appointments.length}
        />
      </div>
    </div>
  );
}


