
import React from 'react';
import type { Project } from '../../types';
import PlusIcon from '../icons/PlusIcon';
import TrashIcon from '../icons/TrashIcon';

interface ProjectsFormProps {
  data: Project[];
  onUpdate: (data: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onUpdate }) => {
  const addProject = () => {
    onUpdate([...data, { id: Date.now().toString(), title: '', description: '', githubLink: '', demoLink: '' }]);
  };

  const removeProject = (id: string) => {
    onUpdate(data.filter(proj => proj.id !== id));
  };

  const handleProjectChange = <K extends keyof Project,>(id: string, field: K, value: Project[K]) => {
    onUpdate(data.map(proj => proj.id === id ? { ...proj, [field]: value } : proj));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Projects</h2>
        <button onClick={addProject} type="button" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 transition-colors">
          <PlusIcon />
          Add Project
        </button>
      </div>
      <div className="space-y-6">
        {data.map(proj => (
          <div key={proj.id} className="p-4 bg-gray-700 rounded-lg space-y-4 relative">
            <button onClick={() => removeProject(proj.id)} type="button" className="absolute top-3 right-3 text-gray-400 hover:text-white">
              <TrashIcon />
            </button>
            <input type="text" placeholder="Project Title" value={proj.title} onChange={e => handleProjectChange(proj.id, 'title', e.target.value)} className="form-input w-full" />
            <textarea placeholder="Project description..." value={proj.description} onChange={e => handleProjectChange(proj.id, 'description', e.target.value)} className="form-input w-full" rows={3}></textarea>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="GitHub Link (optional)" value={proj.githubLink} onChange={e => handleProjectChange(proj.id, 'githubLink', e.target.value)} className="form-input" />
              <input type="text" placeholder="Live Demo Link (optional)" value={proj.demoLink} onChange={e => handleProjectChange(proj.id, 'demoLink', e.target.value)} className="form-input" />
            </div>
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

export default ProjectsForm;
