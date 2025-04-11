export type SpeechRecognitionAlternative = {
  transcript: string;
  confidence: number;
};

export type SpeechRecognitionResult = {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  isFinal: boolean;
};

export type SpeechRecognitionResultList = {
  [index: number]: SpeechRecognitionResult;
  length: number;
  item(index: number): SpeechRecognitionResult;
};

export type SpeechRecognitionEvent = {
  results: SpeechRecognitionResultList;
};

export type SpeechRecognition = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
};

export type Window = {
  webkitSpeechRecognition?: new () => SpeechRecognition;
  SpeechRecognition?: new () => SpeechRecognition;
  speechSynthesis: SpeechSynthesis;
};

export type AIResponse = {
  choices: {
    message: {
      content: string;
    };
  }[];
};
