import { useState, useRef, useEffect ,useMemo } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Header } from "@/components/ui/Header";
import { AppointmentFormModal } from "@/components/ui/AppointmentFormModal";
import { DeleteConfirmationDialog } from "@/components/ui/DeleteConfirmationDialog";
import AppointmentsIcon from "@/components/icons/AppointmentIcon";
import { ChartGradients } from "@/lib/chart-gradients";
import AppointmentsTableCard from "@/components/ui/AppointmentsTableCard";
import { useToast } from "@/hooks/use-toast";
import { Appointment, ColumnToggle } from "@/components/types/appointment";
import { initialAppointments } from "@/components/data/initialAppointments";



export default function AppointmentsPage() {
  // Sidebar & Language
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<"en" | "ar">("en");

  // Appointments Data
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);
  const [selectedAppointments, setSelectedAppointments] = useState<number[]>(
    [],
  );

  // Sorting & Pagination
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Form Management
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAppointment, setCurrentAppointment] =
    useState<Appointment | null>(null);

  // Delete Dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(
    null,
  );

  // Columns
  const [columns, setColumns] = useState<ColumnToggle[]>([
    { id: "name", label: "Name", visible: true },
    { id: "doctor", label: "Doctor", visible: true },
    { id: "gender", label: "Gender", visible: true },
    { id: "date", label: "Date", visible: true },
    { id: "time", label: "Time", visible: true },
    { id: "mobile", label: "Mobile", visible: true },
    { id: "injury", label: "Injury", visible: true },
    { id: "email", label: "Email", visible: true },
    { id: "status", label: "Appointment Status", visible: true },
    { id: "visitType", label: "Visit Type", visible: true },
  ]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  //hooks
  const { toast } = useToast();
  //refs
  const columnSelectorRef = useRef<HTMLDivElement>(null);
  const formModalRef = useRef<HTMLDivElement>(null);
  const deleteModalRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close column selector, form or delete dialog
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Close column selector if clicked outside
      if (
        columnSelectorRef.current &&
        !columnSelectorRef.current.contains(event.target as Node)
      ) {
        setShowColumnSelector(false);
      }

      // Close form modal if clicked outside
      if (
        isFormOpen &&
        formModalRef.current &&
        !formModalRef.current.contains(event.target as Node)
      ) {
        handleFormClose();
      }

      // Close delete confirmation dialog if clicked outside
      if (
        isDeleteDialogOpen &&
        deleteModalRef.current &&
        !deleteModalRef.current.contains(event.target as Node)
      ) {
        handleCancelDelete();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFormOpen, isDeleteDialogOpen]);

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = (appointmentData: Partial<Appointment>) => {
    if (isEditMode && currentAppointment) {
      // Edit existing appointment
      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === currentAppointment.id
          ? { ...appointment, ...(appointmentData as Appointment) }
          : appointment,
      );

      setAppointments(updatedAppointments);

      toast({
        title: "Appointment Updated",
        description: `Appointment for ${appointmentData.patientName} has been successfully updated.`,
        className: "bg-[#05002E] border border-[#5D0A72]/20 text-white",
      });
    } else {
      // Add new appointment
      const newAppointment = {
        id: Math.max(...appointments.map((a) => a.id)) + 1,
        ...appointmentData,
      } as Appointment;

      setAppointments([...appointments, newAppointment]);

      toast({
        title: "Appointment Created",
        description: `New appointment for ${newAppointment.patientName} has been successfully created.`,
        className: "bg-[#05002E] border border-[#5D0A72]/20 text-white",
      });
    }
    setIsFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (appointmentToDelete) {
      // Get the appointment to be deleted
      const appointmentToRemove = appointments.find(
        (a) => a.id === appointmentToDelete,
      );

      // Filter out the appointment with matching ID
      const updatedAppointments = appointments.filter(
        (appointment) => appointment.id !== appointmentToDelete,
      );

      setAppointments(updatedAppointments);

      // Show confirmation toast
      toast({
        title: "Appointment Deleted",
        description: `Appointment for ${appointmentToRemove?.patientName || "patient"} has been successfully removed.`,
        variant: "destructive",
        className: "bg-[#450A0A] border border-red-700/50 text-white",
      });
    }
    setIsDeleteDialogOpen(false);
    setAppointmentToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setAppointmentToDelete(null);
  };



  // Sorting and pagination are now handled in the AppointmentsTableCard component



  // Form state handlers
  const [formData, setFormData] = useState<Partial<Appointment>>({
    patientName: "",
    email: "",
    gender: "male",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    time: "",
    phone: "",
    doctor: "",
    issue: "",
    status: "Scheduled",
    visitType: "New Patient",
  });

  // Initialize form data when editing
  useEffect(() => {
    if (isFormOpen && isEditMode && currentAppointment) {
      setFormData(currentAppointment);
    } else if (isFormOpen && !isEditMode) {
      // Reset form when adding new appointment
      setFormData({
        patientName: "",
        email: "",
        gender: "male",
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        time: "",
        phone: "",
        doctor: "",
        issue: "",
        status: "Scheduled",
        visitType: "New Patient",
      });
    }
  }, [isFormOpen, isEditMode, currentAppointment]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Add SVG gradients for charts */}
      <ChartGradients />

      {/* Appointment Form Modal */}
      {isFormOpen && (
        <AppointmentFormModal
          isOpen={isFormOpen}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          formData={formData}
          setFormData={setFormData}
          isEditMode={isEditMode}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-[#040223] gradient-bg-background">
        {/* Header */}
        <Header
          title="Appointments"
          icon={<AppointmentsIcon className="h-8 w-8" />}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          language={language}
          setLanguage={setLanguage}
        />

        {/* Appointments Content bg-[#040223]*/}
        <div className="flex-1 px-8 py-8 ">
          {/* Breadcrumbs and Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">View Appointments</h1>
          </div>

          {/* Appointments Table Card */}

          <AppointmentsTableCard
            appointments={appointments}
            setAppointments={setAppointments}
            selectedAppointments={selectedAppointments}
            setSelectedAppointments={setSelectedAppointments}
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
              setIsEditMode(false);
              setCurrentAppointment(null);
              setIsFormOpen(true);
            }}
            onEditClick={(appointment) => {
              setIsEditMode(true);
              setCurrentAppointment(appointment);
              setIsFormOpen(true);
            }}
            onDeleteClick={(id) => {
              setAppointmentToDelete(id);
              setIsDeleteDialogOpen(true);
            }}
            initialAppointments={initialAppointments}
          />
        </div>
      </div>
    </div>
  );
}