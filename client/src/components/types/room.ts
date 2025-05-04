export interface Room {
  id: number;
  roomNo: string;
  patientName: string;
  roomType: string;
  bedNo: string;
  admissionDate: string;
  gender: string;
  mobile: string;
  doctorAssigned: string;
  status: string;
  amountCharged: number;
}

export interface ColumnToggle {
  id: string;
  label: string;
  visible: boolean;
}