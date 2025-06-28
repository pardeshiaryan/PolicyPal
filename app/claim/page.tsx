'use client';

import { useEffect, useState } from 'react';

export default function ClaimEstimator() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // ✅ Missing before

  const [result, setResult] = useState<any>(null); // change to `any` if backend returns JSON object
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch generated questions from LangChain backend
    fetch('/api/claim/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions))
      .catch(console.error);
  }, []);

  const handleAnswer = async () => {
    const currentAnswer = answers[currentIndex] || '';
    if (!currentAnswer.trim()) return;

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      // All questions answered, call estimator
      setLoading(true);
      const res = await fetch('/api/claim/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      setResult(data); // backend returns full JSON with score, reasons, etc.
      setLoading(false);
    }
  };

  const updateAnswer = (text: string) => {
    const updated = [...answers];
    updated[currentIndex] = text;
    setAnswers(updated);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">Claim Eligibility Estimator</h2>

      {result ? (
        <div className="bg-green-100 p-4 rounded-md space-y-2">
          <p className="text-lg font-semibold">Eligibility: {result.eligibility}</p>
          <p className="font-medium">Score: {result.claimScore}/100</p>
          <div>
            <p className="font-semibold">Reasons:</p>
            <ul className="list-disc pl-5">
              {result.reasons.map((r: string, i: number) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold">Next Steps:</p>
            <ul className="list-disc pl-5">
              {result.nextSteps.map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : questions.length > 0 ? (
        <>
          <p className="font-medium">{questions[currentIndex]}</p>
          <input
            className="border p-2 rounded w-full"
            value={answers[currentIndex] || ''}
            onChange={(e) => updateAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAnswer()}
          />
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={handleAnswer}
          >
            {currentIndex === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </>
      ) : (
        <p>Loading questions...</p>
      )}

      {loading && <p className="text-gray-500">Calculating claim eligibility...</p>}
    </div>
  );
}
