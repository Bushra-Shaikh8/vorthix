import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ChatWidget from "../components/chat/ChatWidget";
import { chatAPI } from "../utils/api";

export default function ChatPage() {
  const { businessSlug } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chatAPI
      .getBusinessInfo(businessSlug)
      .then(({ data }) => setBusiness(data))
      .catch(() => setBusiness({ name: businessSlug }))
      .finally(() => setLoading(false));
  }, [businessSlug]);

  const primaryColor = localStorage.getItem("vorthix_primary") || "#6C3BD4";
  const userMsgColor = localStorage.getItem("vorthix_userMsg") || "#6C3BD4";
  const botMsgColor = localStorage.getItem("vorthix_botMsg") || "#1B98D6";
  const logoUrl = localStorage.getItem("vorthix_logo") || "";

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#050816]">
        <div className="spinner-ring" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] relative overflow-hidden">
      {/* Background Effects (same as landing page) */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[radial-gradient(circle,rgba(27,152,255,0.25),rgba(108,59,212,0.15),transparent_70%)] blur-[100px]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,rgba(27,152,255,0.03)_1px,transparent_3px,transparent_40px)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(27,152,255,0.25)_0%,rgba(108,59,212,0.18)_25%,transparent_60%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
        {/* Business Branding Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          {logoUrl && (
            <img
              src={logoUrl}
              alt="logo"
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-2 border-purple-400/30 shadow-lg mx-auto mb-3"
            />
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {business?.name || businessSlug}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            AI‑powered customer support
          </p>
        </motion.div>

        {/* Chat Widget Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md rounded-3xl shadow-2xl shadow-purple-500/20 border border-white/10 overflow-hidden"
        >
          <ChatWidget
            businessSlug={businessSlug}
            businessName={business?.name || businessSlug}
            primaryColor={primaryColor}
            userMessageColor={userMsgColor}
            botMessageColor={botMsgColor}
            logoUrl={logoUrl}
          />
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-xs text-gray-500 text-center"
        >
          Powered by <span className="text-purple-400 font-semibold">Vorthix</span>
        </motion.p>
      </div>
    </div>
  );
}