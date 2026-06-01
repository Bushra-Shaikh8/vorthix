import { motion } from "framer-motion";
const STEPS = ["Profile", "Customize", "Train", "Launch"];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-between mb-12">
      {STEPS.map((label, idx) => (
        <div key={label} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                idx <= currentStep
                  ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg shadow-purple-500/20"
                  : "bg-white/5 text-gray-500 border border-white/10"
              }`}
            >
              {idx + 1}
            </div>
            <span
              className={`text-xs mt-2 transition-colors duration-200 ${
                idx <= currentStep ? "text-purple-400 font-medium" : "text-gray-600"
              }`}
            >
              {label}
            </span>
          </div>
          {idx < STEPS.length - 1 && (
            <div className="flex-1 h-px mx-2 bg-white/10" />
          )}
        </div>
      ))}
    </div>
  );
}