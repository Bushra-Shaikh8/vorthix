import { useState } from "react";
import { motion } from "framer-motion";
import ChatWidget from "../chat/ChatWidget";

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="relative bg-gradient-to-r from-brand-purple to-brand-blue text-white text-xs font-semibold px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
      >
        <i className="fas fa-copy mr-1" />
        {label}
      </button>
      {copied && (
        <motion.span
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className="text-xs text-green-400 font-medium"
        >
          Copied!
        </motion.span>
      )}
    </div>
  );
}

export default function StepLaunch({
  slug,
  chatbotName,
  primaryColor,
  userMsgColor,
  botMsgColor,
  logoUrl,
}) {
  const chatUrl = `${window.location.origin}/chat/${slug}`;
  const embedCode = `<iframe src="${chatUrl}" width="350" height="500" style="border:none;"></iframe>`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
        Your chatbot is ready! 🎉
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Panel – 3/5 */}
        <div className="lg:col-span-3 space-y-6">
          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="logo"
                  className="h-14 w-14 rounded-full object-cover border-2 border-purple-400/30 shadow-md"
                />
              ) : (
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue flex items-center justify-center text-2xl">
                  🤖
                </div>
              )}
              <div>
                <h3 className="font-bold text-xl">{chatbotName}</h3>
                <p className="text-sm text-gray-400">{chatUrl}</p>
              </div>
              <span className="ml-auto text-xs bg-green-400/10 border border-green-400/30 text-green-400 px-3 py-1 rounded-full">
                Live
              </span>
            </div>
          </motion.div>

          {/* Share Link Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-3"
          >
            <div className="flex items-center gap-2 text-gray-300">
              <i className="fas fa-share-alt text-purple-400" />
              <span className="font-semibold">Share Link</span>
            </div>
            <p className="text-sm text-gray-400">
              Send this link to your customers — they can chat instantly.
            </p>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={chatUrl}
                className="flex-1 bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none"
              />
              <CopyButton text={chatUrl} label="Copy" />
            </div>
          </motion.div>

          {/* Embed Code Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-3"
          >
            <div className="flex items-center gap-2 text-gray-300">
              <i className="fas fa-code text-purple-400" />
              <span className="font-semibold">Embed Code</span>
            </div>
            <p className="text-sm text-gray-400">
              Add this code to your website to display the chat widget.
            </p>
            <textarea
              readOnly
              value={embedCode}
              rows={3}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none resize-none"
            />
            <CopyButton text={embedCode} label="Copy Code" />
          </motion.div>
        </div>

        {/* Right Panel – Chat Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden h-[600px]">
            <ChatWidget
              businessSlug={slug}
              businessName={chatbotName}
              primaryColor={primaryColor}
              userMessageColor={userMsgColor}
              botMessageColor={botMsgColor}
              logoUrl={logoUrl}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}