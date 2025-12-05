import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { sendChatMessage } from "./chatservice";

export type Message = { role: "assistant" | "user"; content: string; ts: number };

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hello — I'm your Policy Assistant. Ask anything about company policies.`,
      ts: Date.now(),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  // Scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-grow text area
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "40px";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }, [input]);

  const send = async () => {
    const q = input.trim();
    if (!q) return;

    const userMsg: Message = { role: "user", content: q, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    const prev = localStorage.getItem("chat_history");

    const result = await sendChatMessage(q, prev);

    localStorage.setItem("chat_history", (prev ?? "") + q + result.answer);

    const botMsg: Message = {
      role: "assistant",
      content: result.answer,
      ts: Date.now(),
    };

    setMessages((m) => [...m, botMsg]);
    setLoading(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">

      {/* Messages Section */}
      <div className="flex-1 bg-slate-800 rounded-lg shadow p-6 overflow-y-auto min-h-[200px]">
        {messages.map((m, idx) => (
          <MessageBubble key={idx} msg={m} />
        ))}
        <div ref={endRef} />
      </div>

      {/* Input Section */}
      <div className="bg-slate-800 p-4 rounded-lg shadow flex items-end gap-3">
        <div className="flex-1 relative">
          <textarea
            ref={textAreaRef}
            className="w-full border border-slate-700 bg-slate-800 text-slate-100 rounded-lg p-3 pr-12 
                       resize-none overflow-hidden leading-5 focus:outline-none focus:border-indigo-500"
            placeholder="Ask something about company policies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={loading}
          />

          <button
            onClick={send}
            disabled={loading}
            className="absolute right-3 bottom-3 text-indigo-500 hover:text-indigo-400 transition py-1"
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
