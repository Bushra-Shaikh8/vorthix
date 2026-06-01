import { motion } from "framer-motion";

export default function StepTrain({ faqText, onFAQChange, onUpload, loading, status }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
        Train your chatbot
      </h2>
      <p className="text-gray-400">
        Paste your FAQs below (Q&A format). This is <strong className="text-white">required</strong> to make your bot helpful.
      </p>
      <textarea
        value={faqText}
        onChange={(e) => onFAQChange(e.target.value)}
        placeholder={"Q: What are your opening hours?\nA: 9 AM to 9 PM, Monday to Saturday.\n\nQ: Do you deliver?\nA: Yes, free delivery above Rs. 500."}
        rows={8}
        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all resize-none"
      />
      {status && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-gray-300"
        >
          {status}
        </motion.p>
      )}
      <button
        onClick={onUpload}
        disabled={!faqText.trim() || loading}
        className="bg-gradient-to-r from-brand-purple to-brand-blue text-white font-semibold px-6 py-3 rounded-xl disabled:opacity-50 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
      >
        {loading ? "Uploading..." : "Train Bot"}
      </button>
    </motion.div>
  );
}