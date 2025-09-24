
import React, { useState } from 'react';
import type { Skills } from '../../types';
import PlusIcon from '../icons/PlusIcon';
import TrashIcon from '../icons/TrashIcon';

interface SkillsFormProps {
  data: Skills;
  onUpdate: (data: Skills) => void;
}

type SkillCategory = keyof Skills;

const SkillInputSection: React.FC<{
    title: string;
    skills: string[];
    onAdd: (skill: string) => void;
    onRemove: (index: number) => void;
}> = ({ title, skills, onAdd, onRemove }) => {
    const [newSkill, setNewSkill] = useState('');

    const handleAdd = () => {
        if (newSkill.trim()) {
            onAdd(newSkill.trim());
            setNewSkill('');
        }
    };

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-3">{title}</h3>
            <div className="flex gap-2 mb-3">
                <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    placeholder={`Add a ${title.toLowerCase().slice(0, -1)} skill`}
                    className="flex-grow bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 p-2.5"
                />
                <button onClick={handleAdd} type="button" className="p-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors">
                    <PlusIcon />
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <span key={index} className="flex items-center gap-2 bg-gray-700 text-gray-200 text-sm font-medium px-3 py-1 rounded-full">
                        {skill}
                        <button onClick={() => onRemove(index)} type="button" className="text-gray-400 hover:text-white">
                            <TrashIcon className="w-3 h-3"/>
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};


const SkillsForm: React.FC<SkillsFormProps> = ({ data, onUpdate }) => {

    const handleAddSkill = (category: SkillCategory, skill: string) => {
        onUpdate({
            ...data,
            [category]: [...data[category], skill]
        });
    };

    const handleRemoveSkill = (category: SkillCategory, index: number) => {
        onUpdate({
            ...data,
            [category]: data[category].filter((_, i) => i !== index)
        });
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Your Skillset</h2>
            <SkillInputSection title="Technical Skills" skills={data.technical} onAdd={(skill) => handleAddSkill('technical', skill)} onRemove={(index) => handleRemoveSkill('technical', index)} />
            <SkillInputSection title="Tools & Platforms" skills={data.tools} onAdd={(skill) => handleAddSkill('tools', skill)} onRemove={(index) => handleRemoveSkill('tools', index)} />
            <SkillInputSection title="Soft Skills" skills={data.soft} onAdd={(skill) => handleAddSkill('soft', skill)} onRemove={(index) => handleRemoveSkill('soft', index)} />
        </div>
    );
};

export default SkillsForm;
