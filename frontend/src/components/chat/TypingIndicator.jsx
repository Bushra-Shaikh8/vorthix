import React from "react";

export default function TypingIndicator({ primaryColor = "#6C3BD4" }) {
  return (
    <div className="flex items-end gap-2 mb-3">
     
      <div className="bg-white shadow border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: primaryColor,
              animation: "bounceDot 1.2s infinite ease-in-out",
              animationDelay: `${i * 0.18}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}