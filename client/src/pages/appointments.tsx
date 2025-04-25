import { useState, useRef, useEffect } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { ChartGradients } from "@/lib/chart-gradients";
import SortableHeader from "@/components/ui/SortableHeader";
import { useToast } from "@/hooks/use-toast";
// import { cn } from "@/lib/utils";

// Define appointment data types
interface Appointment {
  id: number;
  patientName: string;
  doctor: string;
  gender: "male" | "female";
  date: string;
  time: string;
  phone: string;
  issue: string;
  email: string;
  status: "Completed" | "Scheduled" | "Cancelled";
  visitType: "New Patient" | "Follow-Up";
}

// Sample appointment data to match the screenshot
const initialAppointments: Appointment[] = [
  {
    id: 1,
    patientName: "Cara Stevens",
    doctor: "Dr.Rajesh",
    gender: "female",
    date: "11/18/2024",
    time: "09:00",
    phone: "123456789",
    issue: "Fever",
    email: "cara.stevens@example.com",
    status: "Completed",
    visitType: "New Patient",
  },
  {
    id: 2,
    patientName: "John Doe",
    doctor: "Dr.Sarah Smith",
    gender: "male",
    date: "11/22/2024",
    time: "11:30",
    phone: "987654321",
    issue: "Cold",
    email: "john.doe@example.com",
    status: "Cancelled",
    visitType: "Follow-Up",
  },
  {
    id: 3,
    patientName: "Alice Johnson",
    doctor: "Dr.Jay Soni",
    gender: "female",
    date: "11/14/2024",
    time: "09:45",
    phone: "234567890",
    issue: "Headache",
    email: "alice.j@example.com",
    status: "Scheduled",
    visitType: "New Patient",
  },
  {
    id: 4,
    patientName: "Bob Brown",
    doctor: "Dr.Pooja Patel",
    gender: "male",
    date: "11/19/2024",
    time: "13:15",
    phone: "345678901",
    issue: "Back Pain",
    email: "bob.brown@example.com",
    status: "Cancelled",
    visitType: "New Patient",
  },
  {
    id: 5,
    patientName: "Sara Lee",
    doctor: "Dr.Jayesh Shah",
    gender: "female",
    date: "11/21/2024",
    time: "10:30",
    phone: "456789012",
    issue: "Flu",
    email: "sara.lee@example.com",
    status: "Completed",
    visitType: "Follow-Up",
  },
  {
    id: 6,
    patientName: "Tom Harris",
    doctor: "Dr.Sarah Smith",
    gender: "male",
    date: "11/13/2024",
    time: "14:15",
    phone: "567890123",
    issue: "Cough",
    email: "tom.harris@example.com",
    status: "Scheduled",
    visitType: "New Patient",
  },
  {
    id: 7,
    patientName: "Emma Wilson",
    doctor: "Dr.Rajesh",
    gender: "female",
    date: "11/18/2024",
    time: "16:45",
    phone: "678901234",
    issue: "Allergies",
    email: "emma.wilson@example.com",
    status: "Completed",
    visitType: "Follow-Up",
  },
  {
    id: 8,
    patientName: "David Lee",
    doctor: "Dr.Pooja Patel",
    gender: "male",
    date: "11/16/2024",
    time: "11:45",
    phone: "789012345",
    issue: "Stomach Ache",
    email: "david.lee@example.com",
    status: "Scheduled",
    visitType: "New Patient",
  },
  {
    id: 9,
    patientName: "Sophia Turner",
    doctor: "Dr.Jay Soni",
    gender: "female",
    date: "11/19/2024",
    time: "15:45",
    phone: "890123456",
    issue: "Joint Pain",
    email: "sophia.turner@example.com",
    status: "Cancelled",
    visitType: "Follow-Up",
  },
  {
    id: 10,
    patientName: "Michael Brown",
    doctor: "Dr.Sarah Smith",
    gender: "male",
    date: "11/23/2024",
    time: "12:30",
    phone: "901234567",
    issue: "Skin Rash",
    email: "michael.brown@example.com",
    status: "Cancelled",
    visitType: "New Patient",
  },
  {
    id: 11,
    patientName: "Emily Davis",
    doctor: "Dr.Ravi Kumar",
    gender: "female",
    date: "11/25/2024",
    time: "10:00",
    phone: "912345678",
    issue: "Back Pain",
    email: "emily.davis@example.com",
    status: "Cancelled",
    visitType: "Follow-Up",
  },
  {
    id: 12,
    patientName: "Liam Johnson",
    doctor: "Dr.Anita Desai",
    gender: "male",
    date: "11/27/2024",
    time: "14:15",
    phone: "923456789",
    issue: "Allergy",
    email: "liam.johnson@example.com",
    status: "Cancelled",
    visitType: "New Patient",
  },
  {
    id: 13,
    patientName: "Olivia Wilson",
    doctor: "Dr.Ajay Mehta",
    gender: "female",
    date: "11/30/2024",
    time: "09:30",
    phone: "934567890",
    issue: "Migraine",
    email: "olivia.wilson@example.com",
    status: "Cancelled",
    visitType: "Follow-Up",
  },
  {
    id: 14,
    patientName: "Noah Martinez",
    doctor: "Dr.Nina Rao",
    gender: "male",
    date: "12/01/2024",
    time: "16:00",
    phone: "945678901",
    issue: "Stomach Pain",
    email: "noah.martinez@example.com",
    status: "Cancelled",
    visitType: "New Patient",
  },
  {
    id: 15,
    patientName: "Ava Anderson",
    doctor: "Dr.Vikram Shah",
    gender: "female",
    date: "12/03/2024",
    time: "11:45",
    phone: "956789012",
    issue: "Cold & Cough",
    email: "ava.anderson@example.com",
    status: "Cancelled",
    visitType: "Follow-Up",
  },
  {
    id: 16,
    patientName: "James Thomas",
    doctor: "Dr.Rekha Patel",
    gender: "male",
    date: "12/05/2024",
    time: "13:30",
    phone: "967890123",
    issue: "Fever",
    email: "james.thomas@example.com",
    status: "Cancelled",
    visitType: "New Patient",
  },
  {
    id: 17,
    patientName: "Isabella Moore",
    doctor: "Dr.Arjun Roy",
    gender: "female",
    date: "12/07/2024",
    time: "15:00",
    phone: "978901234",
    issue: "Headache",
    email: "isabella.moore@example.com",
    status: "Cancelled",
    visitType: "Follow-Up",
  },
  {
    id: 18,
    patientName: "Benjamin Taylor",
    doctor: "Dr.Swati Verma",
    gender: "male",
    date: "12/10/2024",
    time: "10:45",
    phone: "989012345",
    issue: "Dizziness",
    email: "benjamin.taylor@example.com",
    status: "Cancelled",
    visitType: "New Patient",
  },
  {
    id: 19,
    patientName: "Mia Harris",
    doctor: "Dr.Rohan Nair",
    gender: "female",
    date: "12/12/2024",
    time: "12:00",
    phone: "990123456",
    issue: "Knee Pain",
    email: "mia.harris@example.com",
    status: "Cancelled",
    visitType: "Follow-Up",
  },
  {
    id: 20,
    patientName: "William Clark",
    doctor: "Dr.Meera Kapoor",
    gender: "male",
    date: "12/15/2024",
    time: "14:45",
    phone: "901234567",
    issue: "Chest Congestion",
    email: "william.clark@example.com",
    status: "Cancelled",
    visitType: "New Patient",
  }
];

