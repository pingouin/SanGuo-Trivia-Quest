// Simple sound synthesis for effects (offline friendly)
const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

export const playSound = (type: 'correct' | 'wrong' | 'hit' | 'win' | 'click') => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  switch (type) {
    case 'correct':
      // High pitch ding
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, now);
      oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      oscillator.start(now);
      oscillator.stop(now + 0.5);
      break;
      
    case 'wrong':
      // Low pitch buzz
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(150, now);
      oscillator.frequency.linearRampToValueAtTime(100, now + 0.3);
      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      oscillator.start(now);
      oscillator.stop(now + 0.3);
      break;

    case 'hit':
      // Noise-like hit (simulated with low freq square)
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(100, now);
      oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.1);
      gainNode.gain.setValueAtTime(0.5, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      oscillator.start(now);
      oscillator.stop(now + 0.2);
      break;
    
    case 'click':
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(600, now);
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      oscillator.start(now);
      oscillator.stop(now + 0.05);
      break;

    case 'win':
        // Major chord arpeggio
        [440, 554, 659, 880].forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gn = audioCtx.createGain();
            osc.connect(gn);
            gn.connect(audioCtx.destination);
            osc.frequency.value = freq;
            gn.gain.setValueAtTime(0.2, now + i * 0.1);
            gn.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 1);
            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 1);
        });
        break;
  }
};

// Background Music Helper (using placeholder generic URLs)
let bgmAudio: HTMLAudioElement | null = null;

export const playBGM = (isBoss: boolean) => {
    if (bgmAudio) {
        bgmAudio.pause();
    }
    
    // Note: In a real app, these should be local assets. 
    // Using simple placeholders logic. 
    // Since we cannot bundle assets, we will assume these files don't exist
    // and this function primarily sets up the architecture for the user to replace sources.
    const src = isBoss 
        ? 'https://upload.wikimedia.org/wikipedia/commons/5/52/Drum_beat.ogg' // Placeholder for intense
        : 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Guzheng_-_Fisherman%27s_Song_at_Dusk.ogg'; // Placeholder for guzheng
    
    bgmAudio = new Audio(src);
    bgmAudio.loop = true;
    bgmAudio.volume = 0.3;
    // bgmAudio.play().catch(e => console.log("Audio autoplay blocked", e));
};

export const stopBGM = () => {
    if (bgmAudio) {
        bgmAudio.pause();
        bgmAudio = null;
    }
}