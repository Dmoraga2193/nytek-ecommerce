import { CheckCircle } from "lucide-react";

interface Step {
  readonly id: number;
  readonly name: string;
}

interface StepsProps {
  steps: readonly Step[];
  currentStep: number;
}

export function Steps({ steps, currentStep }: StepsProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
        <nav aria-label="Progress" className="relative z-10">
          <ol className="flex items-center justify-between w-full">
            {steps.map((step) => (
              <li key={step.name} className="flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  {step.id < currentStep ? (
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center transition-all duration-200">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  ) : step.id === currentStep ? (
                    <div className="w-10 h-10 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center transition-all duration-200">
                      <div className="w-3 h-3 rounded-full bg-blue-600" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center transition-all duration-200">
                      <div className="w-3 h-3 rounded-full bg-gray-300" />
                    </div>
                  )}
                </div>
                <p
                  className={`mt-4 text-sm font-medium ${
                    step.id <= currentStep ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {step.name}
                </p>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
