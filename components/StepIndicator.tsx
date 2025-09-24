
import React from 'react';
import { FormStep } from '../constants';

interface StepIndicatorProps {
  currentStep: FormStep;
  onStepClick: (step: FormStep) => void;
}

const steps = [
  { id: FormStep.BASIC_INFO, label: 'Basic Info' },
  { id: FormStep.SKILLS, label: 'Skills' },
  { id: FormStep.EXPERIENCE, label: 'Experience' },
  { id: FormStep.PROJECTS, label: 'Projects' },
  { id: FormStep.DESIGN, label: 'Design' },
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, onStepClick }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => (
          <li key={step.label} className="md:flex-1">
            <div
              onClick={() => onStepClick(step.id)}
              className="group flex flex-col items-center border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0 cursor-pointer transition-colors"
              style={{
                borderColor: currentStep >= step.id ? 'rgb(139, 92, 246)' : 'rgb(55, 65, 81)',
              }}
            >
              <span 
                className="text-sm font-semibold uppercase tracking-wider"
                style={{
                    color: currentStep >= step.id ? 'rgb(196, 181, 253)' : 'rgb(107, 114, 128)'
                }}
              >
                Step {index + 1}
              </span>
              <span className="text-sm font-medium">{step.label}</span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepIndicator;
