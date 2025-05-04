import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Appointment } from "@/components/types/appointment";
import { ColumnToggle } from "@/components/types/patient";
import GenericTableCard from "@/components/ui/GenericTableCard";
import {
  GenericFormModal,
  FieldConfig,
} from "@/components/ui/GenericFormModal";
import { DeleteConfirmationDialog } from "@/components/ui/DeleteConfirmationDialog";
import { initialAppointments } from "@/components/data/initialAppointments";
import { Header } from "@/components/ui/Header";
import { Sidebar } from "@/components/ui/sidebar";
import { useTheme } from "@/lib/ThemeContext";
import { TruncatedWithTooltip } from "@/components/utils/constants";
import AppointmentsIcon from "@/components/icons/AppointmentIcon";


export default function AppointmentsPage() {
  // Sidebar & Language
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  // Appointments Data
  const [appointments, setAppointments] =useState<Appointment[]>(initialAppointments);
  const [selectedAppointments, setSelectedAppointments] = useState<number[]>([],);
  // Sorting & Pagination
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // Form Management
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Appointment>>({});
  const columnSelectorRef = useRef<HTMLDivElement>(null);
    //hooks
  const { toast } = useToast();
  const { theme } = useTheme();
  const [currentAppointment, setCurrentAppointment] =useState<Appointment | null>(null);
  // Delete Dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(null,);
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  // Columns
  const [columns, setColumns] = useState<ColumnToggle[]>([
    { id: "checkbox", label: "Select", visible: true }, // Added checkbox column
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
    { id: "actions", label: "Actions", visible: true },
  ]);

  

const columnConfig = [
     {
      id: "name",
      key: "name",
      label: "Patient Name",
      render: (item: Appointment) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium bg-[#0C4A6E]">
            {item.patientName.charAt(0)}
          </div>
          <TruncatedWithTooltip text={item.patientName} maxWidth="max-w-[120px]" />
        </div>
      ),
    },
    {
      id: "doctor",
      key: "doctor",
      label: "Doctor",
      render: (item: Appointment) => (
        <TruncatedWithTooltip text={item.doctor}  maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "gender",
      key:"gender",
      label:"Gender",
      render: (item: Appointment) => (
        <TruncatedWithTooltip text={item.gender} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "date",
      key: "date",
      label: "Date",
      render: (item: Appointment) => (
        <TruncatedWithTooltip text={item.date} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "time",
      key: "time",
      label: "Time",
      render: (item: Appointment) => (
        <TruncatedWithTooltip text={item.time} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "mobile",
      key: "mobile",
      label: "Mobile",
      render: (item: Appointment) => (
        <TruncatedWithTooltip text={item.phone} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "injury",
      key: "injury",
      label: "Injury",
      render: (item: Appointment) => (
        <TruncatedWithTooltip text={item.issue} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "email",
      key: "email",
      label: "Email",
      render: (item: Appointment) => (
        <TruncatedWithTooltip text={item.email} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "status",
      key:"status",
      label:"Appointment Status",
      render:(item: Appointment) => (
        <TruncatedWithTooltip text={item.status} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id:"visitType",
      key:"visitType",
      label:"Visit Type",
      render:(item: Appointment) => (
        <TruncatedWithTooltip text={item.visitType} maxWidth="max-w-[120px]" />
      ),
    },
];

const formFields: FieldConfig[] = [
  {
    id: "patientName",
    label: "Patient Name",
    type: "text",
    required: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    id:"gender",
    label:"Gender",
    type:"select",
    required:true,
    options: [
      {value:"", label:"Select your gender",disabled:true},
      {value:"male", label:"Male"},
      {value:"female", label:"Female"},
    ],
  },
  { id: "date", label: "Admission Date", type: "date", required: true },
  { id: "time", label: "Time", type: "text", required: true },
  {
      id: "phone",
      label: "Mobile",
      type: "tel",
      required: true,
      pattern: "^(?:\\+[1-9]\\d{10}|\\d{3}-\\d{3}-\\d{4})$",
    },
  {
    id: "doctor",
    label: "Doctor",
    type: "text",
    required: true,
    
  },
  {
    id: "issue",
    label: "Injury / Condition",
    type: "textarea",
    required: true,
  },
  {
    id: "status",
    label: "Appointment Status",
    type: "select",
    required: true,
    options: [
      { value: "", label: "Select status", disabled: true },
      { value: "Scheduled", label: "Scheduled" },
      { value: "Completed", label: "Completed" },
      { value: "Cancelled", label: "Cancelled" },
    ],
  },
  {
    id: "visitType",
    label: "Visit Type",
    type: "select",
    required: true,
    options: [
      { value: "", label: "Select visit type", disabled: true },
      { value: "New Patient", label: "New Patient" },
      { value: "Follow-Up", label: "Follow-Up" },
    ],
  },
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

  const handleFormSubmit = (data: Partial<Appointment>) => {
    // Validate phone number
    const phoneRegex = /^(?:\+[1-9]\d{10}|\d{3}-\d{3}-\d{4})$/;
    if (!data.phone || !phoneRegex.test(data.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number in the format XXX-XXX-XXXX.",
        variant: "destructive",
        className: "bg-[#450A0A] border border-red-700/50 text-white",
      });
      return;
    }

    if (isEditMode && data.id) {
      setAppointments(
        appointments.map((app) =>
          app.id === data.id ? { ...app, ...data } : app,
        ),
      );
      toast({
        title: "Appointment Updated",
        description: `${data.patientName}'s information has been updated successfully.`,
        className: "bg-[#05002E] border border-[#5D0A72]/20 text-white",
      });
    } else {
      const newId =
        appointments.length > 0
          ? Math.max(...appointments.map((a) => a.id)) + 1
          : 1;
      const newAppointments: Appointment = { id: newId, ...data } as Appointment;
      setAppointments([...appointments, newAppointments]);
      toast({
        title: "Appointment Added",
        description: `${data.patientName} has been assigned to appointment successfully.`,
        className: "bg-[#05002E] border border-[#5D0A72]/20 text-white",
      });
    }
    setIsFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (appointmentToDelete) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const updatedAppointments = appointments.filter(
        (app) => app.id !== appointmentToDelete,
      );
      const updatedCurrentPageItems = updatedAppointments.slice(start, end);
      const isCurrentPageEmpty = updatedCurrentPageItems.length === 0;
      const appointmentToRemove = appointments.find(
        (s) => s.id === appointmentToDelete,
      );

      setAppointments(updatedAppointments);
      if (isCurrentPageEmpty && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
      toast({
        title: "Appointment Deleted",
        description: `${appointmentToRemove?.patientName || "Appointment"} has been removed successfully.`,
        variant: "destructive",
        className: "bg-[#450A0A] border border-red-700/50 text-white",
      });
    }
    setIsDeleteDialogOpen(false);
    setAppointmentToDelete(null);
  };

  const getExportData = (appointment: Appointment) => ({
    Name: appointment.patientName,
    Doctor: appointment.doctor,
    Gender: appointment.gender,
    Date: appointment.date,
    Time: appointment.time,
    Phone: appointment.phone,
    Issue: appointment.issue,
    Email: appointment.email,
    Status: appointment.status,
    VisitType: appointment.visitType,
  });

  return (
    <div className={`flex h-screen bg-[#05002E] overflow-hidden ${theme === "dark" ? "" : "light-mode"}`}>

    <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Appointments"
          icon={<AppointmentsIcon className="h-8 w-8" />}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          language={language}
          setLanguage={setLanguage}
        />
       <div className="flex-1 px-8 py-8 pt-24">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">View Appointments</h1>
          </div>
          {/* Appointments Table Card */}
 <GenericTableCard
            items={appointments}
            setItems={setAppointments}
            selectedItems={selectedAppointments}
            setSelectedItems={setSelectedAppointments}
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
            onEditClick={(staffMember) => {
              setFormData(staffMember);
              setIsEditMode(true);
              setIsFormOpen(true);
            }}
            onDeleteClick={(id) => {
              setAppointmentToDelete(id);
              setIsDeleteDialogOpen(true);
            }}
            initialItems={initialAppointments}
            columnConfig={columnConfig}
            getExportData={getExportData}
            exportFileName="Cliniva_Appointments.xlsx"
            entityName="Appointment"
          />
          <GenericFormModal
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleFormSubmit}
            formData={formData}
            setFormData={setFormData}
            isEditMode={isEditMode}
            title="Add / Edit Appointment"
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