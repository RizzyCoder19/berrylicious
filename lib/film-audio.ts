/**
 * Procedural Web Audio Engine for Berrelle Prologue Film
 * Generates cinematic ambient pads, magical chimes, and transition sweeps
 * completely client-side with zero external bandwidth/assets.
 */

class FilmAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private initialized: boolean = false;

  private initContext() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.6, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
    this.initialized = true;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      const target = muted ? 0 : 0.6;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
  }

  public toggleMuted(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Start soft background drone for night atmosphere
   */
  public startAmbient() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.ambientOsc) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    // Warm sub drone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 warm drone

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(220, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.setTargetAtTime(0.2, this.ctx.currentTime, 1.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    this.ambientOsc = osc;
    this.ambientGain = gain;
  }

  public stopAmbient() {
    if (this.ambientGain && this.ctx && this.ambientOsc) {
      this.ambientGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.8);
      setTimeout(() => {
        try {
          this.ambientOsc?.stop();
          this.ambientOsc?.disconnect();
          this.ambientOsc = null;
          this.ambientGain = null;
        } catch {}
      }, 1000);
    }
  }

  /**
   * Sparkle sound when the strawberry lights up (Frame 29-44)
   */
  public playSparkle() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.08);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime + i * 0.08);
      gain.gain.setTargetAtTime(0.12, this.ctx.currentTime + i * 0.08, 0.02);
      gain.gain.setTargetAtTime(0.0001, this.ctx.currentTime + i * 0.08 + 0.15, 0.3);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(this.ctx.currentTime + i * 0.08);
      osc.stop(this.ctx.currentTime + i * 0.08 + 1.2);
    });
  }

  /**
   * Portal sweep when crossing into the dreamscape (Frame 45)
   */
  public playPortalShift() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(80, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 1.0);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(150, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + 0.8);
    filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 1.5);

    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.setTargetAtTime(0.35, this.ctx.currentTime, 0.1);
    gain.gain.setTargetAtTime(0.0001, this.ctx.currentTime + 1.0, 0.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 1.8);
  }

  /**
   * Lush dreamscape pad chord
   */
  public playDreamChord() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const chord = [261.63, 329.63, 392.0, 493.88, 587.33]; // Cmaj9
    chord.forEach((freq) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.setTargetAtTime(0.08, this.ctx.currentTime, 0.3);
      gain.gain.setTargetAtTime(0.0001, this.ctx.currentTime + 1.2, 1.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 3.0);
    });
  }

  /**
   * Cloche crystal chime (Frame 76-95)
   */
  public playCrystalChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1174.66, this.ctx.currentTime); // D6 crystal note

    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.setTargetAtTime(0.25, this.ctx.currentTime, 0.01);
    gain.gain.setTargetAtTime(0.0001, this.ctx.currentTime + 0.1, 0.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 2.0);
  }

  /**
   * Grand reveal fanfare chord for Frame 114 (Berrelle brand reveal)
   */
  public playGrandReveal() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    // Radiant F major 9th chord
    const freqs = [174.61, 261.63, 329.63, 349.23, 440.0, 523.25, 659.25, 880.0];
    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.03);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime + idx * 0.03);
      gain.gain.setTargetAtTime(0.12, this.ctx.currentTime + idx * 0.03, 0.15);
      gain.gain.setTargetAtTime(0.0001, this.ctx.currentTime + idx * 0.03 + 1.8, 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(this.ctx.currentTime + idx * 0.03);
      osc.stop(this.ctx.currentTime + idx * 0.03 + 3.8);
    });
  }

  public dispose() {
    this.stopAmbient();
    if (this.ctx && this.ctx.state !== "closed") {
      this.ctx.close().catch(() => {});
    }
    this.ctx = null;
    this.masterGain = null;
  }
}

export const filmAudio = new FilmAudioEngine();
