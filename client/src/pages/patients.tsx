import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Patient, ColumnToggle } from "@/components/types/patient";
import GenericTableCard from "@/components/ui/GenericTableCard";
import {
  GenericFormModal,
  FieldConfig,
} from "@/components/ui/GenericFormModal";
import { DeleteConfirmationDialog } from "@/components/ui/DeleteConfirmationDialog";
import { initialPatients } from "@/assets/data/initialPatients";
import { Header } from "@/components/ui/Header";
import { Sidebar } from "@/components/ui/sidebar";
import { useTheme } from "@/contexts/ThemeContext";
import { TruncatedWithTooltip } from "@/components/utils/constants";
import PatientIcon from "@/assets/icons/PatientIcon";

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [selectedPatients, setSelectedPatients] = useState<number[]>([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Patient>>({});
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

  const [columns, setColumns] = useState<ColumnToggle[]>([
    { id: "checkbox", label: "Select", visible: true },
    { id: "name", label: "Name", visible: true },
    { id: "treatment", label: "Treatment", visible: true },
    { id: "gender", label: "Gender", visible: true },
    { id: "mobile", label: "Mobile", visible: true },
    { id: "admissionDate", label: "Admission Date", visible: true },
    { id: "doctorAssigned", label: "Doctor Assigned", visible: true },
    { id: "address", label: "Address", visible: true },
    { id: "bloodGroup", label: "Blood Group", visible: true },
    { id: "dischargeDate", label: "Discharge Date", visible: true },
    { id: "status", label: "Status", visible: true },
    { id: "actions", label: "Actions", visible: true },
  ]);

  const columnConfig = [
    {
      id: "name",
      key: "name",
      label: "Name",
      render: (item: Patient) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium bg-[#0C4A6E]">
            {item.name.charAt(0)}
          </div>
          <TruncatedWithTooltip text={item.name} maxWidth="max-w-[120px]" />
        </div>
      ),
    },
    {
      id: "treatment",
      key: "treatment",
      label: "Treatment",
      render: (item: Patient) => (
        <TruncatedWithTooltip text={item.treatment} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "gender",
      key: "gender",
      label: "Gender",
      render: (item: Patient) => (
        <TruncatedWithTooltip text={item.gender} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "mobile",
      key: "mobile",
      label: "Mobile",
      render: (item: Patient) => (
        <TruncatedWithTooltip text={item.mobile} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "admissionDate",
      key: "admissionDate",
      label: "Admission Date",
      render: (item: Patient) => (
        <TruncatedWithTooltip text={item.admissionDate} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "doctorAssigned",
      key: "doctorAssigned",
      label: "Doctor Assigned",
      render: (item: Patient) => (
        <TruncatedWithTooltip text={item.doctorAssigned} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "address",
      key: "address",
      label: "Address",
      render: (item: Patient) => (
        <TruncatedWithTooltip text={item.address} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "bloodGroup",
      key: "bloodGroup",
      label: "Blood Group",
      render: (item: Patient) => (
        <TruncatedWithTooltip text={item.bloodGroup} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "dischargeDate",
      key: "dischargeDate",
      label: "Discharge Date",
      render: (item: Patient) => (
        <TruncatedWithTooltip text={item.dischargeDate || "N/A"} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "status",
      key: "status",
      label: "Status",
      render: (item: Patient) => (
        <TruncatedWithTooltip text={item.status} maxWidth="max-w-[120px]" />
      ),
    },
  ];

  const formFields: FieldConfig[] = [
    { id: "name", label: "Name", type: "text", required: true },
    { id: "treatment", label: "Treatment", type: "text", required: true },
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
    },
    { id: "admissionDate", label: "Admission Date", type: "date", required: true,},
    { id: "doctorAssigned", label: "Doctor Assigned", type: "text", required: true },
    { id: "address", label: "Address", type: "text", required: true },
    {
      id: "bloodGroup",
      label: "Blood Group",
      type: "select",
      required: true,
      options: [
        { value: "", label: "Please choose blood type", disabled: true }, // Placeholder option
        { value: "A+", label: "A+" },
        { value: "A-", label: "A-" },
        { value: "B+", label: "B+" },
        { value: "B-", label: "B-" },
        { value: "AB+", label: "AB+" },
        { value: "AB-", label: "AB-" },
        { value: "O+", label: "O+" },
        { value: "O-", label: "O-" },
      ],
    },
    { id: "dischargeDate", label: "Discharge Date", type: "date", required: false },
    {
      id: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { value: "", label: "Please choose status", disabled: true },
        { value: "Admitted", label: "Admitted" },
        { value: "Discharged", label: "Discharged" },
        { value: "Under Observation", label: "Under Observation" },
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

  const handleFormSubmit = (data: Partial<Patient>) => {
    // Validate phone number
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
    if (isEditMode && data.id) {
      setPatients(
        patients.map((patient) =>
          patient.id === data.id ? { ...patient, ...data } : patient,
        ),
      );
      toast({
        title: "Patient Updated",
        description: `${data.name}'s information has been updated successfully.`,
        className: "bg-[#05002E] border border-[#5D0A72]/20 text-white",
      });
    } else {
      const newId =
        patients.length > 0
          ? Math.max(...patients.map((p) => p.id)) + 1
          : 1;
      const newPatient: Patient = { id: newId, ...data } as Patient;
      setPatients([...patients, newPatient]);
      toast({
        title: "Patient Added",
        description: `${data.name} has been added successfully.`,
        className: "bg-[#05002E] border border-[#5D0A72]/20 text-white",
      });
    }
    setIsFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (patientToDelete) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const updatedPatients = patients.filter(
        (patient) => patient.id !== patientToDelete,
      );
      const updatedCurrentPageItems = updatedPatients.slice(start, end);
      const isCurrentPageEmpty = updatedCurrentPageItems.length === 0;
      const patientToRemove = patients.find(
        (p) => p.id === patientToDelete,
      );

      setPatients(updatedPatients);
      if (isCurrentPageEmpty && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
      toast({
        title: "Patient Deleted",
        description: `${patientToRemove?.name || "patient"} has been removed successfully.`,
        variant: "destructive",
        className: "bg-[#450A0A] border border-red-700/50 text-white",
      });
    }
    setIsDeleteDialogOpen(false);
    setPatientToDelete(null);
  };

  const getExportData = (patient: Patient) => ({
    Name: patient.name,
    Treatment: patient.treatment,
    Gender: patient.gender,
    Mobile: patient.mobile,
    AdmissionDate: patient.admissionDate,
    DoctorAssigned: patient.doctorAssigned,
    Address: patient.address,
    BloodGroup: patient.bloodGroup,
    DischargeDate: patient.dischargeDate || "N/A",
    Status: patient.status,
  });

  return (
    <div
      className={`flex h-screen bg-[#05002E] overflow-hidden ${theme === "dark" ? "" : "light-mode"}`}
    >
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Patients"
          icon={<PatientIcon className="h-8 w-8" />}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          language={language}
          setLanguage={setLanguage}
        />
        <div className="flex-1 px-8 py-8 pt-24">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">View Patients</h1>
          </div>

          <GenericTableCard
            items={patients}
            setItems={setPatients}
            selectedItems={selectedPatients}
            setSelectedItems={setSelectedPatients}
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
            onEditClick={(patient) => {
              setFormData(patient);
              setIsEditMode(true);
              setIsFormOpen(true);
            }}
            onDeleteClick={(id) => {
              setPatientToDelete(id);
              setIsDeleteDialogOpen(true);
            }}
            initialItems={initialPatients}
            columnConfig={columnConfig}
            getExportData={getExportData}
            exportFileName="Cliniva_Patients.xlsx"
            entityName="Patients"
          />
          <GenericFormModal
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleFormSubmit}
            formData={formData}
            setFormData={setFormData}
            isEditMode={isEditMode}
            title="Patient"
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