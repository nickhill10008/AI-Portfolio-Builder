
import React, { useState } from 'react';
import type { BasicInfo } from '../../types';

interface BasicInfoFormProps {
  data: BasicInfo;
  onUpdate: (data: BasicInfo) => void;
}

const InputField: React.FC<{ id: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, placeholder?: string }> = ({ id, label, ...props }) => (
    <div>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">{label}</label>
        <input id={id} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" {...props} />
    </div>
);

const TextAreaField: React.FC<{ id: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, placeholder?: string }> = ({ id, label, ...props }) => (
    <div>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">{label}</label>
        <textarea id={id} rows={4} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" {...props}></textarea>
    </div>
);


const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ data, onUpdate }) => {
    const [fileName, setFileName] = useState<string>('');
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                // remove the prefix 'data:image/jpeg;base64,'
                const base64String = (reader.result as string).split(',')[1];
                onUpdate({ ...data, profilePicture: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField id="name" label="Full Name" value={data.name} onChange={e => onUpdate({ ...data, name: e.target.value })} placeholder="e.g., Jane Doe" />
                <InputField id="title" label="Role / Title" value={data.title} onChange={e => onUpdate({ ...data, title: e.target.value })} placeholder="e.g., Senior Frontend Developer" />
            </div>
            <TextAreaField id="bio" label="Short Bio" value={data.bio} onChange={e => onUpdate({ ...data, bio: e.target.value })} placeholder="A brief introduction about yourself." />
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Profile Picture</label>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                    </label>
                </div>
                {fileName && <p className="mt-2 text-sm text-gray-400">Uploaded: {fileName}</p>}
            </div>
        </div>
    );
};

export default BasicInfoForm;
