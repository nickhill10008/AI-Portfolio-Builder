
import React, { useState, useCallback } from 'react';
import { FormStep } from './constants';
import type { PortfolioData } from './types';
import BasicInfoForm from './components/forms/BasicInfoForm';
import SkillsForm from './components/forms/SkillsForm';
import ExperienceForm from './components/forms/ExperienceForm';
import ProjectsForm from './components/forms/ProjectsForm';
import DesignForm from './components/forms/DesignForm';
import StepIndicator from './components/StepIndicator';
import { generatePortfolio } from './services/geminiService';
import PortfolioPreview from './components/PortfolioPreview';
import SparklesIcon from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [step, setStep] = useState<FormStep>(FormStep.BASIC_INFO);
  const [formData, setFormData] = useState<PortfolioData>({
    basicInfo: {
      name: '',
      title: '',
      bio: '',
      profilePicture: '',
    },
    skills: {
      technical: [],
      tools: [],
      soft: [],
    },
    experience: [],
    projects: [],
    design: {
      theme: 'dark',
      colorScheme: 'blue',
      layout: 'one-page',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateFormData = useCallback(<T extends keyof PortfolioData>(section: T, data: PortfolioData[T]) => {
    setFormData(prev => ({ ...prev, [section]: data }));
  }, []);

  const nextStep = () => setStep(prev => Math.min(prev + 1, Object.keys(FormStep).length / 2));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  const goToStep = (targetStep: FormStep) => setStep(targetStep);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedHtml(null);
    try {
      const html = await generatePortfolio(formData);
      setGeneratedHtml(html);
      setStep(FormStep.COMPLETE);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderFormStep = () => {
    switch (step) {
      case FormStep.BASIC_INFO:
        return <BasicInfoForm data={formData.basicInfo} onUpdate={(data) => updateFormData('basicInfo', data)} />;
      case FormStep.SKILLS:
        return <SkillsForm data={formData.skills} onUpdate={(data) => updateFormData('skills', data)} />;
      case FormStep.EXPERIENCE:
        return <ExperienceForm data={formData.experience} onUpdate={(data) => updateFormData('experience', data)} />;
      case FormStep.PROJECTS:
        return <ProjectsForm data={formData.projects} onUpdate={(data) => updateFormData('projects', data)} />;
      case FormStep.DESIGN:
        return <DesignForm data={formData.design} onUpdate={(data) => updateFormData('design', data)} />;
      case FormStep.COMPLETE:
         return <PortfolioPreview htmlContent={generatedHtml} error={error} onReset={() => setStep(FormStep.BASIC_INFO)} formData={formData}/>;
      default:
        return null;
    }
  };

  const isLastStep = step === FormStep.DESIGN;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        {step !== FormStep.COMPLETE ? (
          <>
            <header className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                AI Portfolio Builder
              </h1>
              <p className="mt-2 text-lg text-gray-400">
                Craft your professional online presence in minutes.
              </p>
            </header>
            <StepIndicator currentStep={step} onStepClick={goToStep} />
            <main className="bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-10 mt-8 transition-all duration-500">
              {renderFormStep()}
              <div className="mt-10 flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={step === FormStep.BASIC_INFO}
                  className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Back
                </button>
                {isLastStep ? (
                  <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-70 disabled:cursor-wait transition-all flex items-center gap-2"
                  >
                    {isLoading ? 'Generating...' : 'Generate Portfolio'}
                    {!isLoading && <SparklesIcon />}
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            </main>
          </>
        ) : (
          renderFormStep()
        )}
      </div>
    </div>
  );
};

export default App;
