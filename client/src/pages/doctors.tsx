import { useState, useRef, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Doctor, ColumnToggle } from "@/components/types/doctor";
import DoctorsTableCard from "@/components/ui/DoctorsTableCard";
import { DoctorFormModal } from "@/components/ui/DoctorFormModal";
import { DeleteConfirmationDialog } from "@/components/ui/DeleteConfirmationDialog";
import { initialDoctors } from "@/components/data/initialDoctors";
import { Header } from "@/components/ui/Header";
import { Sidebar } from "@/components/ui/sidebar";
import { useTheme } from "@/lib/ThemeContext";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [selectedDoctors, setSelectedDoctors] = useState<number[]>([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Doctor>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const columnSelectorRef = useRef<HTMLDivElement>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const { theme } = useTheme();

  const [columns, setColumns] = useState<ColumnToggle[]>([
    { id: "name", label: "Name", visible: true },
    { id: "department", label: "Department", visible: true },
    { id: "specialization", label: "Specialization", visible: true },
    { id: "availability", label: "Availability", visible: true },
    { id: "mobile", label: "Mobile", visible: true },
    { id: "degree", label: "Degree", visible: true },
    { id: "experience", label: "Experience (Years)", visible: true },
    { id: "consultationFee", label: "Consultation Fee", visible: true },
    { id: "email", label: "Email", visible: true },
  ]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        columnSelectorRef.current &&
        !columnSelectorRef.current.contains(event.target as Node) &&
        showColumnSelector
      ) {
        setShowColumnSelector(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColumnSelector]);

  const handleAddClick = useCallback(() => {
    setFormData({});
    setIsEditMode(false);
    setFormModalOpen(true);
  }, []);

  const handleEditClick = useCallback((doctor: Doctor) => {
    setFormData({ ...doctor });
    setIsEditMode(true);
    setFormModalOpen(true);
  }, []);

  const handleDeleteClick = useCallback((id: number) => {
    setDoctorToDelete(id);
    setDeleteDialogOpen(true);
  }, []);

  const handleFormSubmit = useCallback(
    (data: Partial<Doctor>) => {
      if (isEditMode && data.id) {
        setDoctors((prevDoctors) =>
          prevDoctors.map((doctor) =>
            doctor.id === data.id ? { ...doctor, ...data } : doctor
          )
        );
        toast({
          title: "Doctor Updated",
          description: "Doctor information has been updated successfully.",
          className:
            "bg-[#05002E] border border-[#5D0A72]/20 text-white",
        });
      } else {
        const newId =
          doctors.length > 0
            ? Math.max(...doctors.map((doctor) => doctor.id)) + 1
            : 1;
        const newDoctor = {
          id: newId,
          name: data.name || "",
          department: data.department || "",
          specialization: data.specialization || "",
          availability: data.availability || "",
          mobile: data.mobile || "",
          degree: data.degree || "",
          experience: data.experience || 0,
          consultationFee: data.consultationFee || 0,
          email: data.email || "",
        };
        setDoctors([...doctors, newDoctor]);
        toast({
          title: "Doctor Added",
          description: "New doctor has been added successfully.",
          className:
            "bg-[#05002E] border border-[#5D0A72]/20 text-white",
        });
      }
      setFormModalOpen(false);
    },
    [doctors, isEditMode, toast]
  );

  const handleDeleteConfirm = useCallback(() => {
    if (doctorToDelete) {
      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor.id !== doctorToDelete)
      );
      toast({
        title: "Doctor Deleted",
        description: "Doctor has been removed successfully.",
        variant: "destructive",
        className: "bg-[#450A0A] border border-red-700/50 text-white",
      });
    }
    setDeleteDialogOpen(false);
    setDoctorToDelete(null);
  }, [doctorToDelete, toast]);

  return (
    <div className={`flex h-screen bg-[#05002E] overflow-hidden ${theme === 'dark' ? '' : 'light-mode'}`}>
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Doctors Management" 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          language={language}
          setLanguage={setLanguage}
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <DoctorsTableCard
            doctors={doctors}
            setDoctors={setDoctors}
            selectedDoctors={selectedDoctors}
            setSelectedDoctors={setSelectedDoctors}
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
            onAddClick={handleAddClick}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            initialDoctors={initialDoctors}
          />

          <DoctorFormModal
            isOpen={formModalOpen}
            onClose={() => setFormModalOpen(false)}
            onSubmit={handleFormSubmit}
            formData={formData}
            setFormData={setFormData}
            isEditMode={isEditMode}
          />

          <DeleteConfirmationDialog
            isOpen={deleteDialogOpen}
            onCancel={() => setDeleteDialogOpen(false)}
            onConfirm={handleDeleteConfirm}
          />
        </main>
      </div>
    </div>
  );
}