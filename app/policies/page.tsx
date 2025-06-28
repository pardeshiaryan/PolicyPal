'use client';

import { useEffect, useState } from 'react';

export default function PolicyRecommendation() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedText = localStorage.getItem('text');
    if (savedText) {
      setText(savedText);
    }
  }, []);

  const getRecommendation = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPolicyText: text }),
      });
      const data = await res.json();
      setResult(data.recommendation);
    } catch (err) {
      console.error('Error fetching recommendation:', err);
      setResult('Failed to get recommendation. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Policy Recommendation</h1>

      <textarea
        className="w-full border rounded p-3 text-sm"
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded"
        onClick={getRecommendation}
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Get Recommendation'}
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded bg-green-50 whitespace-pre-wrap">
          <h2 className="font-semibold mb-2">Recommended Policy:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
