import React, { useRef, useEffect } from "react";
import { FormFieldRenderer } from './FormFieldRenderer'; // Import the new component

// Make sure FieldConfig is exported or defined here
export interface FieldConfig {
  id: string;
  label: string;
  type: "text" | "email" | "number" | "textarea" | "select" | "radio"| "date" | "tel";
  required?: boolean;
  pattern?: string;
  options?: { value: string; label: string; disabled?: boolean }[];
  defaultValue?: string | number;
  maxWidth?: string;
  
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
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]); // Add dependencies

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const fieldConfig = fields.find(f => f.id === name);
    setFormData((prev) => ({
      ...prev,
      [name]: fieldConfig?.type === 'number' ? Number(value) : value,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"> {/* Added backdrop-blur */}
      <div
        ref={modalRef} // Assign ref to the modal container
        className="bg-gradient-to-br from-[#0a004a] via-[#05002E] to-[#03001c] rounded-xl w-full max-w-2xl p-6 shadow-lg shadow-blue-900/30 border border-[#5D0A72]/30 text-white" // Adjusted background and border
      >
        <h2 className="text-xl font-semibold text-white mb-6">{isEditMode ? `Edit ${title}` : `Add New ${title}`}</h2> {/* Adjusted margin */}
        <form onSubmit={handleSubmit} className="space-y-5"> {/* Adjusted spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5"> {/* Adjusted grid and gap */}
            {fields.map((field) => (
              <div key={field.id} className={field.maxWidth || (field.type === 'textarea' ? 'md:col-span-2' : 'md:col-span-1')}> {/* Span textarea full width on md+ */}
                <label htmlFor={field.id} className="block text-sm font-medium text-[#94A3B8] mb-1.5"> {/* Added htmlFor, adjusted size/margin */}
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>} {/* Added required indicator */}
                </label>
                <FormFieldRenderer // Use the extracted component
                  field={field}
                  value={formData[field.id as keyof T]}
                  onChange={handleInputChange}
                  onRadioChange={handleRadioChange}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 pt-4"> {/* Added padding top */}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-[#94A3B8] hover:bg-[#5D0A72]/20 transition-colors border border-transparent hover:border-[#5D0A72]/50" // Adjusted hover and added border
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-gradient-to-r from-[#5D0A72] to-[#8A0AA7] text-white font-semibold hover:opacity-95 transition-opacity shadow-md hover:shadow-lg" // Adjusted padding, added font-weight and shadow
            >
              {isEditMode ? "Update" : "Add"} {title} {/* Added title to button */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};