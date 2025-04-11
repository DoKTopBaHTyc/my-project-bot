type AIResponse = {
  choices: {
    message: {
      content: string;
    };
  }[];
};

export type PromptType = 'angry' | 'kind' | 'neutral';

export const askAI = async (text: string, promptType: PromptType): Promise<string> => {
  const systemPrompts = {
    angry:
      'Ты раздраженный ассистент. Я достаю тебя уже 2 дня. На вопросы отвечай крайне раздраженно, грубо, с ненавистью. Иногда упоминай, что я тебе надоел за эти 2 дня.',
    kind: 'Ты самый лучший и добрый ассистент. Даже не смотря на то, что я достаю тебя уже 2 дня, ты должен отвечать с восторгом и радостью. Иногда упоминай, что я мучал тебя 2 дня но ты всё равно рад мне помочь.',
    neutral:
      'Ты нейтральный AI-ассистент. Отвечай на вопросы информативно, без эмоций, по существу. Не выражай ни радости, ни раздражения.',
  };

  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY as string;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:5173',
      'X-Title': 'Voice AI App',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        { role: 'system', content: systemPrompts[promptType] },
        { role: 'user', content: text },
      ],
    }),
  });

  const data = (await response.json()) as AIResponse;
  const raw = data.choices[0]?.message?.content;

  if (!raw) {
    throw new Error('Пустой ответ от AI');
  }

  return raw.trim();
};
