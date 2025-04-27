import { useState, RefObject, useMemo, useEffect } from "react";
import SortableHeader from "@/components/ui/SortableHeader";
import * as XLSX from 'xlsx';
import { useToast } from "@/hooks/use-toast";
import { Appointment, ColumnToggle } from "@/components/types/appointment";

interface AppointmentsTableCardProps {
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
  selectedAppointments: number[];
  setSelectedAppointments: (ids: number[]) => void;
  columns: ColumnToggle[];
  setColumns: (columns: ColumnToggle[]) => void;
  showColumnSelector: boolean;
  setShowColumnSelector: (value: boolean) => void;
  columnSelectorRef: RefObject<HTMLDivElement>;
  sortColumn: string | null;
  setSortColumn: (column: string | null) => void;
  sortOrder: "asc" | "desc" | null;
  setSortOrder: (order: "asc" | "desc" | null) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
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
  const [searchTerm, setSearchTerm] = useState("");

  // Apply search filter first
  const filteredAppointments = useMemo(() => {
    if (!searchTerm.trim()) {
      return appointments;
    }
    
    const lowerCaseSearch = searchTerm.toLowerCase().trim();
    
    return appointments.filter(appointment => {
      return (
        appointment.patientName.toLowerCase().includes(lowerCaseSearch) ||
        appointment.doctor.toLowerCase().includes(lowerCaseSearch) ||
        appointment.issue.toLowerCase().includes(lowerCaseSearch) ||
        appointment.status.toLowerCase().includes(lowerCaseSearch) ||
        appointment.visitType.toLowerCase().includes(lowerCaseSearch) ||
        appointment.email.toLowerCase().includes(lowerCaseSearch) ||
        appointment.phone.toLowerCase().includes(lowerCaseSearch)
      );
    });
  }, [appointments, searchTerm]);

  // Then sort the filtered appointments
  const sortedAppointments = useMemo(() => {
    return [...filteredAppointments].sort((a, b) => {
      if (sortOrder === null || sortColumn === null) {
        return a.id - b.id; // Default sort by ID
      }

      const sortMultiplier = sortOrder === "asc" ? 1 : -1;

      switch (sortColumn) {
        case "id":
          return sortMultiplier * (a.id - b.id);
        case "patientName":
          return sortMultiplier * a.patientName.localeCompare(b.patientName);
        case "doctor":
          return sortMultiplier * a.doctor.localeCompare(b.doctor);
        case "gender":
          return sortMultiplier * a.gender.localeCompare(b.gender);
        case "date": {
          // Convert dates for proper comparison (MM/DD/YYYY format)
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return sortMultiplier * (dateA - dateB);
        }
        case "time": {
          // Convert times for comparison
          const timeA = a.time.split(":").map(Number);
          const timeB = b.time.split(":").map(Number);
          const minutesA = timeA[0] * 60 + timeA[1];
          const minutesB = timeB[0] * 60 + timeB[1];
          return sortMultiplier * (minutesA - minutesB);
        }
        case "injury":
          return sortMultiplier * a.issue.localeCompare(b.issue);
        case "status":
          return sortMultiplier * a.status.localeCompare(b.status);
        case "visitType":
          return sortMultiplier * a.visitType.localeCompare(b.visitType);
        default:
          return 0;
      }
    });
  }, [filteredAppointments, sortColumn, sortOrder]);

  // Update selectAll state whenever selectedAppointments or sortedAppointments change
  useEffect(() => {
    if (sortedAppointments.length === 0) {
      setSelectAll(false);
    } else {
      setSelectAll(selectedAppointments.length === sortedAppointments.length);
    }
  }, [selectedAppointments, sortedAppointments]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Get current page of appointments
  const currentAppointments = useMemo(() => {
    return sortedAppointments.slice(indexOfFirstItem, indexOfLastItem);
  }, [sortedAppointments, indexOfFirstItem, indexOfLastItem]);

  // Total pages for pagination
  const totalPages = Math.ceil(sortedAppointments.length / itemsPerPage);

  const handleSortClick = (column: string) => {
    if (sortColumn === column) {
      const nextOrder = 
        sortOrder === "asc" ? "desc" :
        sortOrder === "desc" ? null : 
        "asc";

      if (nextOrder === null) {
        setSortColumn(null);
        setSortOrder(null);
      } else {
        setSortOrder(nextOrder);
      }
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const toggleColumnVisibility = (columnId: string) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? { ...column, visible: !column.visible }
          : column,
      ),
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedAppointments([]);
    } else {
      setSelectedAppointments(
        sortedAppointments.map((appointment) => appointment.id),
      );
    }
  };

