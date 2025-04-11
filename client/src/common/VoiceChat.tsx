import React, { useEffect, useRef, useState } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { askAI, type PromptType } from '../services/aiService';
import type { SpeechOptions } from '../types/speech';
import { findRussianVoice, getAvailableVoices, speak, stopSpeaking } from '../utils/speechUtils';
import './VoiceChat.css';

const VoiceChat: React.FC = () => {
  const [answer, setAnswer] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>('');
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const activeModeRef = useRef<PromptType | null>(null);
  const answerRef = useRef<HTMLParagraphElement | null>(null); 
  useEffect(() => {
    const loadVoices = (): void => {
      const voices = getAvailableVoices();
      setSelectedVoice(findRussianVoice(voices));
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    return (): void => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (answerRef.current) {
      answerRef.current.classList.remove('answer-text-animate'); 
      void answerRef.current.offsetWidth;
      answerRef.current.classList.add('answer-text-animate'); 
    }
  }, [answer]);

  const handleQuery = async (query: string, mode: PromptType): Promise<void> => {
    try {
      const reply = await askAI(query, mode);
      setAnswer(reply);

      if (selectedVoice) {
        setIsSpeaking(true);
        const speechOptions: SpeechOptions = {
          voice: selectedVoice,
          pitch: mode === 'angry' ? 0.1 : 1.0,
          rate: mode === 'angry' ? 1.1 : 1.0,
          onEnd: () => setIsSpeaking(false),
        };
        speak(reply, speechOptions);
      }
    } catch (err) {
      console.error('Ошибка при обработке запроса:', err);
      setAnswer('Ошибка при обработке запроса');
      if (selectedVoice) {
        speak('Произошла ошибка', { voice: selectedVoice });
      }
    } finally {
      setIsListening(false);
    }
  };

  const { start } = useSpeechRecognition((text: string) => {
    if (activeModeRef.current) {
      void handleQuery(text, activeModeRef.current);
    }
  });

  const handleStartListening = (mode: PromptType): void => {
    setIsListening(true);
    activeModeRef.current = mode;
    start();
  };

  const handleStopSpeaking = (): void => {
    stopSpeaking();
    setIsSpeaking(false);
  };

  const handleTextSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (textInput.trim()) {
      void handleQuery(textInput, 'neutral');
      setTextInput('');
    }
  };

  return (
    <div className="voice-chat-container glow">
      <h1 className="title glow-text">AI-ассистент с биполяркой</h1>

      <div className="mode-selection">
        <button
          className={`mode-btn kind glow ${
            isListening && activeModeRef.current === 'kind' ? 'active' : ''
          }`}
          onClick={() => handleStartListening('kind')}
          disabled={isListening && activeModeRef.current !== 'kind'}
        >
          {isListening && activeModeRef.current === 'kind' ? '🎙️\nДобрый' : '😊\nДобрый'}
        </button>

        <button
          className={`mode-btn angry glow ${
            isListening && activeModeRef.current === 'angry' ? 'active' : ''
          }`}
          onClick={() => handleStartListening('angry')}
          disabled={isListening && activeModeRef.current !== 'angry'}
        >
          {isListening && activeModeRef.current === 'angry' ? '🎙️\nЗлой' : '👿\nЗлой'}
        </button>
      </div>

      <form onSubmit={handleTextSubmit} className="text-form">
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Введите текст для нейтрального режима..."
          className="text-input glow"
        />
        <button type="submit" className="submit-btn glow">
          Отправить
        </button>
      </form>

      {answer && (
        <div className="answer-popup glow">
          <p ref={answerRef} className="answer-text answer-text-animate glow-text">
            {answer}
          </p>
        </div>
      )}

      {isSpeaking && (
        <div className="stop-btn-wrapper">
          <button className="stop-btn glow" onClick={handleStopSpeaking}>
            ⏹️ Остановить воспроизведение
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceChat;
