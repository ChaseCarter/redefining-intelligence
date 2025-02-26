'use client';

import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface GenerationClientProps {
  systemMessage?: string;
  initialMessages?: Message[];
  onResponse?: (response: string) => void;
}

export default function GenerationClient({
  systemMessage = '',
  initialMessages = [],
  onResponse
}: GenerationClientProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prepare messages array including system message if provided
  const prepareMessages = () => {
    const preparedMessages = [...messages];
    
    // Add system message if it exists and isn't already in the messages
    if (systemMessage && !messages.some(msg => msg.role === 'system')) {
      preparedMessages.unshift({ role: 'system', content: systemMessage });
    }
    
    return preparedMessages;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message to the state
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      // Prepare messages including the new user message
      const messagesToSend = [...prepareMessages(), userMessage];
      
      // Call the API
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: messagesToSend }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate response');
      }

      const data = await response.json();
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: data.content 
      };
      
      // Add assistant response to messages
      setMessages(prev => [...prev, assistantMessage]);
      
      // Call the onResponse callback if provided
      if (onResponse) {
        onResponse(data.content);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error generating response:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto">
      {/* Messages display */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.filter(msg => msg.role !== 'system').map((msg, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg ${
              msg.role === 'user' 
                ? 'bg-black/[.03] dark:bg-white/[.05] border border-black/[.08] dark:border-white/[.145] ml-auto' 
                : 'bg-black/[.03] dark:bg-white/[.05] border border-black/[.08] dark:border-white/[.145]'
            } max-w-[80%]`}
          >
            <p className="text-black dark:text-white">{msg.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className="bg-black/[.03] dark:bg-white/[.05] border border-black/[.08] dark:border-white/[.145] p-3 rounded-lg max-w-[80%]">
            <p className="text-black dark:text-white">Thinking...</p>
          </div>
        )}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 max-w-[80%]">
            <p>Error: {error}</p>
          </div>
        )}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-black/[.08] dark:border-white/[.145] rounded bg-white dark:bg-black/[.3] text-black dark:text-white"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-black/[.03] dark:bg-white/[.05] border border-black/[.08] dark:border-white/[.145] text-black dark:text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
