import React, { useEffect, useRef } from "react";
import { Doctor } from "@/components/types/doctor";

interface DoctorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Doctor>) => void;
  formData: Partial<Doctor>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Doctor>>>;
  isEditMode: boolean;
}

export const DoctorFormModal: React.FC<DoctorFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  isEditMode,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'experience' || name === 'consultationFee' ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="bg-[#05002E] rounded-xl w-full max-w-2xl p-6 shadow-lg shadow-blue-900/20 border border-blue-900/20"
      >
        <h2 className="text-xl font-semibold text-white mb-4">
          {isEditMode ? "Edit Doctor" : "Add New Doctor"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[#94A3B8] mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="w-full rounded-md border border-[#5D0A72]/30 bg-[#03001c] text-white p-2"
                required
              />
            </div>
            <div>
              <label className="block text-[#94A3B8] mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department || ""}
                onChange={handleChange}
                className="w-full rounded-md border border-[#5D0A72]/30 bg-[#03001c] text-white p-2"
                required
              />
            </div>
            <div>
              <label className="block text-[#94A3B8] mb-1">Specialization</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization || ""}
                onChange={handleChange}
                className="w-full rounded-md border border-[#5D0A72]/30 bg-[#03001c] text-white p-2"
                required
              />
            </div>
            <div>
              <label className="block text-[#94A3B8] mb-1">Availability</label>
              <input
                type="text"
                name="availability"
                value={formData.availability || ""}
                onChange={handleChange}
                className="w-full rounded-md border border-[#5D0A72]/30 bg-[#03001c] text-white p-2"
                required
              />
            </div>
            <div>
              <label className="block text-[#94A3B8] mb-1">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile || ""}
                onChange={handleChange}
                className="w-full rounded-md border border-[#5D0A72]/30 bg-[#03001c] text-white p-2"
                required
              />
            </div>
            <div>
              <label className="block text-[#94A3B8] mb-1">Degree</label>
              <input
                type="text"
                name="degree"
                value={formData.degree || ""}
                onChange={handleChange}
                className="w-full rounded-md border border-[#5D0A72]/30 bg-[#03001c] text-white p-2"
                required
              />
            </div>
            <div>
              <label className="block text-[#94A3B8] mb-1">Experience (Years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience || ""}
                onChange={handleChange}
                className="w-full rounded-md border border-[#5D0A72]/30 bg-[#03001c] text-white p-2"
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-[#94A3B8] mb-1">Consultation Fee</label>
              <input
                type="number"
                name="consultationFee"
                value={formData.consultationFee || ""}
                onChange={handleChange}
                className="w-full rounded-md border border-[#5D0A72]/30 bg-[#03001c] text-white p-2"
                required
                min="0"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[#94A3B8] mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="w-full rounded-md border border-[#5D0A72]/30 bg-[#03001c] text-white p-2"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-[#94A3B8] hover:bg-[#5D0A72]/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-[#5D0A72] to-[#8A0AA7] text-white hover:opacity-90 transition-opacity"
            >
              {isEditMode ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};