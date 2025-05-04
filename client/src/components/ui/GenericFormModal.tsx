import React, { useRef, useEffect } from "react";

export interface FieldConfig {
  id: string;
  label: string;
  type: "text" | "email" | "number" | "textarea" | "select" | "radio"| "date" | "tel";
  required?: boolean;
  pattern?: string; // Add pattern for regex validation
  options?: { value: string; label: string; disabled?: boolean }[];  defaultValue?: string | number;
  maxWidth?: string; // Explicitly optional, no union with undefined needed
  
}

interface GenericFormModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<T>) => void;
  formData: Partial<T>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
  isEditMode: boolean;
  title: string;
  fields: FieldConfig[];
}

export const GenericFormModal = <T extends Record<string, any>>({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  isEditMode,
  title,
  fields,
}: GenericFormModalProps<T>) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["experience", "consultationFee"].includes(name) ? Number(value) : value,
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        <h2 className="text-xl font-semibold text-white mb-4">{isEditMode ? `Edit ${title}` : `Add ${title}`}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.id} className={field.maxWidth || "col-span-1"}>
                <label className="block text-[#94A3B8] mb-1">{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.id}
                    // Use type assertion for formData access
                    value={formData[field.id as keyof T] || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#5D0A72]/30 bg-[#03001c] text-white p-2"
                    required={field.required}
                    rows={3}
                  />
                ) : field.type === "select" ? (
                  <select
                    name={field.id}
                    // Use type assertion and handle potential defaultValue
                    value={formData[field.id as keyof T] || field.defaultValue || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#5D0A72]/30 bg-[#03001c] text-white p-2"
                    required={field.required}
                  >
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "radio" ? (
                  <div className="flex space-x-4">
                    {field.options?.map((opt) => (
                      <div key={opt.value} className="flex items-center">
                        <input
                          type="radio"
                          name={field.id}
                          value={opt.value}
                          // Use type assertion for checked state
                          checked={formData[field.id as keyof T] === opt.value}
                          onChange={() => handleRadioChange(field.id, opt.value)}
                          className="w-4 h-4 text-[#5D0A72] border-[#5D0A72]/30"
                          required={field.required}
                        />
                        <label className="ml-2 text-[#94A3B8]">{opt.label}</label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <input
                    type={field.type}
                    name={field.id}
                    // Use type assertion for value
                    value={formData[field.id as keyof T] || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#5D0A72]/30 bg-[#03001c] text-white p-2"
                    required={field.required}
                    min={field.type === "number" ? 0 : undefined}
                  />
                )}
              </div>
            ))}
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