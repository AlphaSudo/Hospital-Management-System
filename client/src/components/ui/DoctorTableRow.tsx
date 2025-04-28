import { memo } from "react";
import { Doctor, ColumnToggle } from "@/components/types/doctor";

interface DoctorTableRowProps {
  doctor: Doctor;
  selectedDoctors: number[];
  handleSelectDoctor: (id: number) => void;
  onEditClick: (doctor: Doctor) => void;
  onDeleteClick: (id: number) => void;
  columns: ColumnToggle[];
}

export const DoctorTableRow = memo(
  ({ doctor, selectedDoctors, handleSelectDoctor, onEditClick, onDeleteClick, columns }: DoctorTableRowProps) => (
    <tr
      className="text-[#94A3B8] hover:bg-[#02001e]/30 transition-colors even:bg-[#000041] cursor-pointer"
      onClick={(e) => {
        // Only open edit form if click is not on a checkbox or button
        if (!e.defaultPrevented) {
          onEditClick(doctor);
        }
      }}
    >
      <td className="py-4 px-6" onClick={(e) => e.preventDefault()}>
        <input
          type="checkbox"
          checked={selectedDoctors.includes(doctor.id)}
          onChange={(e) => {
            e.preventDefault(); // Mark as handled
            e.stopPropagation(); // Prevent row click 
            handleSelectDoctor(doctor.id);
          }}
          className="rounded border-[#5D0A72]/30 text-[#5D0A72] focus:ring-[#5D0A72]/30 h-4 w-4"
          aria-label={`Select doctor ${doctor.id}`}
        />
      </td>
      {columns.find((c) => c.id === 'name')?.visible && (
        <td className="py-4 px-6">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium bg-[#0C4A6E] text-white`}
            >
              {doctor.name.charAt(3)}
            </div>
            <div className="truncate max-w-[120px]" title={doctor.name}>
              {doctor.name}
            </div>
          </div>
        </td>
      )}
      {columns.find((c) => c.id === 'department')?.visible && (
        <td className="py-4 px-6">
          <div className="truncate max-w-[120px]" title={doctor.department}>
            {doctor.department}
          </div>
        </td>
      )}
      {columns.find((c) => c.id === 'specialization')?.visible && (
        <td className="py-4 px-6">
          <div className="truncate max-w-[120px]" title={doctor.specialization}>
            {doctor.specialization}
          </div>
        </td>
      )}
      {columns.find((c) => c.id === 'availability')?.visible && (
        <td className="py-4 px-6">
          <div className="truncate max-w-[150px]" title={doctor.availability}>
            {doctor.availability}
          </div>
        </td>
      )}
      {columns.find((c) => c.id === 'mobile')?.visible && (
        <td className="py-4 px-6">
          <div className="truncate max-w-[120px]" title={doctor.mobile}>
            {doctor.mobile}
          </div>
        </td>
      )}
      {columns.find((c) => c.id === 'degree')?.visible && (
        <td className="py-4 px-6">
          <div className="truncate max-w-[120px]" title={doctor.degree}>
            {doctor.degree}
          </div>
        </td>
      )}
      {columns.find((c) => c.id === 'experience')?.visible && (
        <td className="py-4 px-6">{doctor.experience}</td>
      )}
      {columns.find((c) => c.id === 'consultationFee')?.visible && (
        <td className="py-4 px-6">{doctor.consultationFee}</td>
      )}
      {columns.find((c) => c.id === 'email')?.visible && (
        <td className="py-4 px-6">
          <div className="truncate max-w-[150px]" title={doctor.email}>
            {doctor.email}
          </div>
        </td>
      )}
      <td className="py-4 px-6 text-center" onClick={(e) => e.preventDefault()}>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.preventDefault(); // Mark as handled
              e.stopPropagation(); // Prevent row click
              onEditClick(doctor);
            }}
            className="text-blue-500 hover:text-blue-700 transition-colors"
            aria-label={`Edit doctor ${doctor.id}`}
          >
            <svg
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
            onClick={(e) => {
              e.preventDefault(); // Mark as handled
              e.stopPropagation(); // Prevent row click
              onDeleteClick(doctor.id);
            }}
            className="text-red-500 hover:text-red-700 transition-colors"
            aria-label={`Delete doctor ${doctor.id}`}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  )
);