      import { useState, useRef, useEffect } from "react";
      import { useToast } from "@/hooks/use-toast";
      import { Doctor, ColumnToggle } from "@/components/types/doctor";
      import  GenericTableCard  from "@/components/ui/GenericTableCard";
      import { GenericFormModal, FieldConfig } from "@/components/ui/GenericFormModal";
      import { DeleteConfirmationDialog } from "@/components/ui/DeleteConfirmationDialog";
      import { initialDoctors } from "@/assets/data/initialDoctors";
      import { Header } from "@/components/ui/Header";
      import { Sidebar } from "@/components/ui/sidebar";
      import { useTheme } from "@/contexts/ThemeContext";
      import { TruncatedWithTooltip } from "@/components/utils/constants";
import DoctorWhiteCoatIcon from "@/assets/icons/DoctorWhiteCoatIcon";

      export default function DoctorsPage() {
        const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
        const [selectedDoctors, setSelectedDoctors] = useState<number[]>([]);
        const [showColumnSelector, setShowColumnSelector] = useState(false);
        const [isFormOpen, setIsFormOpen] = useState(false);
        const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
        const [doctorToDelete, setDoctorToDelete] = useState<number | null>(null);
        const [formData, setFormData] = useState<Partial<Doctor>>({});
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

        // Single declaration of columns using useState
        const [columns, setColumns] = useState<ColumnToggle[]>([
          { id: "checkbox", label: "Select", visible: true }, // Added checkbox column
          { id: "name", label: "Name", visible: true },
          { id: "department", label: "Department", visible: true },
          { id: "specialization", label: "Specialization", visible: true },
          { id: "availability", label: "Availability", visible: true },
          { id: "mobile", label: "Mobile", visible: true },
          { id: "degree", label: "Degree", visible: true },
          { id: "experience", label: "Experience (Years)", visible: true },
          { id: "consultationFee", label: "Consultation Fee", visible: true },
          { id: "email", label: "Email", visible: true },
          { id: "actions", label: "Actions", visible: true }, // Added actions column
        ]);

        const columnConfig = [
          {
            id: "name",
            key: "name",
            label: "Name",
            render: (item: Doctor) => (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium bg-[#0C4A6E]">
                  {item.name.charAt(0)}
                </div>
                <TruncatedWithTooltip text={item.name} maxWidth="max-w-[120px]" />
              </div>
            ),
          },
          {
            id: "department",
            key: "department",
            label: "Department",
            render: (item: Doctor) => <TruncatedWithTooltip text={item.department} maxWidth="max-w-[120px]" />,
          },
          {
            id: "specialization",
            key: "specialization",
            label: "Specialization",
            render: (item: Doctor) => <TruncatedWithTooltip text={item.specialization} maxWidth="max-w-[120px]" />,
          },
          {
            id: "availability",
            key: "availability",
            label: "Availability",
            render: (item: Doctor) => <TruncatedWithTooltip text={item.availability} maxWidth="max-w-[120px]" />,
          },
          {
            id: "mobile",
            key: "mobile",
            label: "Mobile",
            sortable: false,
            render: (item: Doctor) => <TruncatedWithTooltip text={item.mobile} maxWidth="max-w-[120px]" />,
          },
          {
            id: "degree",
            key: "degree",
            label: "Degree",
            render: (item: Doctor) => <TruncatedWithTooltip text={item.degree} maxWidth="max-w-[120px]" />,
          },
          {
            id: "experience",
            key: "experience",
            label: "Experience (Years)",
            render: (item: Doctor) => <TruncatedWithTooltip text={String(item.experience)} maxWidth="max-w-[120px]" />,
          },
          {
            id: "consultationFee",
            key: "consultationFee",
            label: "Consultation Fee",
            render: (item: Doctor) => <TruncatedWithTooltip text={String(item.consultationFee)} maxWidth="max-w-[120px]" />,
          },
          {
            id: "email",
            key: "email",
            label: "Email",
            sortable: false,
            render: (item: Doctor) => <TruncatedWithTooltip text={item.email} maxWidth="max-w-[150px]" />,
          },
        ];

        const formFields: FieldConfig[] = [
          { id: "name", label: "Name", type: "text", required: true },
          { id: "department", label: "Department", type: "text", required: true },
          { id: "specialization", label: "Specialization", type: "text", required: true },
          { id: "availability", label: "Availability", type: "text", required: true },
          { id: "mobile", label: "Mobile", type: "text", required: true },
          { id: "degree", label: "Degree", type: "text", required: true },
          { id: "experience", label: "Experience (Years)", type: "number", required: true },
          { id: "consultationFee", label: "Consultation Fee", type: "number", required: true },
          { id: "email", label: "Email", type: "email", required: true, maxWidth: "col-span-2" },
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

        const handleFormSubmit = (data: Partial<Doctor>) => {
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
            setDoctors(doctors.map((doctor) => (doctor.id === data.id ? { ...doctor, ...data } : doctor)));
            toast({
              title: "Doctor Updated",
              description: `${data.name} \'s information has been updated successfully.`,
              className: "bg-[#05002E] border border-[#5D0A72]/20 text-white",
            });
          } else {
            const newId = doctors.length > 0 ? Math.max(...doctors.map((d) => d.id)) + 1 : 1;
            const newDoctor: Doctor = { id: newId, ...data } as Doctor;
            setDoctors([...doctors, newDoctor]);
            toast({
              title: "Doctor Added",
              description: `${data.name} has been added successfully.`,
              className: "bg-[#05002E] border border-[#5D0A72]/20 text-white",
            });
          }
          setIsFormOpen(false);
        };

        const handleConfirmDelete = () => {
          if (doctorToDelete) {
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            // Filter out the doctor with matching ID
            const updatedDoctors = doctors.filter((doctor) => doctor.id !== doctorToDelete);
            const updatedCurrentPageItems = updatedDoctors.slice(start, end);
            const isCurrentPageEmpty = updatedCurrentPageItems.length === 0;
            // Get the doctor to be deleted
            const doctorToRemove = doctors.find((d) => d.id === doctorToDelete);
            
            setDoctors(updatedDoctors);
            if (isCurrentPageEmpty && currentPage > 1) {
              setCurrentPage((prev) => prev - 1);
            }
            toast({
              title: "Doctor Deleted",
              description: `${doctorToRemove?.name||"doctor"} has been removed successfully.`,
              variant: "destructive",
              className: "bg-[#450A0A] border border-red-700/50 text-white",
            });
          }
          setIsDeleteDialogOpen(false);
          setDoctorToDelete(null);
        };

        const getExportData = (doctor: Doctor) => ({
          Name: doctor.name,
          Department: doctor.department,
          Specialization: doctor.specialization,
          Availability: doctor.availability,
          Mobile: doctor.mobile,
          Degree: doctor.degree,
          "Experience (Years)": doctor.experience,
          "Consultation Fee": doctor.consultationFee,
          Email: doctor.email,
        });

        return (
          <div className={`flex h-screen bg-[#05002E] overflow-hidden ${theme === "dark" ? "" : "light-mode"}`}>
            <Sidebar isOpen={sidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header
                title="Doctors"
                icon={<DoctorWhiteCoatIcon className="h-8 w-8"/>}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                language={language}
                setLanguage={setLanguage}
              />
              <div className="flex-1 px-8 py-8 pt-24">
                {/* Breadcrumbs and Title */}
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-white">View Doctors </h1>
                </div>

                <GenericTableCard
                  items={doctors}
                  setItems={setDoctors}
                  selectedItems={selectedDoctors}
                  setSelectedItems={setSelectedDoctors}
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
                  onEditClick={(doctor) => {
                    setFormData(doctor);
                    setIsEditMode(true);
                    setIsFormOpen(true);
                  }}
                  onDeleteClick={(id) => {
                    setDoctorToDelete(id);
                    setIsDeleteDialogOpen(true);
                  
                  }}
                  initialItems={initialDoctors}
                  columnConfig={columnConfig}
                  getExportData={getExportData}
                  exportFileName="Cliniva_Doctors.xlsx"
                  entityName="Doctors" // Pass entityName
                />
                <GenericFormModal
                  isOpen={isFormOpen}
                  onClose={() => setIsFormOpen(false)}
                  onSubmit={handleFormSubmit}
                  formData={formData}
                  setFormData={setFormData}
                  isEditMode={isEditMode}
                  title="Doctor"
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