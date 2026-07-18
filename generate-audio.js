const fs = require('fs');
const path = require('path');

// Generate simple WAV audio files for the music system
function createWavBuffer(frequency, duration, type = 'sine', sampleRate = 44100) {
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = Buffer.alloc(44 + numSamples * 2);

  // WAV header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * 2, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sample = 0;

    // Create a more complex sound based on type
    switch (type) {
      case 'orchestral':
        sample = 0.3 * Math.sin(2 * Math.PI * frequency * t);
        sample += 0.2 * Math.sin(2 * Math.PI * frequency * 1.5 * t);
        sample += 0.15 * Math.sin(2 * Math.PI * frequency * 2 * t);
        sample += 0.1 * Math.sin(2 * Math.PI * frequency * 0.5 * t);
        sample *= 1 + 0.3 * Math.sin(2 * Math.PI * 0.5 * t);
        break;
      case 'cyberpunk':
        sample = 0.4 * Math.sin(2 * Math.PI * frequency * t);
        sample += 0.3 * Math.sin(2 * Math.PI * frequency * 2.01 * t);
        sample += 0.2 * Math.sin(2 * Math.PI * frequency * 0.99 * t);
        sample *= 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.25 * t);
        break;
      case 'piano':
        const env = Math.exp(-3 * (t % 2));
        sample = 0.5 * Math.sin(2 * Math.PI * frequency * t) * env;
        sample += 0.3 * Math.sin(2 * Math.PI * frequency * 2 * t) * env;
        sample += 0.1 * Math.sin(2 * Math.PI * frequency * 3 * t) * env;
        break;
      case 'flute':
        sample = 0.4 * Math.sin(2 * Math.PI * frequency * t);
        sample += 0.2 * Math.sin(2 * Math.PI * frequency * 2 * t) * Math.sin(2 * Math.PI * 2 * t);
        sample *= 0.7 + 0.3 * Math.sin(2 * Math.PI * 1 * t);
        break;
      case 'rain':
        sample = (Math.random() * 2 - 1) * 0.1;
        sample += 0.3 * Math.sin(2 * Math.PI * 100 * t) * (Math.random() > 0.95 ? 1 : 0.01);
        break;
      case 'battle':
        sample = 0.3 * Math.sin(2 * Math.PI * frequency * t);
        sample += 0.25 * Math.sin(2 * Math.PI * frequency * 1.25 * t);
        sample += 0.2 * Math.sin(2 * Math.PI * frequency * 1.5 * t);
        sample *= 1 + 0.5 * Math.abs(Math.sin(2 * Math.PI * 0.33 * t));
        break;
      case 'fantasy':
        sample = 0.3 * Math.sin(2 * Math.PI * frequency * t);
        sample += 0.2 * Math.sin(2 * Math.PI * frequency * 1.33 * t);
        sample += 0.15 * Math.sin(2 * Math.PI * frequency * 1.67 * t);
        sample *= 0.6 + 0.4 * Math.sin(2 * Math.PI * 0.2 * t);
        break;
      case 'night':
        sample = 0.2 * Math.sin(2 * Math.PI * frequency * 0.5 * t);
        sample += 0.15 * Math.sin(2 * Math.PI * frequency * 0.75 * t);
        sample += (Math.random() * 2 - 1) * 0.02;
        sample *= 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.1 * t);
        break;
      default:
        sample = 0.4 * Math.sin(2 * Math.PI * frequency * t);
    }

    // Fade in/out
    const fadeIn = Math.min(1, t * 2);
    const fadeOut = Math.min(1, (duration - t) * 2);
    sample *= fadeIn * fadeOut;

    // Clamp
    sample = Math.max(-0.9, Math.min(0.9, sample));
    buffer.writeInt16LE(Math.floor(sample * 32767), 44 + i * 2);
  }

  return buffer;
}

const tracks = [
  { name: 'anime-orchestral', freq: 220, type: 'orchestral', dur: 8 },
  { name: 'cyberpunk', freq: 110, type: 'cyberpunk', dur: 8 },
  { name: 'relaxing-piano', freq: 261.63, type: 'piano', dur: 8 },
  { name: 'japanese-flute', freq: 440, type: 'flute', dur: 8 },
  { name: 'rain-ambience', freq: 200, type: 'rain', dur: 8 },
  { name: 'battle', freq: 165, type: 'battle', dur: 8 },
  { name: 'fantasy', freq: 330, type: 'fantasy', dur: 8 },
  { name: 'night-ambience', freq: 185, type: 'night', dur: 8 },
];

const musicDir = path.join(__dirname, 'public', 'music');
if (!fs.existsSync(musicDir)) {
  fs.mkdirSync(musicDir, { recursive: true });
}

tracks.forEach(track => {
  const buffer = createWavBuffer(track.freq, track.dur, track.type);
  const filePath = path.join(musicDir, `${track.name}.wav`);
  fs.writeFileSync(filePath, buffer);
  console.log(`Created: ${track.name}.wav`);
});

console.log('All audio files generated!');
