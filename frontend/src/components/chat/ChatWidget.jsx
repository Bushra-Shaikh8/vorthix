import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";
import { useChat } from "../../hooks/useChat";
import Logo from "../Logo"; //  Import the Logo component

export default function ChatWidget({
  businessSlug,
  businessName,
  primaryColor = "#6C3BD4",
  userMessageColor = "#6C3BD4",
  botMessageColor = "#1B98D6",
  logoUrl = "",
}) {
  const { messages, isTyping, sendMessage } = useChat(businessSlug, businessName);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col bg-gray-50 w-full h-full max-w-md mx-auto">
      {/* Top Bar */}
      <div
        className="text-white px-4 py-3 flex items-center gap-3"
        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${botMessageColor})` }}
      >
        {/* Show custom logo if available, otherwise show Vorthix logo */}
        {logoUrl ? (
          <img
            src={logoUrl}
            alt="logo"
            className="w-9 h-9 rounded-full object-cover border border-white/20"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        ) : (
          <Logo height={24} />   // ✅ Vorthix logo instead of 🏪
        )}
        <div className="flex-1">
          <h2 className="font-bold text-sm">{businessName || "Business"}</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-white/80 text-xs">Online · Vorthix AI</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            primaryColor={primaryColor}
            userMessageColor={userMessageColor}
            botMessageColor={botMessageColor}
            onTalkToHuman={() => alert("Connecting with a human!")}
          />
        ))}
        {isTyping && <TypingIndicator primaryColor={primaryColor} />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} disabled={isTyping} primaryColor={primaryColor} />

      {/* Footer */}
      <div className="text-center py-2 text-[10px] text-gray-400 bg-white border-t border-gray-100">
        Powered by <span className="font-semibold" style={{ color: primaryColor }}>Vorthix</span>
      </div>
    </div>
  );
}
