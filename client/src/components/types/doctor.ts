export interface Doctor {
  id: number;
  name: string;
  department: string;
  specialization: string;
  availability: string;
  mobile: string;
  degree: string;
  experience: number;
  consultationFee: number;
  email: string;
}

export interface ColumnToggle {
  id: string;
  label: string;
  visible: boolean;
}