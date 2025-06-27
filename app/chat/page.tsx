'use client';

import { useEffect, useState } from 'react';

interface Message {
  role: 'user' | 'model'; // was: 'user' | 'ai'
  text: string;
}


export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [context, setContext] = useState<string>('');

  // Load jobId from localStorage and fetch context
  useEffect(() => {
    const savedJobId = localStorage.getItem('jobId');
    if (savedJobId) {
      setJobId(savedJobId);

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/extract?jobId=${savedJobId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'done' && data.fields) {
            const fieldEntries = Object.entries(data.fields)
              .map(([key, value]) => `${key}: ${value}`)
              .join('\n');
            setContext(fieldEntries);
          }
        })
        .catch(console.error);
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: updatedMessages,
          userMessage: input,
          context,
        }),
      });

      const data = await res.json();
const botMsg: Message = { role: 'model', text: data.reply };
      setMessages([...updatedMessages, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Insurance Chatbot</h1>
      <div className="space-y-2 h-[400px] overflow-y-auto border p-2 rounded-md bg-white">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md ${
              msg.role === 'user' ? 'bg-indigo-100 text-right' : 'bg-gray-100 text-left'
            }`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && <p className="text-gray-400">Typing...</p>}
      </div>
      <div className="flex gap-2 mt-4">
        <input
          className="border rounded-md p-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about your policy..."
        />
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
