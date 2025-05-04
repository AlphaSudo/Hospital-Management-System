import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Room, ColumnToggle } from "@/components/types/room";
import GenericTableCard from "@/components/ui/GenericTableCard";
import {
  GenericFormModal,
  FieldConfig,
} from "@/components/ui/GenericFormModal";
import { DeleteConfirmationDialog } from "@/components/ui/DeleteConfirmationDialog";
import { initialRooms } from "@/components/data/initialRooms";
import { Header } from "@/components/ui/Header";
import { Sidebar } from "@/components/ui/sidebar";
import { useTheme } from "@/lib/ThemeContext";
import { TruncatedWithTooltip } from "@/components/utils/constants";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Room>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const columnSelectorRef = useRef<HTMLDivElement>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const { theme } = useTheme();


    //icon
    const RoomIcon = () => (
        <svg width="80px" height="80px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" 
        stroke="#ebebef" transform="matrix(1, 0, 0, 1, 0, 0)">
        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
        <g id="SVGRepo_iconCarrier"> <path d="M2 2H0V14H2V12H14V14H16V9C16 7.34315 14.6569 6 13 6H6C6 4.89543 5.10457 4 4 4H2V2Z" 
        fill="#2e3885"/> </g>
        </svg>
    );


  const [columns, setColumns] = useState<ColumnToggle[]>([
    { id: "checkbox", label: "Select", visible: true },
    { id: "roomNo", label: "Room No", visible: true },
    { id: "patientName", label: "Patient Name", visible: true },
    { id: "roomType", label: "Room Type", visible: true },
    { id: "bedNo", label: "Bed No", visible: true },
    { id: "admissionDate", label: "Admission Date", visible: true },
    { id: "gender", label: "Gender", visible: true },
    { id: "mobile", label: "Mobile", visible: true },
    { id: "doctorAssigned", label: "Doctor Assigned", visible: true },
    { id: "status", label: "Status", visible: true },
    { id: "amountCharged", label: "Amount Charged", visible: true },
    { id: "actions", label: "Actions", visible: true },
  ]);

  const columnConfig = [
    
    {
      id: "roomNo",
      key: "roomNo",
      label: "Room No",
      render: (item: Room) => (
        <TruncatedWithTooltip text={item.roomNo} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "patientName",
      key: "patientName",
      label: "Patient Name",
      render: (item: Room) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium bg-[#0C4A6E]">
            {item.patientName.charAt(0)}
          </div>
          <TruncatedWithTooltip text={item.patientName} maxWidth="max-w-[120px]" />
        </div>
      ),
    },
    {
      id: "roomType",
      key: "roomType",
      label: "Room Type",
      render: (item: Room) => (
        <TruncatedWithTooltip text={item.roomType} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "bedNo",
      key: "bedNo",
      label: "Bed No",
      render: (item: Room) => (
        <TruncatedWithTooltip text={item.bedNo} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "admissionDate",
      key: "admissionDate",
      label: "Admission Date",
      render: (item: Room) => (
        <TruncatedWithTooltip text={item.admissionDate} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "gender",
      key: "gender",
      label: "Gender",
      render: (item: Room) => (
        <TruncatedWithTooltip text={item.gender} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "mobile",
      key: "mobile",
      label: "Mobile",
      render: (item: Room) => (
        <TruncatedWithTooltip text={item.mobile} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "doctorAssigned",
      key: "doctorAssigned",
      label: "Doctor Assigned",
      render: (item: Room) => (
        <TruncatedWithTooltip text={item.doctorAssigned} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "status",
      key: "status",
      label: "Status",
      render: (item: Room) => (
        <TruncatedWithTooltip text={item.status} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "amountCharged",
      key: "amountCharged",
      label: "Amount Charged",
      render: (item: Room) => (
        <TruncatedWithTooltip text={`$${item.amountCharged}`} maxWidth="max-w-[120px]" />
      ),
    },
  ];

  const formFields: FieldConfig[] = [
    { id: "roomNo", label: "Room No", type: "text", required: true },
    { id: "patientName", label: "Patient Name", type: "text", required: true },
    {
      id: "roomType",
      label: "Room Type",
      type: "select",
      required: true,
      options: [
        { value: "", label: "Please choose room type", disabled: true },
        { value: "Single", label: "Single" },
        { value: "Double", label: "Double" },
        { value: "ICU", label: "ICU" },
        { value: "Suite", label: "Suite" },
      ],
    },
    { id: "bedNo", label: "Bed No", type: "text", required: true },
    { id: "admissionDate", label: "Admission Date", type: "date", required: true },
    {
      id: "gender",
      label: "Gender",
      type: "select",
      required: true,
      options: [
        { value: "", label: "Please choose gender", disabled: true },
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
      ],
    },
    {
      id: "mobile",
      label: "Mobile",
      type: "tel",
      required: true,
      pattern: "^\\d{3}-\\d{3}-\\d{4}$",
    },
    { id: "doctorAssigned", label: "Doctor Assigned", type: "text", required: true },
    {
      id: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { value: "", label: "Please choose status", disabled: true },
        { value: "Occupied", label: "Occupied" },
        { value: "Vacant", label: "Vacant" },
        { value: "Under Maintenance", label: "Under Maintenance" },
      ],
    },
    { id: "amountCharged", label: "Amount Charged", type: "number", required: true },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        columnSelectorRef.current &&
        !columnSelectorRef.current.contains(event.target as Node)
      ) {
        setShowColumnSelector(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFormSubmit = (data: Partial<Room>) => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!data.mobile || !phoneRegex.test(data.mobile)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number in the format XXX-XXX-XXXX.",
        variant: "destructive",
        className: "bg-[#450A0A] border border-red-700/50 text-white",
      });
      return;
    }
     // Validate roomNo and bedNo for Occupied status
    if (data.status === "Occupied") {
      const isRoomBedTaken = rooms.some(
        (room) =>
          room.id !== (data.id || -1) && // Exclude the current room if editing
          room.roomNo === data.roomNo &&
          room.bedNo === data.bedNo &&
          room.status === "Occupied"
      );
      if (isRoomBedTaken) {
        toast({
          title: "Room and Bed Conflict",
          description: `Room ${data.roomNo} and Bed ${data.bedNo} are already occupied by another patient.`,
          variant: "destructive",
          className: "bg-[#450A0A] border border-red-700/50 text-white",
        });
        return;
      }
    }
 // Validate roomNo and roomType consistency
    const existingRoom = rooms.find(
      (room) => room.roomNo === data.roomNo && room.id !== (data.id || -1)
    );
    if (existingRoom && existingRoom.roomType !== data.roomType) {
      toast({
        title: "Room Type Mismatch",
        description: `Room ${data.roomNo} is already assigned as ${existingRoom.roomType}. Please select the same room type.`,
        variant: "destructive",
        className: "bg-[#450A0A] border border-red-700/50 text-white",
      });
      return;
    }
    if (isEditMode && data.id) {
      setRooms(
        rooms.map((room) =>
          room.id === data.id ? { ...room, ...data } : room,
        ),
      );
      toast({
        title: "Room Updated",
        description: `Room ${data.roomNo}'s information has been updated successfully.`,
        className: "bg-[#05002E] border border-[#5D0A72]/20 text-white",
      });
    } else {
      const newId =
        rooms.length > 0
          ? Math.max(...rooms.map((r) => r.id)) + 1
          : 1;
      const newRoom: Room = { id: newId, ...data } as Room;
      setRooms([...rooms, newRoom]);
      toast({
        title: "Room Added",
        description: `Room ${data.roomNo} has been added successfully.`,
        className: "bg-[#05002E] border border-[#5D0A72]/20 text-white",
      });
    }
    setIsFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (roomToDelete) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const updatedRooms = rooms.filter(
        (room) => room.id !== roomToDelete,
      );
      const updatedCurrentPageItems = updatedRooms.slice(start, end);
      const isCurrentPageEmpty = updatedCurrentPageItems.length === 0;
      const roomToRemove = rooms.find(
        (r) => r.id === roomToDelete,
      );

      setRooms(updatedRooms);
      if (isCurrentPageEmpty && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
      toast({
        title: "Room Deleted",
        description: `Room ${roomToRemove?.roomNo || "room"} has been removed successfully.`,
        variant: "destructive",
        className: "bg-[#450A0A] border border-red-700/50 text-white",
      });
    }
    setIsDeleteDialogOpen(false);
    setRoomToDelete(null);
  };

  const getExportData = (room: Room) => ({
    RoomNo: room.roomNo,
    PatientName: room.patientName,
    RoomType: room.roomType,
    BedNo: room.bedNo,
    AdmissionDate: room.admissionDate,
    Gender: room.gender,
    Mobile: room.mobile,
    DoctorAssigned: room.doctorAssigned,
    Status: room.status,
    AmountCharged: room.amountCharged,
  });

  return (
    <div
      className={`flex h-screen bg-[#05002E] overflow-hidden ${theme === "dark" ? "" : "light-mode"}`}
    >
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Rooms"
          icon={<RoomIcon/>}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          language={language}
          setLanguage={setLanguage}
        />
        <div className="flex-1 px-8 py-8 pt-24">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">View Rooms</h1>
          </div>

          <GenericTableCard
            items={rooms}
            setItems={setRooms}
            selectedItems={selectedRooms}
            setSelectedItems={setSelectedRooms}
            columns={columns}
            setColumns={setColumns}
            showColumnSelector={showColumnSelector}
            setShowColumnSelector={setShowColumnSelector}
            columnSelectorRef={columnSelectorRef}
            sortColumn={sortColumn}
            setSortColumn={setSortColumn}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            onAddClick={() => {
              setFormData({});
              setIsEditMode(false);
              setIsFormOpen(true);
            }}
            onEditClick={(room) => {
              setFormData(room);
              setIsEditMode(true);
              setIsFormOpen(true);
            }}
            onDeleteClick={(id) => {
              setRoomToDelete(id);
              setIsDeleteDialogOpen(true);
            }}
            initialItems={initialRooms}
            columnConfig={columnConfig}
            getExportData={getExportData}
            exportFileName="Cliniva_Rooms.xlsx"
            entityName="Rooms"
          />
          <GenericFormModal
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleFormSubmit}
            formData={formData}
            setFormData={setFormData}
            isEditMode={isEditMode}
            title="Room"
            fields={formFields}
          />

          <DeleteConfirmationDialog
            isOpen={isDeleteDialogOpen}
            onCancel={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleConfirmDelete}
          />
        </div>
      </div>
    </div>
  );
}