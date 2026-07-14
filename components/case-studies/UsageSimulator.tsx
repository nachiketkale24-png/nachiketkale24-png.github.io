"use client";

import { useState, useEffect } from "react";

type ConversationMessage = {
  role: "user" | "app";
  text: string;
};

type UsageExample = {
  title: string;
  conversation: ConversationMessage[];
};

export default function UsageSimulator({
  examples,
  accent = "success",
}: {
  examples: UsageExample[];
  accent?: "signal" | "success";
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [renderedMessages, setRenderedMessages] = useState<ConversationMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const activeBorder = accent === "signal" ? "border-signal text-signal" : "border-success text-success";
  const activeBg = accent === "signal" ? "bg-signal/10 border-signal/20 text-signal" : "bg-success/10 border-success/20 text-success";
  const accentColor = accent === "signal" ? "#FF6B35" : "#3ECF8E";

  useEffect(() => {
    // Reset conversation and simulate typing flow
    setRenderedMessages([]);
    setIsProcessing(true);
    setIsSpeaking(false);

    const convo = examples[activeTab].conversation;
    
    // 1. Show user message
    const userTimeout = setTimeout(() => {
      setRenderedMessages([convo[0]]);
      setIsProcessing(true); // show loader for app reply
    }, 400);

    // 2. Hide loader and show app reply after delay
    const replyTimeout = setTimeout(() => {
      setIsProcessing(false);
      setRenderedMessages((prev) => [...prev, convo[1]]);
      setIsSpeaking(true); // start speaking animation
    }, 1800);

    // 3. Stop speaking animation after a short duration
    const speakTimeout = setTimeout(() => {
      setIsSpeaking(false);
    }, 5500);

    return () => {
      clearTimeout(userTimeout);
      clearTimeout(replyTimeout);
      clearTimeout(speakTimeout);
    };
  }, [activeTab, examples]);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-line/60 bg-elevation-panel/30 backdrop-blur-md overflow-hidden shadow-xl">
      {/* header tabs */}
      <div className="flex border-b border-line/60 bg-elevation-panel/50 overflow-x-auto">
        {examples.map((example, i) => (
          <button
            key={example.title}
            onClick={() => setActiveTab(i)}
            className={`flex-1 py-4 px-6 text-xs font-mono tracking-wider uppercase border-b-2 transition-all shrink-0 text-center ${
              activeTab === i
                ? `${activeBorder} bg-elevation-panel/30 font-semibold`
                : "border-transparent text-ink-faint hover:text-ink-muted"
            }`}
          >
            {example.title}
          </button>
        ))}
      </div>

      {/* chat view area */}
      <div className="p-6 md:p-8 min-h-[320px] flex flex-col justify-end gap-6 bg-gradient-to-b from-elevation-panel/10 to-transparent">
        {renderedMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col max-w-[85%] ${
              msg.role === "user" ? "self-end items-end" : "self-start items-start"
            } animate-fade-in`}
          >
            <span className="font-mono text-[9px] uppercase tracking-wider text-ink-faint/60 mb-1.5">
              {msg.role === "user" ? "🎤 Voice Input (Farmer)" : "🔊 SmartKisan Assistant"}
            </span>
            <div
              className={`rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed relative ${
                msg.role === "user"
                  ? "bg-[#1C2533] border border-line/50 text-ink rounded-tr-none"
                  : "bg-[#101E22]/60 border border-success/20 text-ink rounded-tl-none"
              }`}
            >
              {msg.role === "app" && (
                <div className="flex gap-3 items-start">
                  <div className="mt-1 shrink-0">
                    {/* speech speaker with pulse animation */}
                    <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-success/10 border border-success/30">
                      {isSpeaking && (
                        <span className="absolute inset-0 rounded-full bg-success/20 animate-ping" />
                      )}
                      <svg
                        className={`w-3.5 h-3.5 ${isSpeaking ? "text-success animate-pulse" : "text-ink-muted"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p>{msg.text}</p>
                    {/* typing waves visualization while speaking */}
                    {isSpeaking && (
                      <div className="flex items-center gap-1 mt-3.5 h-3">
                        <span className="w-0.5 bg-success/60 h-2 rounded animate-pulse" style={{ animationDelay: "0ms" }} />
                        <span className="w-0.5 bg-success/60 h-3 rounded animate-pulse" style={{ animationDelay: "150ms" }} />
                        <span className="w-0.5 bg-success/60 h-1.5 rounded animate-pulse" style={{ animationDelay: "300ms" }} />
                        <span className="w-0.5 bg-success/60 h-3.5 rounded animate-pulse" style={{ animationDelay: "450ms" }} />
                        <span className="w-0.5 bg-success/60 h-2.5 rounded animate-pulse" style={{ animationDelay: "600ms" }} />
                      </div>
                    )}
                  </div>
                </div>
              )}
              {msg.role === "user" && <p>{msg.text}</p>}
            </div>
          </div>
        ))}

        {/* typing/processing indicator */}
        {isProcessing && (
          <div className="self-start items-start flex flex-col max-w-[85%] animate-pulse">
            <span className="font-mono text-[9px] uppercase tracking-wider text-ink-faint/60 mb-1.5">
              Processing command...
            </span>
            <div className="bg-[#101E22]/30 border border-line/40 rounded-2xl rounded-tl-none px-5 py-3.5 flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 bg-success/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-success/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-success/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