// Column interface for visibility toggle
interface ColumnToggle {
  id: string;
  label: string;
  visible: boolean;
}

// Sorting types
// type SortOrder = 'asc' | 'desc' | null;
// type SortableColumn = 'id' | 'patientName' | 'doctor' | 'date' | 'time' | 'status' | 'visitType';

export default function AppointmentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [selectedAppointments, setSelectedAppointments] = useState<number[]>(
    [],
  );
  const [selectAll, setSelectAll] = useState(false);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const columnSelectorRef = useRef<HTMLDivElement>(null);

  // Appointment state
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const { toast } = useToast();

  // Sorting state
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const handleSortClick = (column: string) => {
    if (sortColumn === column) {
      setSortOrder((prev) =>
        prev === "asc" ? "desc" : prev === "desc" ? null : "asc",
      );
      if (sortOrder === "desc") setSortColumn(null); // reset column when clearing sort
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Form dialog state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAppointment, setCurrentAppointment] =
    useState<Appointment | null>(null);

  // Delete confirmation dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(
    null,
  );

  // Column visibility state
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

  // Handle clicking outside to close column selector
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        columnSelectorRef.current &&
        !columnSelectorRef.current.contains(event.target as Node)
      ) {
        setShowColumnSelector(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle column visibility
  const toggleColumnVisibility = (columnId: string) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? { ...column, visible: !column.visible }
          : column,
      ),
    );
  };

  // Handle select all appointments
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedAppointments([]);
    } else {
      setSelectedAppointments(
        appointments.map((appointment) => appointment.id),
      );
    }
    setSelectAll(!selectAll);
  };

  // Handle selecting individual appointment
  const handleSelectAppointment = (id: number) => {
    if (selectedAppointments.includes(id)) {
      setSelectedAppointments(
        selectedAppointments.filter((appointmentId) => appointmentId !== id),
      );
    } else {
      setSelectedAppointments([...selectedAppointments, id]);
    }
  };

  // Form handling functions
  const handleAddClick = () => {
    setIsEditMode(false);
    setCurrentAppointment(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (appointment: Appointment) => {
    setIsEditMode(true);
    setCurrentAppointment(appointment);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = (appointmentData: Partial<Appointment>) => {
    if (isEditMode && currentAppointment) {
      // Edit existing appointment
      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === currentAppointment.id
          ? { ...appointment, ...appointmentData as Appointment }
          : appointment
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

  // Delete handling functions
  const handleDeleteClick = (id: number) => {
    setAppointmentToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (appointmentToDelete) {
      // Get the appointment to be deleted
      const appointmentToRemove = appointments.find(a => a.id === appointmentToDelete);
      
      // Filter out the appointment with matching ID
      const updatedAppointments = appointments.filter(
        (appointment) => appointment.id !== appointmentToDelete
      );
      
      setAppointments(updatedAppointments);
      
      // Show confirmation toast
      toast({
        title: "Appointment Deleted",
        description: `Appointment for ${appointmentToRemove?.patientName || 'patient'} has been successfully removed.`,
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

  // Function to get color based on status
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

  // Function to get avatar background based on gender
  const getAvatarBg = (gender: string) => {
    return gender === "female" ? "bg-pink-200" : "bg-blue-200";
  };

  // Handle sorting column click
  // const handleSortClick = (column: SortableColumn) => {
  //   if (sortColumn === column) {
  //     // If already sorting by this column, cycle through states: asc -> desc -> null
  //     if (sortOrder === 'asc') {
  //       setSortOrder('desc');
  //     } else if (sortOrder === 'desc') {
  //       setSortOrder(null);
  //       setSortColumn('id'); // Reset to default sorting
  //     }
  //   } else {
  //     // New column sort, start with ascending
  //     setSortColumn(column);
  //     setSortOrder('asc');
  //   }
  // };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Sort appointments
  const sortedAppointments = [...appointments].sort((a, b) => {
    if (sortOrder === null) {
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

  // Paginate appointments
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = sortedAppointments.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(sortedAppointments.length / itemsPerPage);

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

  const handleFormInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (gender: "male" | "female") => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleFormSubmit(formData);
  };

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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-auto">
          <div className="bg-[#020120] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#5D0A72]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#5D0A72]/30 flex items-center justify-center overflow-hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#94A3B8]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className="text-white text-lg font-medium">
                  {isEditMode ? "Edit Appointment" : "New Appointment"}
                </h2>
              </div>
              <button
                onClick={handleFormClose}
                className="text-[#94A3B8] hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="p-6 space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="patientName"
                    className="block text-[#94A3B8] text-sm font-medium"
                  >
                    Name*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="patientName"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleFormInputChange}
                      required
                      className="bg-[#03001C] w-full px-4 py-3 rounded-lg text-white border border-[#5D0A72]/30 focus:outline-none focus:ring-1 focus:ring-[#5D0A72]/50"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#94A3B8]">
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
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-[#94A3B8] text-sm font-medium"
                  >
                    Email*
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormInputChange}
                      required
                      className="bg-[#03001C] w-full px-4 py-3 rounded-lg text-white border border-[#5D0A72]/30 focus:outline-none focus:ring-1 focus:ring-[#5D0A72]/50"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#94A3B8]">
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
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="block text-[#94A3B8] text-sm font-medium">
                  Gender:
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      id="gender-male"
                      type="radio"
                      checked={formData.gender === "male"}
                      onChange={() => handleGenderChange("male")}
                      className="w-4 h-4 text-[#5D0A72] border-[#5D0A72]/30 focus:ring-[#5D0A72]/50"
                    />
                    <label
                      htmlFor="gender-male"
                      className="ml-2 text-[#94A3B8]"
                    >
                      Male
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="gender-female"
                      type="radio"
                      checked={formData.gender === "female"}
                      onChange={() => handleGenderChange("female")}
                      className="w-4 h-4 text-[#5D0A72] border-[#5D0A72]/30 focus:ring-[#5D0A72]/50"
                    />
                    <label
                      htmlFor="gender-female"
                      className="ml-2 text-[#94A3B8]"
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="date"
                    className="block text-[#94A3B8] text-sm font-medium"
                  >
                    Choose a date*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleFormInputChange}
                      required
                      placeholder="MM/DD/YYYY"
                      className="bg-[#03001C] w-full px-4 py-3 rounded-lg text-white border border-[#5D0A72]/30 focus:outline-none focus:ring-1 focus:ring-[#5D0A72]/50"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#94A3B8]">
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
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="time"
                    className="block text-[#94A3B8] text-sm font-medium"
                  >
                    Time*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleFormInputChange}
                      required
                      placeholder="HH:MM"
                      className="bg-[#03001C] w-full px-4 py-3 rounded-lg text-white border border-[#5D0A72]/30 focus:outline-none focus:ring-1 focus:ring-[#5D0A72]/50"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#94A3B8]">
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
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile and Doctor Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-[#94A3B8] text-sm font-medium"
                  >
                    Mobile*
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormInputChange}
                      required
                      className="bg-[#03001C] w-full px-4 py-3 rounded-lg text-white border border-[#5D0A72]/30 focus:outline-none focus:ring-1 focus:ring-[#5D0A72]/50"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#94A3B8]">
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
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="doctor"
                    className="block text-[#94A3B8] text-sm font-medium"
                  >
                    Doctor Name*
                  </label>
                  <div className="relative">
                    <select
                      id="doctor"
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleFormInputChange}
                      required
                      className="bg-[#03001C] w-full px-4 py-3 rounded-lg text-white border border-[#5D0A72]/30 focus:outline-none focus:ring-1 focus:ring-[#5D0A72]/50 appearance-none"
                    >
                      <option value="">Select Doctor</option>
                      <option value="Dr.Jay Soni">Dr. Jay Soni</option>
                      <option value="Dr.Sarah Smith">Dr. Sarah Smith</option>
                      <option value="Dr.Rajesh">Dr. Rajesh</option>
                      <option value="Dr.Pooja Patel">Dr. Pooja Patel</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#94A3B8]">
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
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Injury/Condition */}
              <div className="space-y-2">
                <label
                  htmlFor="issue"
                  className="block text-[#94A3B8] text-sm font-medium"
                >
                  Injury/Condition
                </label>
                <textarea
                  id="issue"
                  name="issue"
                  rows={3}
                  value={formData.issue}
                  onChange={handleFormInputChange}
                  className="bg-[#03001C] w-full px-4 py-3 rounded-lg text-white border border-[#5D0A72]/30 focus:outline-none focus:ring-1 focus:ring-[#5D0A72]/50"
                ></textarea>
              </div>

              {/* Appointment Status and Visit Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="status"
                    className="block text-[#94A3B8] text-sm font-medium"
                  >
                    Appointment Status
                  </label>
                  <div className="relative">
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleFormInputChange}
                      className="bg-[#03001C] w-full px-4 py-3 rounded-lg text-white border border-[#5D0A72]/30 focus:outline-none focus:ring-1 focus:ring-[#5D0A72]/50 appearance-none"
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#94A3B8]">
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
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="visitType"
                    className="block text-[#94A3B8] text-sm font-medium"
                  >
                    Visit Type
                  </label>
                  <div className="relative">
                    <select
                      id="visitType"
                      name="visitType"
                      value={formData.visitType}
                      onChange={handleFormInputChange}
                      className="bg-[#03001C] w-full px-4 py-3 rounded-lg text-white border border-[#5D0A72]/30 focus:outline-none focus:ring-1 focus:ring-[#5D0A72]/50 appearance-none"
                    >
                      <option value="New Patient">New Patient</option>
                      <option value="Follow-Up">Follow-Up</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#94A3B8]">
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
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleFormClose}
                  className="px-6 py-2 bg-[#494949] text-white rounded-lg hover:bg-[#5D5D5D] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#E53E3E] text-white rounded-lg hover:bg-[#C53030] transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-[#020120] rounded-lg w-full max-w-md p-6">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-red-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                Delete Appointment
              </h3>
              <p className="text-[#94A3B8]">
                Are you sure you want to delete this appointment? This action
                cannot be undone.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancelDelete}
                className="px-6 py-2 bg-[#494949] text-white rounded-lg hover:bg-[#5D5D5D] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-6 py-2 bg-[#E53E3E] text-white rounded-lg hover:bg-[#C53030] transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-[#040223] gradient-bg-background">
        {/* Header */}
        <header className="h-24 px-8 flex items-center justify-between border-b border-[#5D0A72]/10">
          {/* Header Title with icon and sidebar toggle */}
          <div className="flex items-center gap-3">
            {/* Sidebar toggle button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-10 h-10 flex items-center justify-center bg-[#05002E] rounded-lg shadow-md transition-all hover:bg-[#0A004A]/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#94A3B8]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <div className="w-10 h-10 flex items-center justify-center bg-[#05002E] rounded-lg shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#94A3B8]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <span className="text-[#94A3B8] font-semibold text-lg">
              Appointments
            </span>
          </div>

          {/* Search and user menu */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#94A3B8]/70"
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
                className="bg-[#05002E] w-72 text-sm py-2.5 pl-12 pr-4 rounded-xl text-[#94A3B8] placeholder-[#94A3B8]/50 focus:outline-none focus:ring-2 focus:ring-[#5D0A72]/50 border border-[#5D0A72]/10"
              />
            </div>

            {/* Full Screen Button */}
            <button
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen();
                } else if (document.exitFullscreen) {
                  document.exitFullscreen();
                }
              }}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-[#05002E] border border-[#5D0A72]/10 shadow-md hover:bg-[#0A004A]/20 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#94A3B8]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>

            {/* Notification Button */}
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-[#05002E] border border-[#5D0A72]/10 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#94A3B8]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>

            {/* Language Selector - with flags */}
            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-[#05002E] border border-[#5D0A72]/10 shadow-md hover:bg-[#0A004A]/20 transition-colors overflow-hidden p-0"
            >
              {language === "en" ? (
                <div className="flex items-center justify-center w-full h-full">
                  {/* UK Flag */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 60 30"
                    className="w-7 h-7"
                  >
                    <clipPath id="a">
                      <path d="M0 0v30h60V0z" />
                    </clipPath>
                    <clipPath id="b">
                      <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
                    </clipPath>
                    <g clipPath="url(#a)">
                      <path d="M0 0v30h60V0z" fill="#012169" />
                      <path
                        d="M0 0l60 30m0-30L0 30"
                        stroke="#fff"
                        strokeWidth="6"
                      />
                      <path
                        d="M0 0l60 30m0-30L0 30"
                        clipPath="url(#b)"
                        stroke="#C8102E"
                        strokeWidth="4"
                      />
                      <path
                        d="M30 0v30M0 15h60"
                        stroke="#fff"
                        strokeWidth="10"
                      />
                      <path
                        d="M30 0v30M0 15h60"
                        stroke="#C8102E"
                        strokeWidth="6"
                      />
                    </g>
                  </svg>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  {/* Egypt Flag */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 900 600"
                    className="w-7 h-7"
                  >
                    <path fill="#CE1126" d="M0 0h900v600H0z" />
                    <path fill="#FFF" d="M0 0h900v400H0z" />
                    <path d="M0 0h900v200H0z" />
                    <g fill="#C09300" transform="translate(450, 300)">
                      <path d="M-39.6 40.8s66-28.8 79.2 0C39.6 40.8-12 12-39.6 40.8z" />
                      <path d="M-36 31.2s57.6-28.8 72 0c-36-31.2-36-31.2-72 0z" />
                      <path d="M-26.4 24s45.6-21.6 52.8 0c-24-24-52.8 0-52.8 0z" />
                      <path d="M-33.6-43.2c-15.6 15.6-8.4 48 7.2 64.8 12 13.2 38.4 31.2 38.4 31.2S18.2 36.9 4.4 19.7C-9.4 2.5-19.8-18.9-14.6-35.3c6-19.2-4.8-22.8-19.2-7.2z" />
                      <path d="M-24-28.8c0 16.8 15.6 38.4 26.4 48 10.8 9.6 31.2 19.2 31.2 19.2s-25.2-21.6-36-38.4C-12.6-16.8-12-44.4-24-28.8z" />
                    </g>
                  </svg>
                </div>
              )}
            </button>

            {/* User Profile */}
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#5D0A72]/20 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Appointments Content */}
        <div className="flex-1 px-8 py-8 bg-[#040223]">
          {/* Breadcrumbs and Title */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-[#94A3B8]/70 mb-2">
              <span>View Appointments</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mx-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span>Appointment</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mx-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span>View</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Appointment</h1>
          </div>

          {/* Appointments Table Card */}
          <div
            style={{
              padding: "2px",
              borderRadius: "1rem", // Equivalent to rounded-2xl
              background:
                "conic-gradient(#072f93 0deg, #03115e 45deg, #031b78 90deg, #0f42c1 135deg, #021a70 180deg, #031a63 225deg, #0a70d2 270deg, #0e82ea 315deg, #072f93 360deg)",
              display: "grid",
              boxShadow: `
                0 4px 8px rgba(7, 47, 147, 0.3),         /* Outer shadow - subtle blue glow */
                0 0 12px rgba(14, 130, 234, 0.4),         /* Outer glow - more intense */
             
              `,
            }}
          >
            <div
              className="bg-[#05002E] rounded-xl overflow-hidden shadow-lg "
              style={{
                boxShadow: `inset 0 2px 4px rgba(3, 17, 94, 0.6),     /* Inset shadow - top */
            inset 0 -2px 6px rgba(2, 26, 112, 0.8)    /* Inset shadow - bottom */`,
              }}
            >
              {/* Table Header */}

              <div className="p-5 flex items-center justify-between border-b border-[#5D0A72]/10  ">
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
                      className="bg-[#02001E] text-sm py-2 pl-10 pr-4 rounded-lg text-[#94A3B8] placeholder-[#94A3B8]/50 focus:outline-none focus:ring-1 focus:ring-[#5D0A72]/50 border border-[#5D0A72]/10 w-full"
                    />
                  </div>
                </div>

                {/* Table Actions */}
                <div className="flex items-center gap-2">
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

                    {/* Column Selector Popup */}
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
                                onChange={() =>
                                  toggleColumnVisibility(column.id)
                                }
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

                  <button
                    onClick={handleAddClick}
                    className="relative bg-[#05002E] text-[#94A3B8] p-2 rounded-lg hover:bg-[#0A004A]/20 transition-colors border border-[#5D0A72]/10 group"
                  >
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
                    <span className="absolute invisible group-hover:visible bg-[#3466ad] text-white text-xs px-2 py-1 rounded-lg -bottom-full left-1/2 transform -translate-x-1/2 z-50">
                      Add
                    </span>
                  </button>

                  <button className="relative bg-[#05002E] text-[#94A3B8] p-2 rounded-lg hover:bg-[#0A004A]/20 transition-colors border border-[#5D0A72]/10 group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="absolute invisible group-hover:visible bg-[#3466ad] text-white text-xs px-2 py-1 rounded-lg -bottom-full left-1/2 transform -translate-x-1/2 z-50">
                      Refresh
                    </span>
                  </button>

                  <button className="relative bg-[#05002E] text-[#94A3B8] p-2 rounded-lg hover:bg-[#0A004A]/20 transition-colors border border-[#5D0A72]/10 group">
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
                      <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                    </svg>
                    <span className="absolute invisible group-hover:visible bg-[#3466ad] text-white text-xs px-2 py-1 rounded-lg -bottom-full left-1/2 transform -translate-x-1/2 z-50">
                      Xlsx Download
                    </span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto p-4 bg-[#05002E] ">
                {/* //#03001c          */}

                <table className="w-full   bg-[#05002E] ">
                  <thead>
                    <tr className="text-left text-[#94A3B8]   bg-[#03001c] ">
                      <th className="py-4 px-6 font-medium rounded-l-lg">
                        <div className="flex items-center ">
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            className="rounded border-[#5D0A72]/30 text-[#5D0A72] focus:ring-[#5D0A72]/30 h-4 w-4"
                          />
                        </div>
                      </th>
                      {columns.find((c) => c.id === "name")?.visible && (
                        /* */
                        // <th
                        //   className="group py-4 px-6 font-medium cursor-pointer "
                        //   onClick={() => handleSortClick('patientName')}
                        // >
                        //   <div className="flex items-center gap-1">
                        //     Name
                        //     {sortColumn === 'patientName' && sortOrder === 'asc' && (
                        //       <span className="flex items-center">
                        //         <svg
                        //           xmlns="http://www.w3.org/2000/svg"
                        //           className="h-4 w-4 text-blue-400 group-hover:text-white"
                        //           viewBox="0 0 20 20"
                        //           fill="currentColor"
                        //         >
                        //           <path
                        //             fillRule="evenodd"
                        //             d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        //             clipRule="evenodd"
                        //           />
                        //         </svg>
                        //       </span>
                        //     )}
                        //     {sortColumn === 'patientName' && sortOrder === 'desc' && (
                        //       <span className="flex items-center">
                        //         <svg
                        //           xmlns="http://www.w3.org/2000/svg"
                        //           className="h-4 w-4 text-blue-400 group-hover:text-white"
                        //           viewBox="0 0 20 20"
                        //           fill="currentColor"
                        //         >
                        //           <path
                        //             fillRule="evenodd"
                        //             d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        //             clipRule="evenodd"
                        //           />
                        //         </svg>
                        //       </span>
                        //     )}
                        //     {/* Show neutral hover arrow when sort is inactive */}
                        //     {(sortColumn !== 'patientName' || !sortOrder) && (
                        //       <svg
                        //         xmlns="http://www.w3.org/2000/svg"
                        //         className="h-4 w-4 text-gray-400 hidden group-hover:inline-block"
                        //         viewBox="0 0 20 20"
                        //         fill="currentColor"
                        //       >
                        //         <path
                        //           fillRule="evenodd"
                        //           d="M5.293 14.707a1 1 0 001.414 0L10 11.414l3.293 3.293a1 1 0 001.414-1.414l-4-4a1 1 0-001.414 0l-4 4a1 1 0 000 1.414z"
                        //           clipRule="evenodd"
                        //         />
                        //       </svg>
                        //     )}
                        //   </div>
                        // </th>
                        <SortableHeader
                          label="Name"
                          columnKey="patientName"
                          sortColumn={sortColumn}
                          sortOrder={sortOrder}
                          onSort={handleSortClick}
                        />
                      )}
                      {columns.find((c) => c.id === "doctor")?.visible && (
                        // <th
                        //   className="group py-4 px-6 font-medium cursor-pointer "
                        //   onClick={() => handleSortClick("doctor")}
                        // >
                        //   <div className="flex items-center gap-1">
                        //     Doctor
                        //     {sortColumn === "doctor" && sortOrder === "asc" && (
                        //       <span>
                        //         <svg
                        //           xmlns="http://www.w3.org/2000/svg"
                        //           className="h-4 w-4 text-blue-400 group-hover:text-white"
                        //           viewBox="0 0 20 20"
                        //           fill="currentColor"
                        //         >
                        //           <path
                        //             fillRule="evenodd"
                        //             d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        //             clipRule="evenodd"
                        //           />
                        //         </svg>
                        //       </span>
                        //     )}
                        //     {sortColumn === "doctor" &&
                        //       sortOrder === "desc" && (
                        //         <span>
                        //           <svg
                        //             xmlns="http://www.w3.org/2000/svg"
                        //             className="h-4 w-4 text-blue-400 group-hover:text-white"
                        //             viewBox="0 0 20 20"
                        //             fill="currentColor"
                        //           >
                        //             <path
                        //               fillRule="evenodd"
                        //               d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        //               clipRule="evenodd"
                        //             />
                        //           </svg>
                        //         </span>
                        //       )}
                        //     {(sortColumn !== "doctor" || !sortOrder) && (
                        //       <svg
                        //         xmlns="http://www.w3.org/2000/svg"
                        //         className="h-4 w-4 text-gray-400 hidden group-hover:inline-block"
                        //         viewBox="0 0 20 20"
                        //         fill="currentColor"
                        //       >
                        //         <path
                        //           fillRule="evenodd"
                        //           d="M5.293 14.707a1 1 0 001.414 0L10 11.414l3.293 3.293a1 1 0 001.414-1.414l-4-4a1 1 0-001.414 0l-4 4a1 1 0 000 1.414z"
                        //           clipRule="evenodd"
                        //         />
                        //       </svg>
                        //     )}
                        //   </div>
                        // </th>
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
                      <th className="py-4 px-6 font-medium rounded-r-lg">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#5D0A72]/10">
                    {currentAppointments.map((appointment) => (
                      <tr
                        key={appointment.id}
                        className="text-[#94A3B8] hover:bg-[#02001e]/30 transition-colors even:bg-[#000041] "
                      >
                        <td className="py-4 px-6">
                          <input
                            type="checkbox"
                            checked={selectedAppointments.includes(
                              appointment.id,
                            )}
                            onChange={() =>
                              handleSelectAppointment(appointment.id)
                            }
                            className="rounded border-[#5D0A72]/30 text-[#5D0A72] focus:ring-[#5D0A72]/30 h-4 w-4"
                          />
                        </td>
                        {columns.find((c) => c.id === "name")?.visible && (
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${getAvatarBg(appointment.gender)}`}
                              >
                                <span className="text-sm font-medium">
                                  {appointment.patientName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <span>{appointment.patientName}</span>
                            </div>
                          </td>
                        )}
                        {columns.find((c) => c.id === "doctor")?.visible && (
                          <td className="py-4 px-6">{appointment.doctor}</td>
                        )}
                        {columns.find((c) => c.id === "gender")?.visible && (
                          <td className="py-4 px-6">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                appointment.gender === "female"
                                  ? "bg-pink-100 text-pink-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {appointment.gender}
                            </span>
                          </td>
                        )}
                        {columns.find((c) => c.id === "date")?.visible && (
                          <td className="py-4 px-6">{appointment.date}</td>
                        )}
                        {columns.find((c) => c.id === "time")?.visible && (
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2 text-[#94A3B8]/70"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              {appointment.time}
                            </div>
                          </td>
                        )}
                        {columns.find((c) => c.id === "mobile")?.visible && (
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2 text-[#94A3B8]/70"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                              </svg>
                              {appointment.phone}
                            </div>
                          </td>
                        )}
                        {columns.find((c) => c.id === "injury")?.visible && (
                          <td className="py-4 px-6">{appointment.issue}</td>
                        )}
                        {columns.find((c) => c.id === "email")?.visible && (
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2 text-[#94A3B8]/70"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                              </svg>
                              {appointment.email}
                            </div>
                          </td>
                        )}
                        {columns.find((c) => c.id === "status")?.visible && (
                          <td className="py-4 px-6">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}
                            >
                              {appointment.status}
                            </span>
                          </td>
                        )}
                        {columns.find((c) => c.id === "visitType")?.visible && (
                          <td className="py-4 px-6">{appointment.visitType}</td>
                        )}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditClick(appointment)}
                              className="text-blue-500 hover:text-blue-700"
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
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteClick(appointment.id)}
                              className="text-red-500 hover:text-red-700"
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
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="p-4 flex items-center justify-between border-t border-[#5D0A72]/10">
            <div className="text-sm text-[#94A3B8]">
              Items per page:
              <select
                className="ml-2 bg-[#02001E] border border-[#5D0A72]/20 rounded px-2 py-1 text-[#94A3B8]"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="text-sm text-[#94A3B8]">
              {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, sortedAppointments.length)} of{" "}
              {sortedAppointments.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`p-1 rounded-md border border-[#5D0A72]/20 ${
                  currentPage === 1
                    ? "text-[#94A3B8]/30 cursor-not-allowed"
                    : "text-[#94A3B8] hover:bg-[#5D0A72]/10 cursor-pointer"
                }`}
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
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
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Page numbers */}
              <div className="flex items-center">
                {Array.from({ length: Math.min(totalPages, 3) }).map(
                  (_, index) => {
                    // Show current page and 1 page before/after when possible
                    let pageNum;
                    if (totalPages <= 3) {
                      pageNum = index + 1;
                    } else if (currentPage <= 2) {
                      pageNum = index + 1;
                    } else if (currentPage >= totalPages - 1) {
                      pageNum = totalPages - 2 + index;
                    } else {
                      pageNum = currentPage - 1 + index;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 mx-1 rounded-md flex items-center justify-center ${
                          currentPage === pageNum
                            ? "bg-[#5D0A72]/30 text-white"
                            : "text-[#94A3B8] hover:bg-[#5D0A72]/10"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  },
                )}
              </div>

              <button
                className={`p-1 rounded-md border border-[#5D0A72]/20 ${
                  currentPage === totalPages
                    ? "text-[#94A3B8]/30 cursor-not-allowed"
                    : "text-[#94A3B8] hover:bg-[#5D0A72]/10 cursor-pointer"
                }`}
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
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
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
