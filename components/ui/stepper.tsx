'use client'

import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepperProps {
  steps: string[]
  currentStep: number
  className?: string
}

interface StepProps {
  step: number
  currentStep: number
  label: string
  isLast: boolean
}

const Step: React.FC<StepProps> = ({ step, currentStep, label, isLast }) => {
  const isCompleted = step < currentStep
  const isCurrent = step === currentStep
  const isUpcoming = step > currentStep

  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors',
            {
              'border-blue-600 bg-blue-600 text-white': isCompleted,
              'border-blue-600 bg-white text-blue-600': isCurrent,
              'border-gray-300 bg-white text-gray-500': isUpcoming,
            }
          )}
        >
          {isCompleted ? (
            <Check className="h-5 w-5" />
          ) : (
            <span>{step}</span>
          )}
        </div>
        <div
          className={cn(
            'mt-2 text-sm font-medium transition-colors',
            {
              'text-blue-600': isCompleted || isCurrent,
              'text-gray-500': isUpcoming,
            }
          )}
        >
          {label}
        </div>
      </div>
      {!isLast && (
        <div
          className={cn(
            'mx-4 h-0.5 w-16 flex-1 transition-colors',
            {
              'bg-blue-600': isCompleted,
              'bg-gray-300': !isCompleted,
            }
          )}
        />
      )}
    </div>
  )
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      {steps.map((label, index) => (
        <Step
          key={index}
          step={index + 1}
          currentStep={currentStep}
          label={label}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  )
}

export default Stepper
