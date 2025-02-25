"use client";

import { useState } from "react";

interface QuizOption {
  value: string;
  label: string;
  isCorrect: boolean;
  feedback: string;
}

interface QuizProps {
  title: string;
  question: string;
  options: QuizOption[];
  additionalInfoId?: string;
}

export default function Quiz({ title, question, options, additionalInfoId }: QuizProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = () => {
    setShowFeedback(true);
    if (selectedOption && additionalInfoId) {
      document.getElementById(additionalInfoId)?.classList.remove('hidden');
    }
  };

  return (
    <div className="p-3 pt-0">
      <div className="p-4 border border-black/[.08] dark:border-white/[.145] rounded-lg">
        <p className="font-semibold mb-3">{title}</p>
        <form className="flex flex-col gap-3">
          <p className="mb-2">{question}</p>
          {options.map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <input
                type="radio"
                name="quiz-answer"
                value={option.value}
                className="accent-foreground"
                onChange={() => setSelectedOption(option.value)}
                checked={selectedOption === option.value}
              />
              <span>{option.label}</span>
              {showFeedback && selectedOption === option.value && (
                <span 
                  className={`${option.isCorrect ? 'text-green-500' : 'text-red-500'}`}
                >
                  {option.feedback}
                </span>
              )}
            </label>
          ))}
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}