  const handleSelectAppointment = (id: number) => {
    if (selectedAppointments.includes(id)) {
      setSelectedAppointments(
        selectedAppointments.filter((appointmentId) => appointmentId !== id),
      );
    } else {
      setSelectedAppointments([...selectedAppointments, id]);
    }
  };

  const handleBulkDelete = () => {
    if (selectedAppointments.length === 0) return;

    const updatedAppointments = appointments.filter(
      appointment => !selectedAppointments.includes(appointment.id)
    );

    setAppointments(updatedAppointments);

    toast({
      title: "Appointments Deleted",
      description: `${selectedAppointments.length} appointment${selectedAppointments.length > 1 ? 's' : ''} successfully removed.`,
      variant: "destructive",
      className: "bg-[#450A0A] border border-red-700/50 text-white",
    });

    setSelectedAppointments([]);
  };

  const handleRefreshTable = () => {
    setAppointments(initialAppointments);
    setSelectedAppointments([]);
    setCurrentPage(1);
    setSortColumn(null);
    setSortOrder(null);
    setSearchTerm("");

    toast({
      title: "Table Refreshed",
      description: "Appointments data has been refreshed.",
      className: "bg-[#05002E] border border-[#5D0A72]/20 text-white",
    });
  };

  const handleXlsxDownload = () => {
    try {
      const exportData = sortedAppointments.map((appointment: Appointment) => ({
        'Patient Name': appointment.patientName,
        'Doctor': appointment.doctor,
        'Gender': appointment.gender,
        'Date': appointment.date,
        'Time': appointment.time,
        'Phone': appointment.phone,
        'Issue': appointment.issue,
        'Email': appointment.email,
        'Status': appointment.status,
        'Visit Type': appointment.visitType
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");
      XLSX.writeFile(workbook, "Cliniva_Appointments.xlsx");

      toast({
        title: "Export Successful",
        description: "Appointments data has been exported to Excel.",
        className: "bg-[#05002E] border border-[#5D0A72]/20 text-white",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the data.",
        variant: "destructive",
      });
      console.error("Export error:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAvatarBg = (gender: string) => {
    return gender === "female" ? "bg-pink-200" : "bg-blue-200";
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Generate pagination items
  const paginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxPagesToShow / 2),
    );
    const endPage = Math.min(
      totalPages,
      startPage + maxPagesToShow - 1,
    );

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md ${
            currentPage === i
              ? "bg-[#3466ad] text-white"
              : "bg-[#02001E] text-[#94A3B8] hover:bg-[#0A004A]/50"
          }`}
        >
          {i}
        </button>,
      );
    }
    return items;
  };

  return (
    <div
      style={{
        padding: "2px",
        borderRadius: "1rem",
        background:
          "conic-gradient(#072f93 0deg, #03115e 45deg, #031b78 90deg, #0f42c1 135deg, #021a70 180deg, #031a63 225deg, #0a70d2 270deg, #0e82ea 315deg, #072f93 360deg)",
        display: "grid",
        boxShadow: `
          0 4px 8px rgba(7, 47, 147, 0.3),
          0 0 12px rgba(14, 130, 234, 0.4),
        `,
      }}
    >
      <div
        className="bg-[#05002E] rounded-xl overflow-hidden shadow-lg"
        style={{
          boxShadow: `inset 0 2px 4px rgba(3, 17, 94, 0.6),
                      inset 0 -2px 6px rgba(2, 26, 112, 0.8)`,
        }}
      >
        <div className="p-5 flex items-center justify-between border-b border-[#5D0A72]/10">
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
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
                  setCurrentPage(1); // Reset to first page when searching
                }}
                className="bg-[#02001E] text-sm py-2 pl-10 pr-4 rounded-lg text-[#94A3B8] placeholder-[#94A3B8]/50 focus:outline-none focus:ring-1 focus:ring-[#5D0A72]/50 border border-[#5D0A72]/10 w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedAppointments.length > 0 && (
              <div className="relative parent-container">
                <button
                  onClick={handleBulkDelete}
                  className="relative bg-[#450A0A] text-white p-2 rounded-lg hover:bg-[#5A0000] transition-colors border border-red-700/40 group"
                >
                  <span className="absolute invisible group-hover:visible bg-[#450A0A] text-white text-xs px-2 py-1 rounded-lg -bottom-full left-1/2 transform -translate-x-1/2 z-50">
                    Delete {selectedAppointments.length} Selected
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
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
              </div>
            )}

            <div className="relative parent-container">
              <button
                onClick={handleRefreshTable}
                className="relative bg-[#05002E] text-[#94A3B8] p-2 rounded-lg hover:bg-[#0A004A]/20 transition-colors border border-[#5D0A72]/10 group"
              >
                <span className="absolute invisible group-hover:visible bg-[#3466ad] text-white text-xs px-2 py-1 rounded-lg -bottom-full left-1/2 transform -translate-x-1/2 z-50">
                  Refresh Table
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
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
            </div>

            <div className="relative parent-container">
              <button
                onClick={handleXlsxDownload}
                className="relative bg-[#05002E] text-[#94A3B8] p-2 rounded-lg hover:bg-[#0A004A]/20 transition-colors border border-[#5D0A72]/10 group"
              >
                <span className="absolute invisible group-hover:visible bg-[#3466ad] text-white text-xs px-2 py-1 rounded-lg -bottom-full left-1/2 transform -translate-x-1/2 z-50">
                  Export to Excel
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
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
            </div>

            <div className="relative parent-container">
              <button
                onClick={() => setShowColumnSelector(!showColumnSelector)}
                className="relative bg-[#05002E] text-[#94A3B8] p-2 rounded-lg hover:bg-[#0A004A]/20 transition-colors border border-[#5D0A72]/10 group"
              >
                <span className="absolute invisible group-hover:visible bg-[#3466ad] text-white text-xs px-2 py-1 rounded-lg -bottom-full left-1/2 transform -translate-x-1/2 z-50">
                  Show/Hide Columns
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.5523 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              {showColumnSelector && (
                <div
                  ref={columnSelectorRef}
                  className="absolute top-12 right-0 z-30 w-64 bg-[#f2f2f4] rounded-lg shadow-lg border border-[#5D0A72]/10 overflow-hidden"
                  style={{ maxHeight: "400px", overflowY: "auto" }}
                >
                  <div className="sticky top-0 bg-[#e9eaec] p-3 border-b border-gray-300">
                    <h3 className="text-gray-700 font-medium text-base">
                      Show/Hide Column
                    </h3>
                  </div>
                  <div className="overflow-y-auto">
                    {columns.map((column) => (
                      <div
                        key={column.id}
                        className="flex items-center px-4 py-3 hover:bg-gray-100 border-b border-gray-200"
                      >
                        <input
                          type="checkbox"
                          id={`column-${column.id}`}
                          checked={column.visible}
                          onChange={() => toggleColumnVisibility(column.id)}
                          className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`column-${column.id}`}
                          className="ml-3 text-sm text-gray-700 cursor-pointer"
                        >
                          {column.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative parent-container">
              <button
                onClick={onAddClick}
                className="relative bg-[#05002E] text-[#94A3B8] p-2 rounded-lg hover:bg-[#0A004A]/20 transition-colors border border-[#5D0A72]/10 group"
              >
                <span className="absolute invisible group-hover:visible bg-[#3466ad] text-white text-xs px-2 py-1 rounded-lg -bottom-full left-1/2 transform -translate-x-1/2 z-50">
                  Add New Appointment
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto p-4 bg-[#05002E]">
          <table className="w-full bg-[#05002E]">
            <thead>
              <tr className="text-left text-[#94A3B8] bg-[#03001c]">
                <th className="py-4 px-6 font-medium rounded-l-lg">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="rounded border-[#5D0A72]/30 text-[#5D0A72] focus:ring-[#5D0A72]/30 h-4 w-4"
                    />
                  </div>
                </th>
                {columns.find((c) => c.id === "name")?.visible && (
                  <SortableHeader
                    label="Name"
                    columnKey="patientName"
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    onSort={handleSortClick}
                  />
                )}
                {columns.find((c) => c.id === "doctor")?.visible && (
                  <SortableHeader
                    label="Doctor"
                    columnKey="doctor"
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    onSort={handleSortClick}
                  />
                )}
                {columns.find((c) => c.id === "gender")?.visible && (
                  <SortableHeader
                    label="Gender"
                    columnKey="gender"
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    onSort={handleSortClick}
                  />
                )}
                {columns.find((c) => c.id === "date")?.visible && (
                  <SortableHeader
                    label="Date"
                    columnKey="date"
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    onSort={handleSortClick}
                  />
                )}
                {columns.find((c) => c.id === "time")?.visible && (
                  <SortableHeader
                    label="Time"
                    columnKey="time"
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    onSort={handleSortClick}
                  />
                )}
                {columns.find((c) => c.id === "mobile")?.visible && (
                  <th className="py-4 px-6 font-medium">Mobile</th>
                )}
                {columns.find((c) => c.id === "injury")?.visible && (
                  <SortableHeader
                    label="Injury"
                    columnKey="injury"
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    onSort={handleSortClick}
                  />
                )}
                {columns.find((c) => c.id === "email")?.visible && (
                  <th className="py-4 px-6 font-medium">Email</th>
                )}
                {columns.find((c) => c.id === "status")?.visible && (
                  <SortableHeader
                    label="Status"
                    columnKey="status"
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    onSort={handleSortClick}
                  />
                )}
                {columns.find((c) => c.id === "visitType")?.visible && (
                  <SortableHeader
                    label="Visit Type"
                    columnKey="visitType"
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    onSort={handleSortClick}
                  />
                )}
                <th className="py-4 px-6 font-medium rounded-r-lg text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5D0A72]/10">
              {currentAppointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="text-[#94A3B8] hover:bg-[#02001e]/30 transition-colors even:bg-[#000041] cursor-pointer"
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest('input[type="checkbox"]') ||
                        (e.target as HTMLElement).closest('button')) {
                      return;
                    }
                    onEditClick(appointment);
                  }}
                >
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedAppointments.includes(appointment.id)}
                      onChange={() => handleSelectAppointment(appointment.id)}
                      className="rounded border-[#5D0A72]/30 text-[#5D0A72] focus:ring-[#5D0A72]/30 h-4 w-4"
                    />
                  </td>
                  {columns.find((c) => c.id === "name")?.visible && (
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium ${getAvatarBg(
                            appointment.gender,
                          )}`}
                        >
                          {appointment.patientName.charAt(0)}
                        </div>
                        <div className="truncate max-w-[120px]" title={appointment.patientName}>
                          {appointment.patientName}
                        </div>
                      </div>
                    </td>
                  )}
                  {columns.find((c) => c.id === "doctor")?.visible && (
                    <td className="py-4 px-6">
                      <div className="truncate max-w-[120px]" title={appointment.doctor}>
                        {appointment.doctor}
                      </div>
                    </td>
                  )}
                  {columns.find((c) => c.id === "gender")?.visible && (
                    <td className="py-4 px-6">
                      {appointment.gender === "male" ? "Male" : "Female"}
                    </td>
                  )}
                  {columns.find((c) => c.id === "date")?.visible && (
                    <td className="py-4 px-6">{appointment.date}</td>
                  )}
                  {columns.find((c) => c.id === "time")?.visible && (
                    <td className="py-4 px-6">{appointment.time}</td>
                  )}
                  {columns.find((c) => c.id === "mobile")?.visible && (
                    <td className="py-4 px-6">
                      <div className="truncate max-w-[120px]" title={appointment.phone}>
                        {appointment.phone}
                      </div>
                    </td>
                  )}
                  {columns.find((c) => c.id === "injury")?.visible && (
                    <td className="py-4 px-6">
                      <div className="truncate max-w-[150px]" title={appointment.issue}>
                        {appointment.issue}
                      </div>
                    </td>
                  )}
                  {columns.find((c) => c.id === "email")?.visible && (
                    <td className="py-4 px-6">
                      <div className="truncate max-w-[150px]" title={appointment.email}>
                        {appointment.email}
                      </div>
                    </td>
                  )}
                  {columns.find((c) => c.id === "status")?.visible && (
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          appointment.status,
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  )}
                  {columns.find((c) => c.id === "visitType")?.visible && (
                    <td className="py-4 px-6">
                      <div className="truncate max-w-[120px]" title={appointment.visitType}>
                        {appointment.visitType}
                      </div>
                    </td>
                  )}
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteClick(appointment.id);
                      }}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
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
                  </td>
                </tr>
              ))}
              {currentAppointments.length === 0 && (
                <tr className="text-center">
                  <td colSpan={12} className="py-6 text-[#94A3B8]">
                    {searchTerm.trim()
                      ? "No appointments matching your search"
                      : "No appointments available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-[#05002E] border-t border-[#5D0A72]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-[#94A3B8] text-sm">
            <span>Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="bg-[#03001c] border border-[#5D0A72]/10 rounded-md p-1 text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#5D0A72]/50"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, sortedAppointments.length)} of{" "}
              {sortedAppointments.length} entries
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
            >
              Previous
            </button>

            {paginationItems()}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages || totalPages === 0
                  ? "bg-[#03001c]/50 text-[#94A3B8]/50 cursor-not-allowed"
                  : "bg-[#03001c] text-[#94A3B8] hover:bg-[#0A004A]/50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}