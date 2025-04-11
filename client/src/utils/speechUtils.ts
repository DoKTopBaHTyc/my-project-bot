import type { SpeechOptions } from '../types/speech';

export const getAvailableVoices = (): SpeechSynthesisVoice[] => window.speechSynthesis.getVoices();

export const findRussianVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null =>
  voices.find((v) => v.lang === 'ru-RU' && v.name.includes('Pavel')) ??
  voices.find((v) => v.lang === 'ru-RU') ??
  voices[0];

export const speak = (text: string, options?: SpeechOptions): void => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ru-RU';

  if (options?.voice) {
    utterance.voice = options.voice;
  }
  if (options?.pitch) {
    utterance.pitch = options.pitch;
  }
  if (options?.rate) {
    utterance.rate = options.rate;
  }

  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = (): void => {
  window.speechSynthesis.cancel();
};
