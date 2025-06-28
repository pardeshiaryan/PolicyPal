"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Target,
  FileText,
  TrendingUp,
  Shield,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Loader2,
  Sparkles,
  ArrowRight,
  Brain,
  Star,
  Clock,
  Users,
} from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

export default function PolicyRecommendation() {
  const [text, setText] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)
  const [problem, setProblem] = useState("")
  const [summaryLoading, setSummaryLoading] = useState(true)
  const [summaryError, setSummaryError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSummary = async () => {
      setSummaryLoading(true)
      setSummaryError(null)

      try {
        const savedText = localStorage.getItem("text")
        if (savedText) {
          setText(savedText)
        } else {
          throw new Error("No saved policy text found. Please upload your policy document first.")
        }

        const jobId = localStorage.getItem("jobId")
        if (!jobId) {
          throw new Error("No jobId found in localStorage. Please upload your policy document first.")
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/summary?jobId=${jobId}`)
        const data = await res.json()

        if (data.status === "done" && data.summary) {
          setSummary(data.summary)
        } else {
          throw new Error("Summary is still processing or missing.")
        }
      } catch (err) {
        console.error("Error fetching summary:", err)
        setSummaryError(err instanceof Error ? err.message : "Failed to load summary")
      } finally {
        setSummaryLoading(false)
      }
    }

    fetchSummary()
  }, [])

  const getRecommendation = async () => {
    if (!summary) return

    setLoading(true)
    try {
      const res = await fetch("/api/policies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPolicyText: text, problem: problem }),
      })

      const data = await res.json()
      setResult(data.recommendation)
    } catch (err) {
      console.error("Error fetching recommendation:", err)
      setResult("Failed to get recommendation. Try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Hero Section */}
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-green-600/10 rounded-3xl blur-3xl -z-10"></div>
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              <span>AI-Powered Policy Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent mb-6">
              Smart Policy Recommendations
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover personalized insurance recommendations with our advanced AI analysis. Identify coverage gaps and optimize your protection.
            </p>
            
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-2xl mx-auto">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-emerald-100">
                <div className="flex items-center justify-center space-x-2 text-emerald-600 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="font-bold text-lg">10K+</span>
                </div>
                <p className="text-sm text-gray-600">Policies Analyzed</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-emerald-100">
                <div className="flex items-center justify-center space-x-2 text-emerald-600 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold text-lg">30s</span>
                </div>
                <p className="text-sm text-gray-600">Analysis Time</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-emerald-100">
                <div className="flex items-center justify-center space-x-2 text-emerald-600 mb-2">
                  <Star className="w-5 h-5" />
                  <span className="font-bold text-lg">95%</span>
                </div>
                <p className="text-sm text-gray-600">Accuracy Rate</p>
              </div>
            </div>
          </div>

          {/* Action Buttons - Show only when result exists */}
          {result && (
            <div className="mb-8 text-center">
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <Link href="/chat" className="flex-1">
                  <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 w-full py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
                    <Brain className="w-5 h-5 mr-2" />
                    Discuss with PolicyPal
                  </Button>
                </Link>
                <Link href="/claim" className="flex-1">
                  <Button
                    variant="outline"
                    className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-700 w-full bg-white/80 backdrop-blur-sm py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    Check Claim Eligibility
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Enhanced Input Section */}
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl shadow-emerald-100/50 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span>Policy Analysis Center</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {/* Enhanced Summary Section */}
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Policy Summary</label>
                      </div>

                      {summaryLoading ? (
                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl p-8">
                          <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="relative">
                              <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                              <div className="absolute inset-0 w-8 h-8 border-2 border-emerald-200 rounded-full animate-pulse"></div>
                            </div>
                            <div className="text-center">
                              <p className="font-medium text-emerald-700">Analyzing your policy...</p>
                              <p className="text-sm text-emerald-600 mt-1">This usually takes 10-30 seconds</p>
                            </div>
                          </div>
                        </div>
                      ) : summaryError ? (
                        <Alert className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
                          <AlertTriangle className="h-5 w-5 text-orange-600" />
                          <AlertDescription className="text-orange-800 font-medium">
                            {summaryError}{" "}
                            <Link href="/upload" className="text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-2">
                              Upload your policy document →
                            </Link>
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl p-6 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-200/30 rounded-full -translate-y-10 translate-x-10"></div>
                          <div className="relative">
                            <div className="flex items-start space-x-4">
                              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-emerald-800 mb-3 flex items-center space-x-2">
                                  <span>Your Policy Summary</span>
                                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Ready</Badge>
                                </h4>
                                <p className="text-emerald-700 leading-relaxed whitespace-pre-wrap bg-white/50 rounded-lg p-4 border border-emerald-200">
                                  {summary}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Enhanced Problem Input */}
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                          Specific Requirements
                        </label>
                      </div>
                      <div className="relative">
                        <Input
                          className="border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 rounded-xl py-6 text-lg bg-white/70"
                          value={problem}
                          onChange={(e) => setProblem(e.target.value)}
                          placeholder="Tell us about your specific concerns or what you're looking for..."
                          maxLength={500}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                          {problem.length}/500
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-3 flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-emerald-500" />
                        <span>Optional: Help us provide more targeted recommendations</span>
                      </p>
                    </div>

                    {/* Enhanced Action Button */}
                    <div className="space-y-4">
                      <Button
                        onClick={getRecommendation}
                        disabled={loading || !text.trim() || summaryLoading}
                        className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 w-full py-6 text-lg font-semibold rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transition-all duration-200 transform hover:scale-[1.02]"
                        size="lg"
                      >
                        {loading ? (
                          <div className="flex items-center space-x-3">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Analyzing Your Policy...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-3">
                            <Brain className="w-5 h-5" />
                            <span>Get Smart Recommendations</span>
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        )}
                      </Button>

                      {!text.trim() && !summaryLoading && (
                        <Alert className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                          <Upload className="h-5 w-5 text-blue-600" />
                          <AlertDescription className="text-blue-800 font-medium">
                            No policy data found.{" "}
                            <Link href="/upload" className="text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-2">
                              Upload your policy document
                            </Link>{" "}
                            to get started.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Section - Only shows actual AI recommendation */}
            {result ? (
              <div className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl shadow-emerald-100/50 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <Brain className="w-5 h-5" />
                      </div>
                      <span>AI Policy Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl p-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="relative">
                        <div className="flex items-start space-x-4 mb-6">
                          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-emerald-800 mb-2">Personalized Analysis Complete</h3>
                            <p className="text-emerald-700">Based on your policy details and requirements</p>
                          </div>
                        </div>
                        
                        <div className="bg-white/80 rounded-xl p-6 border border-emerald-200 shadow-sm">
                          <div className="prose prose-emerald max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap font-medium text-base">
                              {result}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Placeholder when no results */
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl shadow-emerald-100/50 overflow-hidden">
                <CardContent className="p-12 text-center">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Target className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-emerald-200/30 rounded-full blur-xl"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready for Analysis</h3>
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-md mx-auto">
                    Your personalized policy recommendations will appear here after clicking the analyze button.
                  </p>
                  <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto">
                    <div className="flex flex-col items-center space-y-2 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <Brain className="w-6 h-6 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-700">AI Analysis</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <Target className="w-6 h-6 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-700">Personalized Tips</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <Shield className="w-6 h-6 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-700">Coverage Insights</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <Sparkles className="w-6 h-6 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-700">Smart Suggestions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}