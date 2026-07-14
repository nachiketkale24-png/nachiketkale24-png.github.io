"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Screenshot = {
  file: string;
  caption: string;
};

export default function ScreenshotsShowcase({
  screenshots,
  accent = "success",
}: {
  screenshots: Screenshot[];
  accent?: "signal" | "success";
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<Screenshot | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const activeColor = accent === "signal" ? "bg-signal" : "bg-success";
  const activeBorderColor = accent === "signal" ? "border-signal/50" : "border-success/50";
  const activeTextColor = accent === "signal" ? "text-signal" : "text-success";

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, screenshots.length]);

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  return (
    <div className="w-full">
      {/* main showcase viewport */}
      <div className="relative aspect-[16/10] md:aspect-[16/9] w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-line/60 bg-elevation-panel/30 backdrop-blur-sm shadow-2xl group">
        {/* ambient background blur of active image */}
        <div className="absolute inset-0 opacity-10 blur-xl pointer-events-none scale-105">
          <Image
            src={screenshots[currentIndex].file}
            alt="Blur background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* image frame */}
        <div 
          className="relative w-full h-full cursor-zoom-in"
          onClick={() => setLightboxImage(screenshots[currentIndex])}
        >
          <Image
            src={screenshots[currentIndex].file}
            alt={screenshots[currentIndex].caption}
            fill
            className="object-contain p-4 md:p-8 transition-transform duration-700 hover:scale-[1.02]"
            priority
          />
        </div>

        {/* nav overlay arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-elevation-panel/80 border border-line/60 text-ink-muted hover:text-ink hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100 duration-300 z-20"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-elevation-panel/80 border border-line/60 text-ink-muted hover:text-ink hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100 duration-300 z-20"
          aria-label="Next image"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* controls bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 z-20">
          <p className="text-sm text-ink font-sans tracking-wide text-center md:text-left drop-shadow-md">
            {screenshots[currentIndex].caption}
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-xs font-mono uppercase tracking-wider text-ink-muted hover:text-ink transition-colors mr-2"
            >
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>
            <span className="font-mono text-xs text-ink-faint">
              {currentIndex + 1} / {screenshots.length}
            </span>
          </div>
        </div>
      </div>

      {/* thumbnails strip */}
      <div className="flex gap-2.5 mt-6 overflow-x-auto pb-4 max-w-4xl mx-auto px-2 scrollbar-thin scrollbar-thumb-line">
        {screenshots.map((s, idx) => (
          <button
            key={s.file}
            onClick={() => {
              setIsPlaying(false);
              setCurrentIndex(idx);
            }}
            className={`relative aspect-[16/10] w-24 shrink-0 rounded-lg overflow-hidden border transition-all duration-300 ${
              idx === currentIndex
                ? `border-2 ${activeBorderColor} scale-[1.03] ring-1 ring-offset-1 ring-offset-background ${accent === "signal" ? "ring-signal/30" : "ring-success/30"}`
                : "border-line/40 opacity-55 hover:opacity-90 hover:scale-[1.01]"
            }`}
          >
            <Image
              src={s.file}
              alt={`Thumb ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* light box overlay */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-background/95 backdrop-blur-md z-[9999] flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative w-full h-full max-w-6xl max-h-[85vh] flex flex-col items-center justify-center gap-4">
            <div className="relative w-full flex-1">
              <Image
                src={lightboxImage.file}
                alt={lightboxImage.caption}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <div className="text-center max-w-2xl px-4 py-2 bg-elevation-panel/50 border border-line/60 rounded-xl backdrop-blur-sm">
              <p className="text-sm text-ink-muted leading-relaxed font-sans">{lightboxImage.caption}</p>
            </div>
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 text-ink-faint hover:text-ink font-mono text-sm tracking-wider uppercase transition-colors"
            >
              [Close]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
