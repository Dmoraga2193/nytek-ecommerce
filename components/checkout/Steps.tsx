"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface Step {
  readonly id: number;
  readonly name: string;
  readonly description: string;
}

interface StepsProps {
  steps: readonly Step[];
  currentStep: number;
}

export function Steps({ steps, currentStep }: StepsProps) {
  return (
    <div className="w-full mb-8">
      {/* Desktop view */}
      <div className="hidden md:block">
        <div className="relative flex items-center justify-between gap-4 px-2">
          {/* Progress bar background */}
          <div className="absolute left-0 top-1/2 h-[2px] w-[98%] mx-[1%] -translate-y-1/2">
            <div className="h-full w-full bg-gray-200" />
            <motion.div
              className="absolute left-0 top-0 h-full bg-green-600"
              initial={{ width: "0%" }}
              animate={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          {/* Steps */}
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const isLast = index === steps.length - 1;

            return (
              <div
                key={step.name}
                className={cn(
                  "relative flex flex-col items-center flex-1",
                  !isLast && "pr-4"
                )}
              >
                {/* Step circle */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    transition: { duration: 0.2 },
                  }}
                  className={cn(
                    "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isCompleted
                      ? "border-green-800 bg-green-800"
                      : isCurrent
                      ? "border-green-600 bg-white"
                      : "border-gray-200 bg-white"
                  )}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </motion.div>
                  ) : (
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isCurrent ? "text-green-600" : "text-gray-400"
                      )}
                    >
                      {step.id}
                    </span>
                  )}

                  {/* Pulse effect for current step */}
                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-green-400"
                      initial={{ opacity: 0.5, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.2 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Step content */}
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      "text-sm font-medium mb-0.5",
                      isCompleted || isCurrent
                        ? "text-gray-900"
                        : "text-gray-500"
                    )}
                  >
                    {step.name}
                  </p>
                  <p
                    className={cn(
                      "text-xs",
                      isCompleted || isCurrent
                        ? "text-gray-600"
                        : "text-gray-400"
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden px-4">
        {" "}
        {/* Added px-4 for consistent padding */}
        <div className="flex items-center justify-between mb-6">
          {" "}
          {/* Increased bottom margin */}
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const isLast = index === steps.length - 1;

            return (
              <div
                key={step.name}
                className={cn(
                  "relative flex flex-col items-center flex-1", // Added flex-1
                  !isLast &&
                    "after:content-[''] after:absolute after:top-[14px] after:left-1/2 after:w-full after:h-[2px] after:bg-gray-200"
                )}
              >
                {/* Progress line */}
                {/* Removed redundant progress line as it's now handled by the after pseudo-element */}

                {/* Step circle */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    transition: { duration: 0.2 },
                  }}
                  className={cn(
                    "relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isCompleted
                      ? "border-green-800 bg-green-800"
                      : isCurrent
                      ? "border-green-600 bg-white"
                      : "border-gray-200 bg-white"
                  )}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </motion.div>
                  ) : (
                    <span
                      className={cn(
                        "text-xs font-medium",
                        isCurrent ? "text-green-600" : "text-gray-400"
                      )}
                    >
                      {step.id}
                    </span>
                  )}

                  {/* Pulse effect for current step */}
                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-green-400"
                      initial={{ opacity: 0.5, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.2 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Step label - Only show name on mobile */}
                <p
                  className={cn(
                    "mt-2 text-[11px] font-medium text-center w-full px-1", // Adjusted spacing and width
                    isCompleted || isCurrent ? "text-gray-900" : "text-gray-500"
                  )}
                >
                  {step.name}
                </p>
              </div>
            );
          })}
        </div>
        {/* Current step description - Mobile only */}
        <div className="text-center mt-2 px-2">
          {" "}
          {/* Added margin-top and adjusted padding */}
          <p className="text-xs text-gray-600">
            {" "}
            {/* Adjusted text size */}
            {steps.find((step) => step.id === currentStep)?.description}
          </p>
        </div>
      </div>
    </div>
  );
}
