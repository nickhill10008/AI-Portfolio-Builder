
import React from 'react';
import type { Experience } from '../../types';
import PlusIcon from '../icons/PlusIcon';
import TrashIcon from '../icons/TrashIcon';

interface ExperienceFormProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onUpdate }) => {
  const addExperience = () => {
    onUpdate([...data, { id: Date.now().toString(), company: '', role: '', startDate: '', endDate: '', description: '' }]);
  };

  const removeExperience = (id: string) => {
    onUpdate(data.filter(exp => exp.id !== id));
  };

  const handleExperienceChange = <K extends keyof Experience,>(id: string, field: K, value: Experience[K]) => {
    onUpdate(data.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Work Experience</h2>
        <button onClick={addExperience} type="button" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 transition-colors">
          <PlusIcon />
          Add Experience
        </button>
      </div>
      <div className="space-y-6">
        {data.map(exp => (
          <div key={exp.id} className="p-4 bg-gray-700 rounded-lg space-y-4 relative">
            <button onClick={() => removeExperience(exp.id)} type="button" className="absolute top-3 right-3 text-gray-400 hover:text-white">
              <TrashIcon />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Company" value={exp.company} onChange={e => handleExperienceChange(exp.id, 'company', e.target.value)} className="form-input" />
              <input type="text" placeholder="Role / Title" value={exp.role} onChange={e => handleExperienceChange(exp.id, 'role', e.target.value)} className="form-input" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Start Date (e.g., Jan 2020)" value={exp.startDate} onChange={e => handleExperienceChange(exp.id, 'startDate', e.target.value)} className="form-input" />
              <input type="text" placeholder="End Date (e.g., Present)" value={exp.endDate} onChange={e => handleExperienceChange(exp.id, 'endDate', e.target.value)} className="form-input" />
            </div>
            <textarea placeholder="Description of your role and accomplishments..." value={exp.description} onChange={e => handleExperienceChange(exp.id, 'description', e.target.value)} className="form-input w-full" rows={3}></textarea>
          </div>
        ))}
      </div>
      <style>{`
        .form-input {
          background-color: #4a5568; /* gray-700 */
          border: 1px solid #718096; /* gray-600 */
          color: white;
          font-size: 0.875rem;
          border-radius: 0.5rem;
          display: block;
          width: 100%;
          padding: 0.625rem;
        }
        .form-input:focus {
          outline: 2px solid transparent;
          outline-offset: 2px;
          border-color: #8b5cf6; /* purple-500 */
          box-shadow: 0 0 0 2px #8b5cf6;
        }
      `}</style>
    </div>
  );
};

export default ExperienceForm;
