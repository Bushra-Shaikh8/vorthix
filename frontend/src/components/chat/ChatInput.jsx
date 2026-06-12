import React, { useState, useRef, useEffect } from "react";

export default function ChatInput({ onSend, disabled, primaryColor = "#6C3BD4" }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
    }
  }, [text]);

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSend(text.trim());
      setText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 bg-white border-t border-gray-100">
      <div className="flex items-end gap-2 bg-gray-50 rounded-2xl border border-gray-200 px-3 py-2 focus-within:border-purple-400 transition-all duration-200">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write your question here..."
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 resize-none outline-none leading-relaxed max-h-[120px] py-1 disabled:opacity-50"
        />

        <button
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          className="flex-shrink-0 w-9 h-9 text-white rounded-full flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: primaryColor }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
