export interface Staff {
  id: number;
  name: string;
  treatment: string;
  gender: string;
  mobile: string;
  admissionDate: string;
  doctorAssigned: string;
  address: string;
  bloodGroup: string;
  dischargeDate?: string;
  status: string;
}

export interface ColumnToggle {
  id: string;
  label: string;
  visible: boolean;
}