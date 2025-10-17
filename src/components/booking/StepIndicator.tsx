"use client";

type StepIndicatorProps = {
  steps: string[];
  currentStep: number;
  goToStep: (step: number) => void;
};

export default function StepIndicator({ steps, currentStep, goToStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center space-x-2 md:space-x-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <button
            onClick={() => goToStep(index)}
            disabled={index >= currentStep}
            className="flex flex-col items-center cursor-pointer disabled:cursor-not-allowed group"
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300
              ${
                index === currentStep
                  ? "bg-primary text-primary-foreground"
                  : index < currentStep
                  ? "bg-primary/50 text-primary-foreground group-hover:bg-primary/70"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {index + 1}
            </div>
            <span className={`mt-2 hidden text-xs md:block transition-colors duration-300 ${index === currentStep ? 'text-primary font-semibold' : 'text-muted-foreground'} ${index < currentStep ? 'group-hover:text-foreground' : ''}`}>{step}</span>
          </button>
          {index < steps.length - 1 && (
            <div className={`h-0.5 w-8 mx-2 md:w-16 rounded-full transition-colors duration-300 ${index < currentStep ? 'bg-primary/50' : 'bg-secondary'}`} />
          )}
        </div>
      ))}
    </div>
  );
}
