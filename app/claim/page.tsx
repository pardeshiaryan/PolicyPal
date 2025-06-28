
// import { useEffect, useState } from 'react';

// export default function ClaimEstimator() {
  // const [questions, setQuestions] = useState<string[]>([]);
  // const [answers, setAnswers] = useState<string[]>([]);
  // const [currentIndex, setCurrentIndex] = useState(0); // ✅ Missing before

  // const [result, setResult] = useState<any>(null); // change to `any` if backend returns JSON object
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   // Fetch generated questions from LangChain backend
  //   fetch('/api/claim/questions')
  //     .then((res) => res.json())
  //     .then((data) => setQuestions(data.questions))
  //     .catch(console.error);
  // }, []);




  "use client"
  import Navbar from "@/components/navbar"
import { cn } from "@/lib/utils"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calculator, ArrowLeft, CheckCircle, FileText, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function ClaimEstimator() {
  const [questions, setQuestions] = useState<string[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // Mock questions for demo - replace with actual API call
  // useEffect(() => {
  //   // Simulating the API call with mock data
  //   const mockQuestions = [
  //     "What type of insurance claim are you filing?",
  //     "When did the incident occur?",
  //     "Have you reported this incident to the police or relevant authorities?",
  //     "Do you have documentation or evidence of the incident?",
  //     "What is the estimated value of your claim?",
  //   ]
  //   setQuestions(mockQuestions)
  //   setAnswers(new Array(mockQuestions.length).fill(""))
  // }, [])
useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const res = await fetch("/api/claim/questions");
      const data = await res.json();
      setQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(""));
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  fetchQuestions();
}, []);


  const handleAnswer = async () => {
    const currentAnswer = answers[currentIndex] || ""
    if (!currentAnswer.trim()) return

    const nextIndex = currentIndex + 1
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex)
       setTimeout(() => {
        const nextInput = document.querySelector('input[type="text"]') as HTMLInputElement
        if (nextInput) {
          nextInput.focus()
        }
      }, 100)
    } else {
      // All questions answered, call estimator
      setLoading(true)
      try {
        const res = await fetch("/api/claim/estimate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers }),
        })
        const data = await res.json()
        setResult(data)
      } catch (error) {
        console.error("Error estimating claim:", error)
        // Mock result for demo
        setResult({
          eligibility: "High",
          claimScore: 85,
          reasons: [
            "All required documentation is available",
            "Incident falls within policy coverage",
            "Claim amount is reasonable for the incident type",
          ],
          nextSteps: [
            "Gather all supporting documents",
            "Contact your insurance provider",
            "File the claim within the required timeframe",
          ],
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const updateAnswer = (text: string) => {
    const updated = [...answers]
    updated[currentIndex] = text
    setAnswers(updated)
  }

  const resetEstimator = () => {
    setCurrentIndex(0)
    setAnswers(new Array(questions.length).fill(""))
    setResult(null)
  }

  const progressPercentage = ((currentIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
   <Navbar/>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Claim Eligibility Estimator</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Answer a few questions to get an AI-powered assessment of your claim's likelihood of success.
            </p>
          </div>

          {result ? (
            /* Results Display */
            <div className="space-y-6">
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b">
                  <CardTitle className="flex items-center space-x-2 text-gray-900">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                    <span>Your Claim Assessment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {/* Eligibility Score */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 rounded-full mb-4">
                      <span className="text-3xl font-bold text-emerald-600">{result.claimScore}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{result.eligibility} Eligibility</h3>
                    <p className="text-gray-600">
                      Your claim has a <strong>{result.claimScore}% success probability</strong>
                    </p>
                  </div>

                  {/* Reasons */}
                  <div className="mb-8">
                    <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
                      Supporting Factors
                    </h4>
                    <div className="space-y-3">
                      {result.reasons.map((reason: string, i: number) => (
                        <div key={i} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">{reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="mb-8">
                    <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                      <FileText className="w-5 h-5 text-green-600 mr-2" />
                      Recommended Next Steps
                    </h4>
                    <div className="space-y-3">
                      {result.nextSteps.map((step: string, i: number) => (
                        <div key={i} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            {i + 1}
                          </div>
                          <p className="text-gray-700">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={resetEstimator}
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      Start New Assessment
                    </Button>
                    <Link href="/chat">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
                        Chat with PolicyPal
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : questions.length > 0 ? (
            /* Question Flow */
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-green-50 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-green-800">
                    <Calculator className="w-5 h-5" />
                    <span>
                      Question {currentIndex + 1} of {questions.length}
                    </span>
                  </CardTitle>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {Math.round(progressPercentage)}% Complete
                  </Badge>
                </div>
                <Progress  value={progressPercentage} className="mt-4" />
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{questions[currentIndex]}</h3>
                    <Input
                      className={cn(
                        "text-lg p-4 border-gray-300 focus:border-green-500 focus:ring-green-500",
                        !answers[currentIndex]?.trim() && "border-green-300",
                      )}
                      value={answers[currentIndex] || ""}
                      onChange={(e) => updateAnswer(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAnswer()}
                      placeholder="Enter your answer here..."
                      disabled={loading}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                      disabled={currentIndex === 0}
                      className="border-gray-300"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleAnswer}
                      disabled={!answers[currentIndex]?.trim() || loading}
                      className="bg-green-600 hover:bg-green-700 px-8"
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing...</span>
                        </div>
                      ) : currentIndex === questions.length - 1 ? (
                        "Get Assessment"
                      ) : (
                        "Next Question"
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Loading State */
            <Card className="shadow-xl border-0">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-green-600 animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Preparing Your Assessment</h3>
                <p className="text-gray-600">Loading personalized questions for your claim evaluation...</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
