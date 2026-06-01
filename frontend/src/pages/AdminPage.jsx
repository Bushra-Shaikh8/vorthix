import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { chatAPI } from "../utils/api";
import StepIndicator from "../components/admin/StepIndicator";
import StepProfile from "../components/admin/StepProfile";
import StepCustomize from "../components/admin/StepCustomize";
import StepTrain from "../components/admin/StepTrain";
import StepLaunch from "../components/admin/StepLaunch";

export default function AdminPage() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // Profile
  const [profile, setProfile] = useState({ yourName: "", problem: "", sell: "" });

  // Business identity
  const [chatbotName, setChatbotName] = useState(localStorage.getItem("vorthix_name") || "");
  const [slug, setSlug] = useState(localStorage.getItem("vorthix_slug") || "");
  const [businessCreated, setBusinessCreated] = useState(!!localStorage.getItem("vorthix_slug"));

  // Customization colors
  const [primaryColor, setPrimaryColor] = useState(localStorage.getItem("vorthix_primary") || "#6C3BD4");
  const [userMsgColor, setUserMsgColor] = useState(localStorage.getItem("vorthix_userMsg") || "#6C3BD4");
  const [botMsgColor, setBotMsgColor] = useState(localStorage.getItem("vorthix_botMsg") || "#1B98D6");

  // FAQ
  const [faqText, setFaqText] = useState("");
  const [logoUrl, setLogoUrl] = useState(localStorage.getItem("vorthix_logo") || "");

  // New Business Handler
  const handleNewBusiness = () => {
    if (window.confirm("This will clear all current business data. Start fresh?")) {
      localStorage.removeItem("vorthix_slug");
      localStorage.removeItem("vorthix_name");
      localStorage.removeItem("vorthix_primary");
      localStorage.removeItem("vorthix_userMsg");
      localStorage.removeItem("vorthix_botMsg");
      localStorage.removeItem("vorthix_logo");
      window.location.reload();
    }
  };

  const handleProfileChange = (field, value) => setProfile((p) => ({ ...p, [field]: value }));

  const handleCreateBusiness = async () => {
    if (!chatbotName.trim() || !slug.trim()) {
      alert("Please fill in name and slug.");
      return;
    }
    setLoading(true);
    try {
      await chatAPI.createBusiness({ name: chatbotName.trim(), slug: slug.trim(), emoji: "🤖" });
      localStorage.setItem("vorthix_slug", slug.trim());
      localStorage.setItem("vorthix_name", chatbotName.trim());
      localStorage.setItem("vorthix_primary", primaryColor);
      localStorage.setItem("vorthix_userMsg", userMsgColor);
      localStorage.setItem("vorthix_botMsg", botMsgColor);
      localStorage.setItem("vorthix_logo", logoUrl);
      setBusinessCreated(true);
      setStep(2);
    } catch (e) {
      alert(e.response?.data?.detail || "Could not create business.");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadFAQ = async () => {
    if (!faqText.trim()) return;
    setLoading(true);
    setStatus("");
    try {
      const formData = new FormData();
      formData.append("file", new Blob([faqText], { type: "text/plain" }), "faq.txt");
      formData.append("type", "text");
      await chatAPI.uploadFAQ(slug, formData, () => { });
      setStatus("✅ FAQ uploaded successfully!");
      setFaqText("");
      setStep(3);
    } catch (e) {
      setStatus("❌ " + (e.response?.data?.detail || e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white font-sans">
      {/* Background effects (same as landing page) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[radial-gradient(circle,rgba(27,152,255,0.2),rgba(108,59,212,0.1),transparent_70%)] blur-[100px]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,rgba(27,152,255,0.02)_1px,transparent_3px,transparent_40px)]" />
      </div>

      <div className="relative z-10">
        {/* Nav */}
        <nav className="bg-[#050816]/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors text-sm"
              >
                <i className="fas fa-arrow-left" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
              <div className="w-px h-5 bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue flex items-center justify-center text-white font-bold text-sm">V</div>
                <span className="font-bold text-xl bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
                  Vorthix Admin
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {businessCreated && (
                <span className="text-xs bg-purple-400/10 border border-purple-400/30 text-purple-300 px-3 py-1 rounded-full">
                  {chatbotName}
                </span>
              )}
              <button
                onClick={handleNewBusiness}
                className="text-xs text-gray-400 hover:text-white font-medium px-3 py-1.5 rounded-lg border border-white/10 hover:border-purple-400/30 transition-all"
              >
                <i className="fas fa-plus mr-1" />
                New Business
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
          {/* Step Indicator with enhanced styling */}
          <div className="mb-10">
            <StepIndicator currentStep={step} />
          </div>

          {/* Main content card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/10"
          >
            <AnimatePresence mode="wait">
              {step === 0 && (
                <StepProfile
                  key="profile"
                  values={profile}
                  onChange={handleProfileChange}
                  onContinue={() => setStep(1)}
                  onSkip={() => setStep(1)}
                />
              )}
              {step === 1 && (
                <StepCustomize
                  key="customize"
                  chatbotName={chatbotName}
                  slug={slug}
                  primaryColor={primaryColor}
                  userMsgColor={userMsgColor}
                  botMsgColor={botMsgColor}
                  logoUrl={logoUrl}
                  onLogoChange={setLogoUrl}
                  onNameChange={setChatbotName}
                  onSlugChange={setSlug}
                  onPrimaryColorChange={setPrimaryColor}
                  onUserMsgColorChange={setUserMsgColor}
                  onBotMsgColorChange={setBotMsgColor}
                  onSave={handleCreateBusiness}
                  loading={loading}
                />
              )}
              {step === 2 && (
                <StepTrain
                  key="train"
                  faqText={faqText}
                  onFAQChange={setFaqText}
                  onUpload={handleUploadFAQ}
                  loading={loading}
                  status={status}
                />
              )}
              {step === 3 && (
                <StepLaunch
                  key="launch"
                  slug={slug}
                  chatbotName={chatbotName}
                  primaryColor={primaryColor}
                  userMsgColor={userMsgColor}
                  botMsgColor={botMsgColor}
                  logoUrl={logoUrl}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}