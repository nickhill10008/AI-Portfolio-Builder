
import React from 'react';
import type { Design } from '../../types';

interface DesignFormProps {
  data: Design;
  onUpdate: (data: Design) => void;
}

const RadioGroup: React.FC<{
  label: string;
  name: keyof Design;
  options: { value: string; label: string; colorClass?: string }[];
  selectedValue: string;
  onChange: (value: any) => void;
}> = ({ label, name, options, selectedValue, onChange }) => (
  <div>
    <h3 className="mb-4 font-semibold text-gray-200">{label}</h3>
    <ul className="items-center w-full text-sm font-medium text-gray-200 bg-gray-700 border border-gray-600 rounded-lg sm:flex">
      {options.map((option, index) => (
        <li key={option.value} className={`w-full border-b border-gray-600 sm:border-b-0 ${index < options.length - 1 ? 'sm:border-r' : ''}`}>
          <div className="flex items-center ps-3">
            <input 
              id={`${name}-${option.value}`} 
              type="radio" 
              value={option.value} 
              name={name} 
              checked={selectedValue === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-purple-600 bg-gray-500 border-gray-500 focus:ring-purple-500" 
            />
            <label htmlFor={`${name}-${option.value}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-300 flex items-center gap-2">
              {option.label}
              {option.colorClass && <span className={`w-4 h-4 rounded-full ${option.colorClass}`}></span>}
            </label>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const DesignForm: React.FC<DesignFormProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Design Preferences</h2>
      
      <RadioGroup
        label="Theme"
        name="theme"
        selectedValue={data.theme}
        onChange={(value) => onUpdate({ ...data, theme: value })}
        options={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
        ]}
      />

      <RadioGroup
        label="Primary Color Scheme"
        name="colorScheme"
        selectedValue={data.colorScheme}
        onChange={(value) => onUpdate({ ...data, colorScheme: value })}
        options={[
          { value: 'blue', label: 'Blue', colorClass: 'bg-blue-500' },
          { value: 'green', label: 'Green', colorClass: 'bg-green-500' },
          { value: 'purple', label: 'Purple', colorClass: 'bg-purple-500' },
          { value: 'orange', label: 'Orange', colorClass: 'bg-orange-500' },
          { value: 'cyan', label: 'Cyan', colorClass: 'bg-cyan-500' },
        ]}
      />

      <RadioGroup
        label="Layout"
        name="layout"
        selectedValue={data.layout}
        onChange={(value) => onUpdate({ ...data, layout: value })}
        options={[
          { value: 'one-page', label: 'One-Page Scroll' },
          { value: 'multi-page', label: 'Multi-Section' },
        ]}
      />
    </div>
  );
};

export default DesignForm;
