import React, { useRef, useEffect } from "react";

interface AppointmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Appointment>) => void;
  formData: Partial<Appointment>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Appointment>>>;
  isEditMode: boolean;
}

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

export const AppointmentFormModal: React.FC<AppointmentFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  isEditMode,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-auto">
      <div
        ref={modalRef}
        className="bg-[#020120] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#5D0A72]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5D0A72]/30 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#94A3B8]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2 className="text-white text-lg font-medium">
              {isEditMode ? "Edit Appointment" : "New Appointment"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              id="patientName"
              label="Name*"
              value={formData.patientName || ""}
              onChange={handleInputChange}
              required
            />
            <InputField
              id="email"
              label="Email*"
              type="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="block text-[#94A3B8] text-sm font-medium">
              Gender:
            </label>
            <div className="flex items-center space-x-4">
              <RadioButton
                id="gender-male"
                label="Male"
                checked={formData.gender === "male"}
                onChange={() => handleGenderChange("male")}
              />
              <RadioButton
                id="gender-female"
                label="Female"
                checked={formData.gender === "female"}
                onChange={() => handleGenderChange("female")}
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              id="date"
              label="Choose a date*"
              value={formData.date || ""}
              onChange={handleInputChange}
              required
            />
            <InputField
              id="time"
              label="Time*"
              value={formData.time || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Mobile and Doctor Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              id="phone"
              label="Mobile*"
              value={formData.phone || ""}
              onChange={handleInputChange}
              required
            />
            <SelectField
              id="doctor"
              label="Doctor Name*"
              value={formData.doctor || ""}
              onChange={handleInputChange}
              options={[
                { value: "", label: "Select Doctor" },
                { value: "Dr.Jay Soni", label: "Dr. Jay Soni" },
                { value: "Dr.Sarah Smith", label: "Dr. Sarah Smith" },
                { value: "Dr.Rajesh", label: "Dr. Rajesh" },
                { value: "Dr.Pooja Patel", label: "Dr. Pooja Patel" },
              ]}
              required
            />
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
              value={formData.issue || ""}
              onChange={handleInputChange}
              className="bg-[#03001C] w-full px-4 py-3 rounded-lg text-white border border-[#5D0A72]/30 focus:ring-[#5D0A72]/50 focus:outline-none"
            />
          </div>

          {/* Appointment Status and Visit Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              id="status"
              label="Appointment Status"
              value={formData.status || "Scheduled"}
              onChange={handleInputChange}
              options={[
                { value: "Scheduled", label: "Scheduled" },
                { value: "Completed", label: "Completed" },
                { value: "Cancelled", label: "Cancelled" },
              ]}
            />
            <SelectField
              id="visitType"
              label="Visit Type"
              value={formData.visitType || "New Patient"}
              onChange={handleInputChange}
              options={[
                { value: "New Patient", label: "New Patient" },
                { value: "Follow-Up", label: "Follow-Up" },
              ]}
            />
          </div>

          {/* Form Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-[#494949] text-white rounded-lg hover:bg-[#5D5D5D]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#E53E3E] text-white rounded-lg hover:bg-[#C53030]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Input Field Component
const InputField = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-[#94A3B8] text-sm font-medium">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      className="bg-[#03001C] w-full px-4 py-3 rounded-lg text-white border border-[#5D0A72]/30 focus:ring-[#5D0A72]/50 focus:outline-none"
    />
  </div>
);

// Select Field Component
const SelectField = ({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-[#94A3B8] text-sm font-medium">
      {label}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      className="bg-[#03001C] w-full px-4 py-3 rounded-lg text-white border border-[#5D0A72]/30 appearance-none focus:ring-[#5D0A72]/50 focus:outline-none"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// Radio Button Component
const RadioButton = ({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <div className="flex items-center">
    <input
      id={id}
      type="radio"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-[#5D0A72] border-[#5D0A72]/30 focus:ring-[#5D0A72]/50"
    />
    <label htmlFor={id} className="ml-2 text-[#94A3B8]">
      {label}
    </label>
  </div>
);
