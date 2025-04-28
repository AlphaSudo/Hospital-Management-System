import { memo } from "react";
import { Appointment, ColumnToggle } from "@/components/types/appointment";
import { AVATAR_BG, STATUS_COLORS } from "@/components/utils/constants";

interface TableRowProps {
  appointment: Appointment;
  selectedAppointments: number[];
  handleSelectAppointment: (id: number) => void;
  onEditClick: (appointment: Appointment) => void;
  onDeleteClick: (id: number) => void;
  columns: ColumnToggle[];
}

export const TableRow = memo(
  ({ appointment, selectedAppointments, handleSelectAppointment, onEditClick, onDeleteClick, columns }: TableRowProps) => (
    <tr
      className="text-[#94A3B8] hover:bg-[#02001e]/30 transition-colors even:bg-[#000041] cursor-pointer"
      onClick={(e) => {
        // Only open edit form if click is not on a checkbox or button
        if (!e.defaultPrevented) {
          onEditClick(appointment);
        }
      }}
    >
      <td className="py-4 px-6" onClick={(e) => e.preventDefault()}>
        <input
          type="checkbox"
          checked={selectedAppointments.includes(appointment.id)}
          onChange={(e) => {
            e.preventDefault(); // Mark as handled
            e.stopPropagation(); // Prevent row click 
            handleSelectAppointment(appointment.id);
          }}
          className="rounded border-[#5D0A72]/30 text-[#5D0A72] focus:ring-[#5D0A72]/30 h-4 w-4"
          aria-label={`Select appointment ${appointment.id}`}
        />
      </td>
      {columns.find((c) => c.id === 'name')?.visible && (
        <td className="py-4 px-6">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium ${AVATAR_BG[appointment.gender]}`}
            >
              {appointment.patientName.charAt(0)}
            </div>
            <div className="truncate max-w-[120px]" title={appointment.patientName}>
              {appointment.patientName}
            </div>
          </div>
        </td>
      )}
      {columns.find((c) => c.id === 'doctor')?.visible && (
        <td className="py-4 px-6">
          <div className="truncate max-w-[120px]" title={appointment.doctor}>
            {appointment.doctor}
          </div>
        </td>
      )}
      {columns.find((c) => c.id === 'gender')?.visible && (
        <td className="py-4 px-6">{appointment.gender === 'male' ? 'Male' : 'Female'}</td>
      )}
      {columns.find((c) => c.id === 'date')?.visible && <td className="py-4 px-6">{appointment.date}</td>}
      {columns.find((c) => c.id === 'time')?.visible && <td className="py-4 px-6">{appointment.time}</td>}
      {columns.find((c) => c.id === 'mobile')?.visible && (
        <td className="py-4 px-6">
          <div className="truncate max-w-[120px]" title={appointment.phone}>
            {appointment.phone}
          </div>
        </td>
      )}
      {columns.find((c) => c.id === 'injury')?.visible && (
        <td className="py-4 px-6">
          <div className="truncate max-w-[150px]" title={appointment.issue}>
            {appointment.issue}
          </div>
        </td>
      )}
      {columns.find((c) => c.id === 'email')?.visible && (
        <td className="py-4 px-6">
          <div className="truncate max-w-[150px]" title={appointment.email}>
            {appointment.email}
          </div>
        </td>
      )}
      {columns.find((c) => c.id === 'status')?.visible && (
        <td className="py-4 px-6">
          <span className={`px-2 py-1 rounded-full text-xs ${STATUS_COLORS[appointment.status]}`}>
            {appointment.status}
          </span>
        </td>
      )}
      {columns.find((c) => c.id === 'visitType')?.visible && (
        <td className="py-4 px-6">
          <div className="truncate max-w-[120px]" title={appointment.visitType}>
            {appointment.visitType}
          </div>
        </td>
      )}
      <td className="py-4 px-6 text-center" onClick={(e) => e.preventDefault()}>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.preventDefault(); // Mark as handled
              e.stopPropagation(); // Prevent row click
              onEditClick(appointment);
            }}
            className="text-blue-500 hover:text-blue-700 transition-colors"
            aria-label={`Edit appointment ${appointment.id}`}
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
              onDeleteClick(appointment.id);
            }}
            className="text-red-500 hover:text-red-700 transition-colors"
            aria-label={`Delete appointment ${appointment.id}`}
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