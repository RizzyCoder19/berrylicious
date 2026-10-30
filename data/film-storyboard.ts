export interface StoryboardBeat {
  id: string;
  chapterNumber: number;
  chapterTitle: string;
  startFrame: number;
  endFrame: number;
  subtitles: {
    start: number;
    end: number;
    text: string;
    emphasis?: string;
  }[];
  mood: string;
  colorGrade: {
    warmth: string; // CSS filter or overlay color
    vignette: number; // 0 - 1
    grainOpacity: number; // 0 - 1
    glowIntensity: number; // 0 - 1
  };
  audioCue?: {
    type: "drone" | "sparkle" | "portal" | "dreamscape" | "epiphany" | "reveal";
    frequency?: number;
    volume?: number;
  };
}

export const TOTAL_FILM_FRAMES = 114;

export const FILM_STORYBOARD: StoryboardBeat[] = [
  {
    id: "beat-1-midnight-grind",
    chapterNumber: 1,
    chapterTitle: "Ordinary Midnight",
    startFrame: 1,
    endFrame: 18,
    subtitles: [
      {
        start: 1,
        end: 9,
        text: "11:47 PM. Late hours, quiet room, and a craving that coffee couldn't fix.",
        emphasis: "11:47 PM",
      },
      {
        start: 10,
        end: 18,
        text: "When work never stops, ordinary moments lose their sweetness.",
        emphasis: "sweetness",
      },
    ],
    mood: "Nocturnal amber, solitary desk lamplight, heavy rain outside",
    colorGrade: {
      warmth: "rgba(220, 150, 90, 0.08)",
      vignette: 0.45,
      grainOpacity: 0.12,
      glowIntensity: 0.1,
    },
    audioCue: {
      type: "drone",
      frequency: 110,
      volume: 0.25,
    },
  },
  {
    id: "beat-2-the-craving",
    chapterNumber: 2,
    chapterTitle: "The Empty Pantry",
    startFrame: 19,
    endFrame: 28,
    subtitles: [
      {
        start: 19,
        end: 28,
        text: "Empty wrappers. Bland, mass-produced sweets. Why do we settle for artificial?",
        emphasis: "settle for artificial",
      },
    ],
    mood: "Muted marble kitchen counter, quiet introspection",
    colorGrade: {
      warmth: "rgba(180, 120, 80, 0.06)",
      vignette: 0.5,
      grainOpacity: 0.15,
      glowIntensity: 0.12,
    },
    audioCue: {
      type: "drone",
      frequency: 146.83,
      volume: 0.3,
    },
  },
  {
    id: "beat-3-the-spark",
    chapterNumber: 3,
    chapterTitle: "The Luminous Spark",
    startFrame: 29,
    endFrame: 44,
    subtitles: [
      {
        start: 29,
        end: 36,
        text: "Then, on the dark counter... an impossible ruby glow began to bloom.",
        emphasis: "ruby glow",
      },
      {
        start: 37,
        end: 44,
        text: "A strawberry born of pure starlight. Reaching out to touch it...",
        emphasis: "pure starlight",
      },
    ],
    mood: "Ruby embers radiating across marble, magical blooming light",
    colorGrade: {
      warmth: "rgba(233, 75, 107, 0.18)",
      vignette: 0.55,
      grainOpacity: 0.08,
      glowIntensity: 0.5,
    },
    audioCue: {
      type: "sparkle",
      frequency: 523.25, // High C
      volume: 0.45,
    },
  },
  {
    id: "beat-4-portal-crossing",
    chapterNumber: 4,
    chapterTitle: "The Threshold",
    startFrame: 45,
    endFrame: 49,
    subtitles: [
      {
        start: 45,
        end: 49,
        text: "The kitchen dissolved in a flash of warmth and sweetness.",
        emphasis: "dissolved",
      },
    ],
    mood: "Dimensional void into radiant dreamscape",
    colorGrade: {
      warmth: "rgba(255, 235, 210, 0.25)",
      vignette: 0.7,
      grainOpacity: 0.05,
      glowIntensity: 0.8,
    },
    audioCue: {
      type: "portal",
      frequency: 220,
      volume: 0.6,
    },
  },
  {
    id: "beat-5-the-dreamscape",
    chapterNumber: 5,
    chapterTitle: "The Dessert Palace",
    startFrame: 50,
    endFrame: 75,
    subtitles: [
      {
        start: 50,
        end: 62,
        text: "A palace where fresh berries float upon spun-sugar towers and golden chandeliers.",
        emphasis: "palace",
      },
      {
        start: 63,
        end: 75,
        text: "Real ingredients. Real fruit. Not factory preservatives — living, joyous dessert art.",
        emphasis: "living, joyous dessert art",
      },
    ],
    mood: "Baroque confectionery palace, strawberry clouds, golden chandeliers",
    colorGrade: {
      warmth: "rgba(255, 182, 193, 0.15)",
      vignette: 0.35,
      grainOpacity: 0.05,
      glowIntensity: 0.45,
    },
    audioCue: {
      type: "dreamscape",
      frequency: 440,
      volume: 0.5,
    },
  },
  {
    id: "beat-6-the-cloche",
    chapterNumber: 6,
    chapterTitle: "The Grand Cloche",
    startFrame: 76,
    endFrame: 95,
    subtitles: [
      {
        start: 76,
        end: 85,
        text: "Under the golden glass bell rested the crown jewel: layers of dark chocolate and fresh berry cream.",
        emphasis: "crown jewel",
      },
      {
        start: 86,
        end: 95,
        text: "And in the crystal curvature... she saw her own kitchen reflected.",
        emphasis: "her own kitchen reflected",
      },
    ],
    mood: "Glistening crystal cloche, warm golden highlights, magical epiphany",
    colorGrade: {
      warmth: "rgba(255, 215, 140, 0.16)",
      vignette: 0.4,
      grainOpacity: 0.06,
      glowIntensity: 0.6,
    },
    audioCue: {
      type: "epiphany",
      frequency: 659.25, // E5
      volume: 0.55,
    },
  },
  {
    id: "beat-7-epiphany",
    chapterNumber: 7,
    chapterTitle: "The Awakening",
    startFrame: 96,
    endFrame: 105,
    subtitles: [
      {
        start: 96,
        end: 105,
        text: "Awakening at the counter. The coffee was still warm, but the vision was clear.",
        emphasis: "the vision was clear",
      },
    ],
    mood: "Golden kitchen counter, glowing morning city outside, creative fire ignited",
    colorGrade: {
      warmth: "rgba(235, 160, 110, 0.12)",
      vignette: 0.4,
      grainOpacity: 0.1,
      glowIntensity: 0.25,
    },
    audioCue: {
      type: "drone",
      frequency: 330,
      volume: 0.35,
    },
  },
  {
    id: "beat-8-crafting-the-brand",
    chapterNumber: 8,
    chapterTitle: "The Sketchbook Blueprint",
    startFrame: 106,
    endFrame: 113,
    subtitles: [
      {
        start: 106,
        end: 113,
        text: "Sketching the dream: Berry Red. Velvet Cream. Decadent Chocolate. One unforgettable name.",
        emphasis: "One unforgettable name",
      },
    ],
    mood: "Sketchbook close-up, color swatches, pencil marks, anticipation",
    colorGrade: {
      warmth: "rgba(220, 140, 100, 0.1)",
      vignette: 0.35,
      grainOpacity: 0.08,
      glowIntensity: 0.3,
    },
    audioCue: {
      type: "sparkle",
      frequency: 587.33,
      volume: 0.5,
    },
  },
  {
    id: "beat-9-grand-reveal",
    chapterNumber: 9,
    chapterTitle: "BERRELLE",
    startFrame: 114,
    endFrame: 114,
    subtitles: [
      {
        start: 114,
        end: 114,
        text: "BERRELLE — Premium Dessert Chain. Turning ordinary moments into something sweeter.",
        emphasis: "BERRELLE",
      },
    ],
    mood: "Full-screen luxury logo medallion, cherry crown, cosmic crimson sparkles",
    colorGrade: {
      warmth: "rgba(233, 143, 168, 0.22)",
      vignette: 0.3,
      grainOpacity: 0.04,
      glowIntensity: 0.85,
    },
    audioCue: {
      type: "reveal",
      frequency: 880,
      volume: 0.75,
    },
  },
];

export function getBeatForFrame(frame: number): StoryboardBeat {
  const normalized = Math.max(1, Math.min(TOTAL_FILM_FRAMES, frame));
  const found = FILM_STORYBOARD.find(
    (b) => normalized >= b.startFrame && normalized <= b.endFrame
  );
  return found || FILM_STORYBOARD[0];
}

export function getSubtitleForFrame(frame: number) {
  const beat = getBeatForFrame(frame);
  return beat.subtitles.find((s) => frame >= s.start && frame <= s.end);
}
