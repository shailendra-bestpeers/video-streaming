import React from "react";

interface InputProps {
  label: string;
  type?: string;
  value: string;
  name: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label,name, type = "text", value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="text-gray-700 font-medium block mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default Input;
