import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Department, ColumnToggle } from "@/components/types/department";
import GenericTableCard from "@/components/ui/GenericTableCard";
import {
  GenericFormModal,
  FieldConfig,
} from "@/components/ui/GenericFormModal";
import { DeleteConfirmationDialog } from "@/components/ui/DeleteConfirmationDialog";
import { initialDepartments } from "@/components/data/initialDepartments";
import { Header } from "@/components/ui/Header";
import { Sidebar } from "@/components/ui/sidebar";
import { useTheme } from "@/lib/ThemeContext";
import { TruncatedWithTooltip } from "@/components/utils/constants";
import DepartmentIcon from "@/components/icons/DepartmentIcon";

export default function DepartmentsPage() {
  const [departments, setDepartments] =
    useState<Department[]>(initialDepartments);
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<number | null>(
    null,
  );
  const [formData, setFormData] = useState<Partial<Department>>({});
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
    { id: "description", label: "Description", visible: true },
    { id: "head", label: "Head", visible: true },
    { id: "status", label: "Status", visible: true },
    { id: "date", label: "Date", visible: true },
    { id: "actions", label: "Actions", visible: true },
  ]);

  const columnConfig = [
    {
      id: "name",
      key: "name",
      label: "Name",
      render: (item: Department) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium bg-[#0C4A6E]">
            {item.name.charAt(0)}
          </div>
          <TruncatedWithTooltip text={item.name} maxWidth="max-w-[120px]" />
        </div>
      ),
    },
    {
      id: "description",
      key: "description",
      label: "Description",
      render: (item: Department) => (
        <TruncatedWithTooltip
          text={item.description}
          maxWidth="max-w-[120px]"
        />
      ),
    },
    {
      id: "head",
      key: "head",
      label: "Head",
      render: (item: Department) => (
        <TruncatedWithTooltip text={item.head} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "status",
      key: "status",
      label: "Status",
      render: (item: Department) => (
        <TruncatedWithTooltip text={item.status} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "date",
      key: "date",
      label: "Date",
      render: (item: Department) => (
        <TruncatedWithTooltip text={item.date} maxWidth="max-w-[120px]" />
      ),
    },
  ];

  const formFields: FieldConfig[] = [
    { id: "name", label: "Name", type: "text", required: true },
    { id: "description", label: "Description", type: "text", required: true },
    { id: "head", label: "Head", type: "text", required: true },
    { id: "status", label: "Status", type: "text", required: true },
    { id: "date", label: "Date", type: "date", required: true },
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

  const handleFormSubmit = (data: Partial<Department>) => {
    if (isEditMode && data.id) {
      setDepartments(
        departments.map((department) =>
          department.id === data.id ? { ...department, ...data } : department,
        ),
      );
      toast({
        title: "Department Updated",
        description: `${data.name} \'s information has been updated successfully.`,
        className: "bg-[#05002E] border border-[#5D0A72]/20 text-white",
      });
    } else {
      const newId =
        departments.length > 0
          ? Math.max(...departments.map((d) => d.id)) + 1
          : 1;
      const newDepartment: Department = { id: newId, ...data } as Department;
      setDepartments([...departments, newDepartment]);
      toast({
        title: "Department Added",
        description: `${data.name} has been added successfully.`,
        className: "bg-[#05002E] border border-[#5D0A72]/20 text-white",
      });
    }
    setIsFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (departmentToDelete) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      // Filter out the department with matching ID
      const updatedDepartments = departments.filter(
        (department) => department.id !== departmentToDelete,
      );
      const updatedCurrentPageItems = updatedDepartments.slice(start, end);
      const isCurrentPageEmpty = updatedCurrentPageItems.length === 0;
      // Get the department to be deleted
      const departmentToRemove = departments.find(
        (d) => d.id === departmentToDelete,
      );

      setDepartments(updatedDepartments);
      if (isCurrentPageEmpty && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
      toast({
        title: "Department Deleted",
        description: `${departmentToRemove?.name || "department"} has been removed successfully.`,
        variant: "destructive",
        className: "bg-[#450A0A] border border-red-700/50 text-white",
      });
    }
    setIsDeleteDialogOpen(false);
    setDepartmentToDelete(null);
  };

  const getExportData = (department: Department) => ({
    Name: department.name,
    Description: department.description,
    Head: department.head,
    Status: department.status,
    Date: department.date,
  });

  return (
    <div
      className={`flex h-screen bg-[#05002E] overflow-hidden ${theme === "dark" ? "" : "light-mode"}`}
    >
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Departments"
          icon={<DepartmentIcon className="h-8 w-8" />}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          language={language}
          setLanguage={setLanguage}
        />
        <div className="flex-1 px-8 py-8 pt-24 ">
          {/* Breadcrumbs and Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">View Departments </h1>
          </div>

          <GenericTableCard
            items={departments}
            setItems={setDepartments}
            selectedItems={selectedDepartments}
            setSelectedItems={setSelectedDepartments}
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
            onEditClick={(department) => {
              setFormData(department);
              setIsEditMode(true);
              setIsFormOpen(true);
            }}
            onDeleteClick={(id) => {
              setDepartmentToDelete(id);
              setIsDeleteDialogOpen(true);
            }}
            initialItems={initialDepartments}
            columnConfig={columnConfig}
            getExportData={getExportData}
            exportFileName="Cliniva_Departments.xlsx"
            entityName="Departments" // Pass entityName
          />
          <GenericFormModal
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleFormSubmit}
            formData={formData}
            setFormData={setFormData}
            isEditMode={isEditMode}
            title="Department"
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
