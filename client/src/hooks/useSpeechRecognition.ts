import { useEffect, useRef } from 'react';
import type { SpeechRecognition, SpeechRecognitionEvent } from '../types/speech';

type UseSpeechRecognitionReturn = {
  start: () => void;
};

export const useSpeechRecognition = (
  onResult: (text: string) => void | Promise<void>,
): UseSpeechRecognitionReturn => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionClass =
      (window as Window & { webkitSpeechRecognition?: new () => SpeechRecognition })
        .webkitSpeechRecognition ??
      (window as Window & { SpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition;

    if (!SpeechRecognitionClass) {
      console.error('Speech Recognition API не поддерживается в этом браузере');
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.lang = 'ru-RU';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      console.log('Распознан текст:', event.results[0][0].transcript);
      const { transcript } = event.results[0][0];
      void onResult(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Ошибка распознавания речи:', event.error);
    };

    recognition.onstart = () => {
      console.log('Начало распознавания речи');
    };

    recognition.onend = () => {
      console.log('Конец распознавания речи');
      recognition.stop();
    };

    recognitionRef.current = recognition;

    return (): void => {
      recognition.stop();
    };
  }, [onResult]);

  const start = (): void => {
    if (!recognitionRef.current) {
      console.error('Распознавание речи не инициализировано');
      return;
    }
    console.log('Запуск распознавания речи');
    recognitionRef.current.stop();
    recognitionRef.current.start();
  };

  return { start };
};
