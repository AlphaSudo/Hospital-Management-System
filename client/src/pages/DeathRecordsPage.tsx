import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { initialDeathRecords } from "@/assets/data/initialDeathRecords";
import { DeathRecord } from "@/components/types/deathRecords";
import { ColumnToggle } from "@/components/types/patient";
import GenericTableCard from "@/components/ui/GenericTableCard";
import {
  GenericFormModal,
  FieldConfig,
} from "@/components/ui/GenericFormModal";
import { DeleteConfirmationDialog } from "@/components/ui/DeleteConfirmationDialog";
import { Header } from "@/components/ui/Header";
import { Sidebar } from "@/components/ui/sidebar";
import { useTheme } from "@/contexts/ThemeContext";
import { TruncatedWithTooltip } from "@/components/utils/constants";
import DeathRecordsIcon from "@/assets/icons/DeathRecordsIcon";

export default function DeathRecordsPage() {
  const [records, setRecords] = useState<DeathRecord[]>(initialDeathRecords);
  const [selectedRecords, setSelectedRecords] = useState<number[]>([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<DeathRecord>>({});
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
    { id: "caseNumber", label: "Case Number", visible: true },
    { id: "patientName", label: "Patient Name", visible: true },
    { id: "gender", label: "Gender", visible: true },
    { id: "deathDate", label: "Death Date", visible: true },
    { id: "guardianName", label: "Guardian Name", visible: true },
    { id: "mobile", label: "Mobile", visible: true },
    { id: "address", label: "Address", visible: true },
    { id: "notes", label: "Notes", visible: true },
    { id: "actions", label: "Actions", visible: true },
  ]);

  const columnConfig = [
    {
      id: "caseNumber",
      key: "caseNumber",
      label: "Case Number",
      render: (item: DeathRecord) => (
        <TruncatedWithTooltip text={item.caseNumber} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "patientName",
      key: "patientName",
      label: "Patient Name",
      render: (item: DeathRecord) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium bg-[#0C4A6E]">
            {item.patientName.charAt(0)}
          </div>
          <TruncatedWithTooltip text={item.patientName} maxWidth="max-w-[120px]" />
        </div>
      ),
    },
    {
      id: "gender",
      key: "gender",
      label: "Gender",
      render: (item: DeathRecord) => (
        <TruncatedWithTooltip text={item.gender} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "deathDate",
      key: "deathDate",
      label: "Death Date",
      render: (item: DeathRecord) => (
        <TruncatedWithTooltip text={item.deathDate} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "guardianName",
      key: "guardianName",
      label: "Guardian Name",
      render: (item: DeathRecord) => (
        <TruncatedWithTooltip text={item.guardianName} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "mobile",
      key: "mobile",
      label: "Mobile",
      render: (item: DeathRecord) => (
        <TruncatedWithTooltip text={item.mobile} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "address",
      key: "address",
      label: "Address",
      render: (item: DeathRecord) => (
        <TruncatedWithTooltip text={item.address} maxWidth="max-w-[120px]" />
      ),
    },
    {
      id: "notes",
      key: "notes",
      label: "Notes",
      render: (item: DeathRecord) => (
        <TruncatedWithTooltip text={item.notes} maxWidth="max-w-[120px]" />
      ),
    },
  ];

  const formFields: FieldConfig[] = [
    { id: "caseNumber", label: "Case Number", type: "text", required: true },
    { id: "patientName", label: "Patient Name", type: "text", required: true },
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
    { id: "deathDate", label: "Death Date", type: "date", required: true },
    { id: "guardianName", label: "Guardian Name", type: "text", required: true },
    {
      id: "mobile",
      label: "Mobile",
      type: "tel",
      required: true,
    },
    { id: "address", label: "Address", type: "text", required: true },
    { id: "notes", label: "Notes", type: "text", required: false },
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

  const handleFormSubmit = (data: Partial<DeathRecord>) => {
    const phoneRegex = /^(?:\+[1-9]\d{10}|\d{3}-\d{3}-\d{4})$/;
    if (!data.mobile || !phoneRegex.test(data.mobile)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number in the format +12345678901 or XXX-XXX-XXXX.",
        variant: "destructive",
        className: "bg-[#450A0A] border border-red-700/50 text-white",
      });
      return;
    }
    if (isEditMode && data.id) {
      setRecords(
        records.map((record) =>
          record.id === data.id ? { ...record, ...data } : record
        )
      );
      toast({
        title: "Death Record Updated",
        description: `${data.patientName}'s information has been updated successfully.`,
        className: "bg-[#05002E] border border-[#5D0A72]/20 text-white",
      });
    } else {
      const newId =
        records.length > 0
          ? Math.max(...records.map((r) => r.id)) + 1
          : 1;
      const newRecord: DeathRecord = { id: newId, ...data } as DeathRecord;
      setRecords([...records, newRecord]);
      toast({
        title: "Death Record Added",
        description: `${data.patientName} has been added successfully.`,
        className: "bg-[#05002E] border border-[#5D0A72]/20 text-white",
      });
    }
    setIsFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (recordToDelete) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const updatedRecords = records.filter(
        (record) => record.id !== recordToDelete
      );
      const updatedCurrentPageItems = updatedRecords.slice(start, end);
      const isCurrentPageEmpty = updatedCurrentPageItems.length === 0;
      const recordToRemove = records.find(
        (r) => r.id === recordToDelete
      );

      setRecords(updatedRecords);
      if (isCurrentPageEmpty && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
      toast({
        title: "Death Record Deleted",
        description: `${recordToRemove?.patientName || "record"} has been removed successfully.`,
        variant: "destructive",
        className: "bg-[#450A0A] border border-red-700/50 text-white",
      });
    }
    setIsDeleteDialogOpen(false);
    setRecordToDelete(null);
  };

  const getExportData = (record: DeathRecord) => ({
    CaseNumber: record.caseNumber,
    PatientName: record.patientName,
    Gender: record.gender,
    DeathDate: record.deathDate,
    GuardianName: record.guardianName,
    Mobile: record.mobile,
    Address: record.address,
    Notes: record.notes,
  });

  return (
    <div
      className={`flex h-screen bg-[#05002E] overflow-hidden ${theme === "dark" ? "" : "light-mode"}`}
    >
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Death Records"
          icon={<DeathRecordsIcon className="h-8 w-8" />}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          language={language}
          setLanguage={setLanguage}
        />
        <div className="flex-1 px-8 py-8 pt-24">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">View Death Records</h1>
          </div>

          <GenericTableCard
            items={records}
            setItems={setRecords}
            selectedItems={selectedRecords}
            setSelectedItems={setSelectedRecords}
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
            onEditClick={(record) => {
              setFormData(record);
              setIsEditMode(true);
              setIsFormOpen(true);
            }}
            onDeleteClick={(id) => {
              setRecordToDelete(id);
              setIsDeleteDialogOpen(true);
            }}
            initialItems={initialDeathRecords}
            columnConfig={columnConfig}
            getExportData={getExportData}
            exportFileName="Cliniva_DeathRecords.xlsx"
            entityName="Death Records"
          />
          <GenericFormModal
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleFormSubmit}
            formData={formData}
            setFormData={setFormData}
            isEditMode={isEditMode}
            title="Death Record"
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