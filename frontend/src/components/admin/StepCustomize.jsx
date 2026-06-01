import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function StepCustomize({
  chatbotName,
  slug,
  primaryColor,
  userMsgColor,
  botMsgColor,
  logoUrl,
  onNameChange,
  onSlugChange,
  onPrimaryColorChange,
  onUserMsgColorChange,
  onBotMsgColorChange,
  onLogoChange,
  onSave,
  loading,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
          Customize your chatbot
        </h2>
        <p className="text-gray-400 mt-1">
          Make it uniquely yours – all fields are saved automatically.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {/* Chatbot Name Card */}
        <motion.div
          variants={item}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 space-y-3"
        >
          <div className="flex items-center gap-2 text-gray-300">
            <i className="fas fa-tag text-purple-400" />
            <span className="text-sm font-semibold">Chatbot Name</span>
          </div>
          <input
            value={chatbotName}
            onChange={(e) => {
              onNameChange(e.target.value);
              if (!slug) {
                const generated = e.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "");
                onSlugChange(generated);
              }
            }}
            placeholder="e.g. Fatima's Bakery"
            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
          />
        </motion.div>

        {/* Slug Card */}
        <motion.div
          variants={item}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 space-y-3"
        >
          <div className="flex items-center gap-2 text-gray-300">
            <i className="fas fa-link text-purple-400" />
            <span className="text-sm font-semibold">Chatbot URL Slug</span>
            <span className="text-xs text-gray-500 ml-auto">Auto‑generated</span>
          </div>
          <input
            value={slug}
            onChange={(e) => onSlugChange(e.target.value)}
            placeholder="fatimas-bakery"
            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
          />
        </motion.div>

        {/* Logo Card */}
        <motion.div
          variants={item}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 space-y-3"
        >
          <div className="flex items-center gap-2 text-gray-300">
            <i className="fas fa-image text-purple-400" />
            <span className="text-sm font-semibold">Business Logo</span>
            <span className="text-xs text-gray-500 ml-auto">Optional</span>
          </div>
          <input
            value={logoUrl}
            onChange={(e) => onLogoChange(e.target.value)}
            placeholder="https://your-site.com/logo.png"
            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
          />
          {logoUrl && (
            <div className="flex items-center gap-3 pt-1">
              <img
                src={logoUrl}
                alt="preview"
                className="h-12 w-12 rounded-full object-cover border-2 border-purple-400/30 shadow-md"
                onError={(e) => (e.target.style.display = "none")}
              />
              <span className="text-xs text-gray-400">Logo preview</span>
            </div>
          )}
        </motion.div>

        {/* Colors Card */}
        <motion.div
          variants={item}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 space-y-4"
        >
          <div className="flex items-center gap-2 text-gray-300">
            <i className="fas fa-palette text-purple-400" />
            <span className="text-sm font-semibold">Color Palette</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Primary",
                value: primaryColor,
                onChange: onPrimaryColorChange,
                hint: "Buttons & Header",
              },
              {
                label: "User Message",
                value: userMsgColor,
                onChange: onUserMsgColorChange,
                hint: "Your message bubble",
              },
              {
                label: "Bot Message",
                value: botMsgColor,
                onChange: onBotMsgColorChange,
                hint: "AI response bubble",
              },
            ].map((c) => (
              <div key={c.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{c.label}</span>
                  <span
                    className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: c.value }}
                  />
                </div>
                <input
                  type="color"
                  value={c.value}
                  onChange={(e) => c.onChange(e.target.value)}
                  className="w-full h-10 rounded-lg border border-white/10 bg-white/5 cursor-pointer"
                />
                <p className="text-[10px] text-gray-500">{c.hint}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onSave}
        disabled={loading}
        className="w-full bg-gradient-to-r from-brand-purple to-brand-blue text-white font-semibold py-3.5 rounded-xl disabled:opacity-50 hover:shadow-xl hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Saving...
          </>
        ) : (
          <>
            Save & Continue
            <i className="fas fa-arrow-right text-sm" />
          </>
        )}
      </motion.button>
    </motion.div>
  );
}