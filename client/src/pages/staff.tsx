import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Staff, ColumnToggle } from "@/components/types/staff";
import GenericTableCard from "@/components/ui/GenericTableCard";
import {
  GenericFormModal,
  FieldConfig,
} from "@/components/ui/GenericFormModal";
import { DeleteConfirmationDialog } from "@/components/ui/DeleteConfirmationDialog";
import { initialStaff } from "@/components/data/initialStaff";
import { Header } from "@/components/ui/Header";
import { Sidebar } from "@/components/ui/sidebar";
import { useTheme } from "@/lib/ThemeContext";
import { TruncatedWithTooltip } from "@/components/utils/constants";
import StaffIcon from "@/components/icons/StaffIcon";

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>(initialStaff);
  const [selectedStaff, setSelectedStaff] = useState<number[]>([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Staff>>({});
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
    { id: "treatment", label: "Department/Role", visible: true },
    { id: "gender", label: "Gender", visible: true },
    { id: "mobile", label: "Mobile", visible: true },
    { id: "admissionDate", label: "Hire Date", visible: true },
    { id: "doctorAssigned", label: "Supervisor", visible: true },
    { id: "address", label: "Address", visible: true },
    { id: "bloodGroup", label: "Blood Group", visible: true },
    { id: "dischargeDate", label: "Termination Date", visible: true },
    { id: "status", label: "Status", visible: true },
    { id: "actions", label: "Actions", visible: true },
  ]);

  const columnConfig = [
    {
      id: "name",
      key: "name",
      label: "Name",
      render: (item: Staff) => (
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
      label: "Department/Role",
      render: (item: Staff) => (
        <TruncatedWithTooltip text={item.treatment} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "gender",
      key: "gender",
      label: "Gender",
      render: (item: Staff) => (
        <TruncatedWithTooltip text={item.gender} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "mobile",
      key: "mobile",
      label: "Mobile",
      render: (item: Staff) => (
        <TruncatedWithTooltip text={item.mobile} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "admissionDate",
      key: "admissionDate",
      label: "Hire Date",
      render: (item: Staff) => (
        <TruncatedWithTooltip text={item.admissionDate} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "doctorAssigned",
      key: "doctorAssigned",
      label: "Supervisor",
      render: (item: Staff) => (
        <TruncatedWithTooltip text={item.doctorAssigned} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "address",
      key: "address",
      label: "Address",
      render: (item: Staff) => (
        <TruncatedWithTooltip text={item.address} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "bloodGroup",
      key: "bloodGroup",
      label: "Blood Group",
      render: (item: Staff) => (
        <TruncatedWithTooltip text={item.bloodGroup} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "dischargeDate",
      key: "dischargeDate",
      label: "Termination Date",
      render: (item: Staff) => (
        <TruncatedWithTooltip text={item.dischargeDate || "N/A"} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "status",
      key: "status",
      label: "Status",
      render: (item: Staff) => (
        <TruncatedWithTooltip text={item.status} maxWidth="max-w-[120px]" />
      ),
    },
  ];

  const formFields: FieldConfig[] = [
    { id: "name", label: "Name", type: "text", required: true },
    { id: "treatment", label: "Department/Role", type: "text", required: true },
    {
      id: "gender",
      label: "Gender",
      type: "select",
      required: true,
      options: [
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
    { id: "admissionDate", label: "Hire Date", type: "date", required: true },
    { id: "doctorAssigned", label: "Supervisor", type: "text", required: true },
    { id: "address", label: "Address", type: "text", required: true },
    {
      id: "bloodGroup",
      label: "Blood Group",
      type: "select",
      required: true,
      options: [
        { value: "", label: "Please choose blood type", disabled: true },
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
    { id: "dischargeDate", label: "Termination Date", type: "date", required: false },
    {
      id: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { value: "Active", label: "Active" },
        { value: "Terminated", label: "Terminated" },
        { value: "On Leave", label: "On Leave" },
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

  const handleFormSubmit = (data: Partial<Staff>) => {
    // Validate blood group
    if (!data.bloodGroup || data.bloodGroup === "") {
      toast({
        title: "Invalid Blood Group",
        description: "Please select a valid blood type.",
        variant: "destructive",
        className: "bg-[#450A0A] border border-red-700/50 text-white",
      });
      return;
    }

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
      setStaff(
        staff.map((staffMember) =>
          staffMember.id === data.id ? { ...staffMember, ...data } : staffMember,
        ),
      );
      toast({
        title: "Staff Updated",
        description: `${data.name}'s information has been updated successfully.`,
        className: "bg-[#05002E] border border-[#5D0A72]/20 text-white",
      });
    } else {
      const newId =
        staff.length > 0
          ? Math.max(...staff.map((s) => s.id)) + 1
          : 1;
      const newStaff: Staff = { id: newId, ...data } as Staff;
      setStaff([...staff, newStaff]);
      toast({
        title: "Staff Added",
        description: `${data.name} has been added successfully.`,
        className: "bg-[#05002E] border border-[#5D0A72]/20 text-white",
      });
    }
    setIsFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (staffToDelete) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const updatedStaff = staff.filter(
        (staffMember) => staffMember.id !== staffToDelete,
      );
      const updatedCurrentPageItems = updatedStaff.slice(start, end);
      const isCurrentPageEmpty = updatedCurrentPageItems.length === 0;
      const staffToRemove = staff.find(
        (s) => s.id === staffToDelete,
      );

      setStaff(updatedStaff);
      if (isCurrentPageEmpty && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
      toast({
        title: "Staff Deleted",
        description: `${staffToRemove?.name || "staff"} has been removed successfully.`,
        variant: "destructive",
        className: "bg-[#450A0A] border border-red-700/50 text-white",
      });
    }
    setIsDeleteDialogOpen(false);
    setStaffToDelete(null);
  };

  const getExportData = (staff: Staff) => ({
    Name: staff.name,
    "Department/Role": staff.treatment,
    Gender: staff.gender,
    Mobile: staff.mobile,
    HireDate: staff.admissionDate,
    Supervisor: staff.doctorAssigned,
    Address: staff.address,
    BloodGroup: staff.bloodGroup,
    TerminationDate: staff.dischargeDate || "N/A",
    Status: staff.status,
  });

  return (
    <div
      className={`flex h-screen bg-[#05002E] overflow-hidden ${theme === "dark" ? "" : "light-mode"}`}
    >
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Staff"
          icon={<StaffIcon className="h-8 w-8" />}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          language={language}
          setLanguage={setLanguage}
        />
        <div className="flex-1 px-8 py-8 pt-24">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">View Staff</h1>
          </div>

          <GenericTableCard
            items={staff}
            setItems={setStaff}
            selectedItems={selectedStaff}
            setSelectedItems={setSelectedStaff}
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
              setStaffToDelete(id);
              setIsDeleteDialogOpen(true);
            }}
            initialItems={initialStaff}
            columnConfig={columnConfig}
            getExportData={getExportData}
            exportFileName="Cliniva_Staff.xlsx"
            entityName="Staff"
          />
          <GenericFormModal
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleFormSubmit}
            formData={formData}
            setFormData={setFormData}
            isEditMode={isEditMode}
            title="Staff"
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