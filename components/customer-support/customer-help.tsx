"use client";

import React, { useState } from "react";
import { X, Sparkles, Heart, MessageSquare, Utensils, Apple, Send } from "lucide-react";

export function CustomerHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    if (topic === "menu") {
      const el = document.getElementById("menu");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/menu";
      }
    }
    if (topic === "ingredients") {
      const el = document.getElementById("craving");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/discover";
      }
    }
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackText.trim()) {
      setFeedbackSent(true);
      setTimeout(() => {
        setFeedbackSent(false);
        setFeedbackText("");
        setSelectedTopic(null);
        setIsOpen(false);
      }, 2000);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Customer Berry Help"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold bg-[#FFF9F0] text-[#9E4663] border-2 border-[#9E4663] shadow-xl hover:bg-[#FFF1E8] hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        >
          <span className="text-xl group-hover:rotate-12 transition-transform">🍓</span>
          <span className="text-xs sm:text-sm font-extrabold tracking-wide">Need Berry Help?</span>
        </button>
      </div>

      {/* Help Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 z-50 w-84 sm:w-96 bg-[#FFF9F0] rounded-3xl border-2 border-[#9E4663] card-shadow p-6 animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-[#E98FA8]/30 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍓</span>
              <div>
                <h4 className="font-bold text-base text-[#382D32]">Berrylicious Helper</h4>
                <p className="text-xs text-[#9E4663] font-semibold flex items-center gap-1">
                  Online for Shark Tank Demo <Heart className="w-3 h-3 fill-[#E98FA8] inline" />
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setSelectedTopic(null);
              }}
              aria-label="Close help"
              className="p-1 rounded-full text-[#382D32]/60 hover:text-[#382D32] hover:bg-[#FFF1E8]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Welcome Message */}
          <div className="bg-[#FFF1E8] rounded-2xl p-4 mb-4 border border-[#E98FA8]/40">
            <p className="text-xs sm:text-sm text-[#382D32] font-semibold leading-relaxed">
              Hey! Berrylicious here. 💕 <br />
              How can we make your day sweeter?
            </p>
          </div>

          {/* Quick Choice Buttons */}
          {!selectedTopic && (
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleTopicClick("menu")}
                className="p-3 rounded-2xl bg-white border border-[#382D32]/10 hover:border-[#E98FA8] hover:bg-[#FFF1E8] text-left transition-all text-xs font-bold text-[#382D32] flex items-center gap-2"
              >
                <Utensils className="w-4 h-4 text-[#9E4663]" />
                <span>Explore Menu</span>
              </button>

              <button
                onClick={() => handleTopicClick("ingredients")}
                className="p-3 rounded-2xl bg-white border border-[#382D32]/10 hover:border-[#E98FA8] hover:bg-[#FFF1E8] text-left transition-all text-xs font-bold text-[#382D32] flex items-center gap-2"
              >
                <Apple className="w-4 h-4 text-[#9E4663]" />
                <span>Ingredients</span>
              </button>

              <button
                onClick={() => handleTopicClick("order")}
                className="p-3 rounded-2xl bg-white border border-[#382D32]/10 hover:border-[#E98FA8] hover:bg-[#FFF1E8] text-left transition-all text-xs font-bold text-[#382D32] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#9E4663]" />
                <span>Ordering Info</span>
              </button>

              <button
                onClick={() => handleTopicClick("feedback")}
                className="p-3 rounded-2xl bg-white border border-[#382D32]/10 hover:border-[#E98FA8] hover:bg-[#FFF1E8] text-left transition-all text-xs font-bold text-[#382D32] flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#9E4663]" />
                <span>Send Note</span>
              </button>
            </div>
          )}

          {/* Topic: Order Info */}
          {selectedTopic === "order" && (
            <div className="space-y-3">
              <div className="bg-white rounded-2xl p-4 border border-[#382D32]/10 text-xs text-[#382D32]/80 leading-relaxed font-medium">
                <p className="font-bold text-[#9E4663] mb-1">Kiosk & Online Orders</p>
                Berrylicious operates live kiosk assembly with instant customized dessert prep. In
                the full commercial launch, direct web orders will enjoy zero delivery surcharge!
              </div>
              <button
                onClick={() => setSelectedTopic(null)}
                className="text-xs font-bold text-[#9E4663] hover:underline"
              >
                ← Back to options
              </button>
            </div>
          )}

          {/* Topic: Feedback Form */}
          {selectedTopic === "feedback" && (
            <div>
              {feedbackSent ? (
                <div className="bg-[#BFE9DE]/30 text-[#382D32] rounded-2xl p-4 text-center text-xs font-bold border border-[#BFE9DE]">
                  ✨ Thank you! Your note has been received by Tanvi.
                </div>
              ) : (
                <form onSubmit={handleSendFeedback} className="space-y-3">
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Tell us what flavour you want next..."
                    rows={3}
                    className="w-full rounded-2xl p-3 bg-white border border-[#382D32]/15 text-xs text-[#382D32] focus:outline-none focus:border-[#9E4663]"
                  />
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedTopic(null)}
                      className="text-xs font-bold text-[#382D32]/60 hover:text-[#382D32]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#E98FA8] text-[#382D32] hover:bg-[#e37e99]"
                    >
                      <span>Send</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
