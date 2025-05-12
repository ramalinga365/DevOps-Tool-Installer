'use client';

import { useState, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

interface Step {
  id: string;
  description: string;
  completed: boolean;
}

interface ProgressTrackerProps {
  steps: Step[];
  onToggle: (stepId: string) => void;
  className?: string;
}

export function ProgressTracker({ steps, onToggle, className = '' }: ProgressTrackerProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const completedSteps = steps.filter(step => step.completed).length;
    const newProgress = Math.round((completedSteps / steps.length) * 100);
    setProgress(newProgress);
  }, [steps]);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Installation Progress</span>
        <span>{progress}% Complete</span>
      </div>
      
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-2">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => onToggle(step.id)}
            className={`w-full flex items-center p-3 rounded-lg transition-colors
              ${
                step.completed
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground'
              }
            `}
          >
            <div className={`
              flex-shrink-0 w-5 h-5 mr-3 rounded-full border-2 flex items-center justify-center
              ${
                step.completed
                  ? 'border-primary bg-primary'
                  : 'border-muted-foreground'
              }
            `}>
              {step.completed && (
                <CheckIcon className="w-3 h-3 text-primary-foreground" />
              )}
            </div>
            <span className="text-sm">{step.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
} 