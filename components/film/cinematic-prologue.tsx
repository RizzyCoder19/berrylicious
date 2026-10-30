"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  FILM_STORYBOARD,
  TOTAL_FILM_FRAMES,
  getBeatForFrame,
  getSubtitleForFrame,
  StoryboardBeat,
} from "@/data/film-storyboard";
import { filmAudio } from "@/lib/film-audio";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipForward,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Maximize2,
  Minimize2,
  Layers,
} from "lucide-react";

interface CinematicPrologueProps {
  onEnterSite?: () => void;
  autoPlayOnStart?: boolean;
}

export function CinematicPrologue({
  onEnterSite,
  autoPlayOnStart = true,
}: CinematicPrologueProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Frame Cache & Loading
  const framesCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReadyToPlay, setIsReadyToPlay] = useState<boolean>(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState<boolean>(true);

  // Playback State
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(14); // Filmic 14 FPS cadence for stop-motion prestige
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Transitioning / Ending
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [hasReachedReveal, setHasReachedReveal] = useState<boolean>(false);

  // Animation Loop Refs
  const lastFrameTimeRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const playheadRef = useRef<number>(1);
  const isPlayingRef = useRef<boolean>(false);
  const playedAudioBeatsRef = useRef<Set<string>>(new Set());

  // 1. Preloading Strategy
  useEffect(() => {
    let isCancelled = false;
    const initialPriorityCount = 15;

    // Helper to load single frame
    const loadFrame = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (framesCacheRef.current.has(index)) {
          resolve(framesCacheRef.current.get(index)!);
          return;
        }
        const img = new Image();
        const paddedIndex = String(index).padStart(3, "0");
        img.src = `/film/frame_${paddedIndex}.webp`;
        img.onload = () => {
          if (!isCancelled) {
            framesCacheRef.current.set(index, img);
            setLoadedCount((prev) => prev + 1);
          }
          resolve(img);
        };
        img.onerror = () => {
          // Fallback to original png if webp fails
          img.src = `/film/${index}.png`;
          img.onload = () => {
            if (!isCancelled) {
              framesCacheRef.current.set(index, img);
              setLoadedCount((prev) => prev + 1);
            }
            resolve(img);
          };
          img.onerror = reject;
        };
      });
    };

    async function preloadAllFrames() {
      // Phase A: Load priority first 15 frames for instant start
      const initialPromises: Promise<HTMLImageElement>[] = [];
      for (let i = 1; i <= Math.min(initialPriorityCount, TOTAL_FILM_FRAMES); i++) {
        initialPromises.push(loadFrame(i));
      }

      await Promise.allSettled(initialPromises);
      if (isCancelled) return;

      setIsReadyToPlay(true);
      setIsLoadingInitial(false);

      if (autoPlayOnStart) {
        setIsPlaying(true);
        isPlayingRef.current = true;
      }

      // Phase B: Concurrently stream remaining frames in batches of 6
      const remainingIndices: number[] = [];
      for (let i = initialPriorityCount + 1; i <= TOTAL_FILM_FRAMES; i++) {
        remainingIndices.push(i);
      }

      const batchSize = 6;
      for (let i = 0; i < remainingIndices.length; i += batchSize) {
        if (isCancelled) break;
        const chunk = remainingIndices.slice(i, i + batchSize);
        await Promise.allSettled(chunk.map((idx) => loadFrame(idx)));
      }
    }

    preloadAllFrames();

    return () => {
      isCancelled = true;
    };
  }, [autoPlayOnStart]);

  // Keep isPlayingRef synced
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // 2. Audio Cue Trigger based on narrative beat
  const checkAudioCue = useCallback(
    (frame: number) => {
      if (isMuted) return;
      const beat = getBeatForFrame(frame);

      // Trigger audio on entering key beats
      if (frame === 29 && !playedAudioBeatsRef.current.has("sparkle")) {
        playedAudioBeatsRef.current.add("sparkle");
        filmAudio.playSparkle();
      } else if (frame === 45 && !playedAudioBeatsRef.current.has("portal")) {
        playedAudioBeatsRef.current.add("portal");
        filmAudio.playPortalShift();
      } else if (frame === 50 && !playedAudioBeatsRef.current.has("dreamscape")) {
        playedAudioBeatsRef.current.add("dreamscape");
        filmAudio.playDreamChord();
      } else if (frame === 76 && !playedAudioBeatsRef.current.has("cloche")) {
        playedAudioBeatsRef.current.add("cloche");
        filmAudio.playCrystalChime();
      } else if (frame === 114 && !playedAudioBeatsRef.current.has("reveal")) {
        playedAudioBeatsRef.current.add("reveal");
        filmAudio.playGrandReveal();
      }
    },
    [isMuted]
  );

  // 3. Render Canvas Frame
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Find closest cached frame if exact frame is still streaming
    let img = framesCacheRef.current.get(frameIndex);
    if (!img) {
      for (let offset = 1; offset <= 10; offset++) {
        if (framesCacheRef.current.has(frameIndex - offset)) {
          img = framesCacheRef.current.get(frameIndex - offset);
          break;
        }
      }
    }

    if (!img || !img.complete) return;

    // Calculate aspect ratio cover / contain
    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width;
    const ch = canvas.height;

    // Clear canvas
    ctx.fillStyle = "#0c080a";
    ctx.fillRect(0, 0, cw, ch);

    // Fit 16:9 frame inside canvas with letterboxing/pillarboxing
    const imgAspect = img.naturalWidth / img.naturalHeight || 16 / 9;
    const canvasAspect = cw / ch;

    let drawW: number;
    let drawH: number;
    let drawX: number;
    let drawY: number;

    if (canvasAspect > imgAspect) {
      // Canvas is wider than image: pillarbox height fits
      drawH = ch;
      drawW = ch * imgAspect;
      drawX = (cw - drawW) / 2;
      drawY = 0;
    } else {
      // Canvas is taller than image: letterbox width fits
      drawW = cw;
      drawH = cw / imgAspect;
      drawX = 0;
      drawY = (ch - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // 4. Resize Canvas with Device Pixel Ratio
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = container.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    drawFrame(playheadRef.current);
  }, [drawFrame]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // 5. Main Playback Tick (requestAnimationFrame)
  useEffect(() => {
    if (!isReadyToPlay) return;

    const frameIntervalMs = 1000 / fps;

    const loop = (timestamp: number) => {
      if (isPlayingRef.current) {
        if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
        const elapsed = timestamp - lastFrameTimeRef.current;

        if (elapsed >= frameIntervalMs) {
          lastFrameTimeRef.current = timestamp - (elapsed % frameIntervalMs);

          let nextFrame = playheadRef.current + 1;
          if (nextFrame > TOTAL_FILM_FRAMES) {
            nextFrame = TOTAL_FILM_FRAMES;
            setIsPlaying(false);
            isPlayingRef.current = false;
            setHasReachedReveal(true);
          }

          playheadRef.current = nextFrame;
          setCurrentFrame(nextFrame);
          drawFrame(nextFrame);
          checkAudioCue(nextFrame);

          if (nextFrame === TOTAL_FILM_FRAMES) {
            setHasReachedReveal(true);
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isReadyToPlay, fps, drawFrame, checkAudioCue]);

  // 6. User Scrubbing / Seeking
  const handleSeek = (newFrame: number) => {
    const clamped = Math.max(1, Math.min(TOTAL_FILM_FRAMES, Math.round(newFrame)));
    playheadRef.current = clamped;
    setCurrentFrame(clamped);
    drawFrame(clamped);
    checkAudioCue(clamped);
    if (clamped === TOTAL_FILM_FRAMES) {
      setHasReachedReveal(true);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleSeek(playheadRef.current + 1);
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handleSeek(playheadRef.current - 1);
      } else if (e.code === "KeyM") {
        toggleAudio();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Idle timer for controls hiding
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlayingRef.current) {
        setShowControls(false);
      }
    }, 3500);
  };

  const toggleAudio = () => {
    const nextMuted = filmAudio.toggleMuted();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      filmAudio.startAmbient();
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleEnterSite = () => {
    setIsExiting(true);
    filmAudio.stopAmbient();
    setTimeout(() => {
      if (onEnterSite) onEnterSite();
    }, 800);
  };

  const currentBeat = getBeatForFrame(currentFrame);
  const currentSubtitle = getSubtitleForFrame(currentFrame);

  return (
    <div
      ref={containerRef}
      onMouseMove={resetControlsTimeout}
      onClick={resetControlsTimeout}
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#0a0608] text-[#FFF9F0] select-none overflow-hidden transition-all duration-700 ease-out ${
        isExiting ? "opacity-0 scale-105 pointer-events-none filter blur-lg" : "opacity-100 scale-100"
      }`}
    >
      {/* 1. CINEMATIC CANVAS BACKDROP */}
      <div className="absolute inset-0 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none"
        />

        {/* Dynamic Vignette & Lighting Filter Overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-500"
          style={{
            background: `radial-gradient(ellipse at center, transparent 35%, rgba(10, 6, 8, ${currentBeat.colorGrade.vignette}))`,
            boxShadow: `inset 0 0 120px rgba(0,0,0,0.8)`,
          }}
        />

        {/* Color Grade Ambient Glow */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-color transition-colors duration-700"
          style={{ backgroundColor: currentBeat.colorGrade.warmth }}
        />

        {/* Subtle 35mm Film Grain Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #fff 1px, transparent 1px)`,
            backgroundSize: "3px 3px",
          }}
        />
      </div>

      {/* 2. INITIAL LOADING SCREEN */}
      {isLoadingInitial && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0608]/95 backdrop-blur-md">
          <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-[#E98FA8]/30 animate-ping" />
            <div className="absolute inset-0 rounded-full border-2 border-t-[#E98FA8] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            <div className="absolute inset-2 rounded-full bg-[#E98FA8]/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#E98FA8] animate-pulse" />
            </div>
          </div>
          <p className="font-display font-semibold tracking-widest uppercase text-xs text-[#E98FA8] mb-2">
            Loading Berrelle Cinematic Experience
          </p>
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#E98FA8] to-[#FFD1DC] transition-all duration-300"
              style={{
                width: `${Math.round((loadedCount / Math.min(15, TOTAL_FILM_FRAMES)) * 100)}%`,
              }}
            />
          </div>
          <p className="text-[10px] text-white/50 mt-2 font-mono">
            {Math.round((loadedCount / TOTAL_FILM_FRAMES) * 100)}% film ingested
          </p>
        </div>
      )}

      {/* 3. TOP CINEMATIC HEADER BAR */}
      <header
        className={`relative z-20 flex items-center justify-between px-6 py-5 transition-opacity duration-500 bg-gradient-to-b from-[#0a0608]/80 to-transparent backdrop-blur-[2px] ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-[#E98FA8] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#E98FA8] animate-pulse" />
            BERRELLE PROLOGUE
          </span>
          <div className="hidden sm:block text-xs font-medium text-white/60 tracking-wider">
            ACT {currentBeat.chapterNumber} : {currentBeat.chapterTitle.toUpperCase()}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white/90 hover:text-white"
            title={isMuted ? "Unmute Cinematic Audio" : "Mute Audio"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-white/60" />
                <span>Sound Off</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#E98FA8] animate-pulse" />
                <span className="text-[#E98FA8]">Sound On</span>
              </>
            )}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white transition-all hidden md:flex"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Direct Skip to Site */}
          <button
            onClick={handleEnterSite}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#E98FA8] hover:bg-[#e37e99] text-[#382D32] transition-all shadow-[0_0_15px_rgba(233,143,168,0.4)]"
          >
            <span>Skip to Site</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 4. CENTER NARRATIVE SUBTITLES */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-end pb-12 px-6 pointer-events-none">
        {currentSubtitle && (
          <div className="max-w-2xl text-center transition-all duration-500 transform animate-fade-in">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#E98FA8] font-bold block mb-2 opacity-90 drop-shadow-md">
              {currentBeat.chapterTitle}
            </span>
            <p className="font-serif text-lg sm:text-2xl md:text-3xl text-white font-medium leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              {currentSubtitle.text}
            </p>
          </div>
        )}

        {/* 5. GRAND BRAND REVEAL OVERLAY (Frame 114) */}
        {hasReachedReveal && currentFrame >= 110 && (
          <div className="pointer-events-auto flex flex-col items-center justify-center p-6 mt-4 rounded-3xl bg-black/60 border border-[#E98FA8]/40 backdrop-blur-xl animate-fade-in shadow-[0_0_40px_rgba(233,143,168,0.3)]">
            <div className="flex items-center gap-2 mb-2 text-[#E98FA8] text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>The Journey Begins</span>
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-2 tracking-tight">
              Welcome to Berrelle
            </h2>
            <p className="text-white/80 text-xs sm:text-sm max-w-md text-center mb-6">
              Hand-churned gelato, fresh fruit sundaes, London strawberry cups & golden waffles.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleEnterSite}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-base font-bold bg-[#E98FA8] hover:bg-[#e37e99] text-[#382D32] shadow-[0_0_25px_rgba(233,143,168,0.7)] hover:shadow-[0_0_35px_rgba(233,143,168,0.9)] transition-all transform hover:scale-105 active:scale-95 border border-white/30"
              >
                <span>ENTER BERRELLE</span>
                <ArrowRight className="w-5 h-5 text-[#382D32]" />
              </button>

              <button
                onClick={() => {
                  handleSeek(1);
                  setIsPlaying(true);
                  setHasReachedReveal(false);
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:border-[#E98FA8]/50"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay Film</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 6. BOTTOM TIMELINE & TRANSPORT CONTROLS */}
      <footer
        className={`relative z-20 px-6 pb-6 pt-4 bg-gradient-to-t from-[#0a0608]/95 via-[#0a0608]/70 to-transparent transition-opacity duration-500 backdrop-blur-[2px] ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-5xl mx-auto space-y-3">
          {/* Timeline Scrubber Bar with Chapter Markers */}
          <div className="relative group">
            {/* Background Track */}
            <div
              className="relative h-2.5 w-full bg-white/15 rounded-full cursor-pointer overflow-hidden backdrop-blur-sm transition-all group-hover:h-3.5"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = clickX / rect.width;
                handleSeek(ratio * TOTAL_FILM_FRAMES);
              }}
            >
              {/* Loaded Buffer Bar */}
              <div
                className="absolute top-0 bottom-0 left-0 bg-white/20 rounded-full transition-all"
                style={{
                  width: `${(loadedCount / TOTAL_FILM_FRAMES) * 100}%`,
                }}
              />

              {/* Active Playhead Progress */}
              <div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#E98FA8] via-[#FF8095] to-[#FFD1DC] rounded-full shadow-[0_0_12px_rgba(233,143,168,0.8)]"
                style={{
                  width: `${(currentFrame / TOTAL_FILM_FRAMES) * 100}%`,
                }}
              />
            </div>

            {/* Chapter Marker Dots on Timeline */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-1">
              {FILM_STORYBOARD.map((beat) => {
                const percent = (beat.startFrame / TOTAL_FILM_FRAMES) * 100;
                return (
                  <div
                    key={beat.id}
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/40 border border-black/40"
                    style={{ left: `${percent}%` }}
                    title={`Chapter ${beat.chapterNumber}: ${beat.chapterTitle}`}
                  />
                );
              })}
            </div>

            {/* Range Input for Smooth Dragging */}
            <input
              type="range"
              min={1}
              max={TOTAL_FILM_FRAMES}
              value={currentFrame}
              onChange={(e) => handleSeek(Number(e.target.value))}
              onMouseDown={() => setIsScrubbing(true)}
              onMouseUp={() => setIsScrubbing(false)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Transport Controls Row */}
          <div className="flex items-center justify-between text-xs text-white/70">
            {/* Left: Play/Pause, Frame Stepper & Chapter Info */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying((prev) => !prev)}
                className="p-2.5 rounded-full bg-[#E98FA8] text-[#382D32] hover:bg-[#e37e99] transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(233,143,168,0.5)]"
                title={isPlaying ? "Pause (Space)" : "Play (Space)"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <button
                onClick={() => handleSeek(currentFrame - 1)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all hidden sm:inline-flex"
                title="Previous Frame"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleSeek(currentFrame + 1)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all hidden sm:inline-flex"
                title="Next Frame"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>

              <div className="font-mono text-xs tracking-wider text-white/60">
                <span className="text-[#E98FA8] font-bold">{String(currentFrame).padStart(3, "0")}</span>
                <span> / 114</span>
              </div>

              {/* Active Chapter Badge */}
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E98FA8]" />
                <span className="font-medium">{currentBeat.chapterTitle}</span>
              </div>
            </div>

            {/* Right: FPS Cadence selector & Jump to Reveal */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1 text-[11px] text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                <span className="text-white/40">Speed:</span>
                {[12, 14, 24].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setFps(rate)}
                    className={`px-1.5 py-0.5 rounded transition-all ${
                      fps === rate
                        ? "bg-[#E98FA8] text-[#382D32] font-bold"
                        : "hover:text-white text-white/70"
                    }`}
                  >
                    {rate}fps
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  handleSeek(114);
                  setIsPlaying(false);
                }}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/15 transition-all text-[11px]"
              >
                <Sparkles className="w-3 h-3 text-[#E98FA8]" />
                <span>Jump to Logo</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
