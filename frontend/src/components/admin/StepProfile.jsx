import { motion } from "framer-motion";

const fields = [
  { key: "yourName", label: "Your name", placeholder: "e.g. Fatima" },
  { key: "problem", label: "What problems do you solve?", placeholder: "e.g. Fresh bakery items delivery" },
  { key: "sell", label: "What do you sell?", placeholder: "e.g. Cakes, pastries, breads" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function StepProfile({ values, onChange, onContinue, onSkip }) {
  const update = (field) => (e) => onChange(field, e.target.value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
          Tell us about yourself
        </h2>
        <p className="text-gray-400 mt-1">
          This helps us tailor your experience — <span className="text-gray-500">all optional</span>
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-5"
      >
        {fields.map(({ key, label, placeholder }) => (
          <motion.div key={key} variants={item}>
            <label className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-gray-300">{label}</span>
              <span className="text-[11px] text-gray-600">optional</span>
            </label>
            <input
              value={values[key]}
              onChange={update(key)}
              placeholder={placeholder}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onContinue}
          className="bg-gradient-to-r from-brand-purple to-brand-blue text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
        >
          Continue
        </button>
        <button
          onClick={onSkip}
          className="text-gray-400 hover:text-white font-medium px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all"
        >
          Skip for now
        </button>
      </div>
    </motion.div>
  );
}