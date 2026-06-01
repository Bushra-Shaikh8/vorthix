import { useState, useCallback, useRef } from "react";
import { chatAPI } from "../utils/api";

export function useChat(businessSlug, businessName = "Business") {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "bot",
      text: `Assalam o Alaikum! 👋 I'm ${businessName}'s AI assistant. How can I help you today?`,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const sessionId = useRef(`session_${Date.now()}`);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const { data } = await chatAPI.sendMessage(
        businessSlug,
        text,
        sessionId.current
      );
      const botMsg = {
        id: Date.now() + 1,
        role: "bot",
        text: data.answer,
        isHuman: data.needs_human || false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        role: "bot",
        text: "Sorry, something went wrong. Please try again.",
        isError: true,
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [businessSlug]);

  return { messages, isTyping, sendMessage };
}