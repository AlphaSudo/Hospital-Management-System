// Define appointment data types
export interface Appointment {
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
// Column interface for visibility toggle
export interface ColumnToggle {
  id: string;
  label: string;
  visible: boolean;
}
