// Web Audio API Synthesizer for procedural, zero-dependency sound effects
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1, delay = 0) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    setTimeout(() => {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        console.warn('Audio play error', e);
      }
    }, delay * 1000);
  }

  playDiceRoll() {
    if (!this.enabled) return;
    this.init();
    // Rapid rattle sound
    for (let i = 0; i < 6; i++) {
      const freq = 300 + Math.random() * 400;
      this.playTone(freq, 'triangle', 0.04, 0.08, i * 0.05);
    }
  }

  playStep() {
    if (!this.enabled) return;
    this.playTone(520, 'sine', 0.08, 0.09);
  }

  playLadder() {
    if (!this.enabled) return;
    // Ascending arpeggio
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.12, 0.12, idx * 0.08);
    });
  }

  playSnake() {
    if (!this.enabled) return;
    // Descending slide sound with noise effect
    const notes = [600, 520, 440, 350, 260, 180];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'sawtooth', 0.12, 0.07, idx * 0.07);
    });
  }

  playAntigravity() {
    if (!this.enabled) return;
    // Futuristic sci-fi shimmer / pulse
    const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 0.25, 0.15, idx * 0.07);
    });
  }

  playShieldBypass() {
    if (!this.enabled) return;
    // Electric shield deflection sound
    this.playTone(880, 'square', 0.1, 0.12, 0);
    this.playTone(1200, 'sine', 0.3, 0.18, 0.08);
    this.playTone(1760, 'sine', 0.4, 0.15, 0.18);
  }

  playCorrect() {
    if (!this.enabled) return;
    // Joyful chime
    this.playTone(523.25, 'triangle', 0.15, 0.15, 0);
    this.playTone(659.25, 'triangle', 0.15, 0.15, 0.1);
    this.playTone(783.99, 'sine', 0.3, 0.2, 0.2);
  }

  playWrong() {
    if (!this.enabled) return;
    // Low double buzz
    this.playTone(200, 'sawtooth', 0.15, 0.12, 0);
    this.playTone(160, 'sawtooth', 0.25, 0.15, 0.18);
  }

  playVictory() {
    if (!this.enabled) return;
    // Royal fanfare
    const fanfare = [
      { f: 523.25, d: 0.15, t: 0 },
      { f: 523.25, d: 0.15, t: 0.15 },
      { f: 523.25, d: 0.15, t: 0.3 },
      { f: 659.25, d: 0.4, t: 0.45 },
      { f: 587.33, d: 0.2, t: 0.9 },
      { f: 659.25, d: 0.2, t: 1.1 },
      { f: 783.99, d: 0.6, t: 1.3 }
    ];
    fanfare.forEach(n => {
      this.playTone(n.f, 'triangle', n.d, 0.2, n.t);
    });
  }

  toggleSound() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

export const soundFx = new SoundEngine();
