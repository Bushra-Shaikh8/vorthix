import React from "react";

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatMessage({
  message,
  onTalkToHuman,
  primaryColor = "#6C3BD4",
  userMessageColor = "#6C3BD4",
  botMessageColor = "#1B98D6",
}) {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-end gap-2 mb-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>


      <div className={`max-w-[78%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? "text-white rounded-br-sm"
              : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
          } ${message.isError ? "bg-red-50 border-red-200 text-red-700" : ""}`}
          style={
            isUser
              ? { background: userMessageColor }
              : {}
          }
        >
          <p className="whitespace-pre-wrap break-words">{message.text}</p>
        </div>

        <span className="text-[10px] text-gray-400 mt-1 px-1">
          {formatTime(message.timestamp)}
        </span>

        {message.isHuman && (
          <button
            onClick={onTalkToHuman}
            className="mt-2 px-4 py-1.5 text-xs font-semibold rounded-full border-2 transition-all duration-200"
            style={{
              borderColor: primaryColor,
              color: primaryColor,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = primaryColor;
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = primaryColor;
            }}
          >
            👤 Talk to a Human
          </button>
        )}
      </div>
    </div>
  );
}