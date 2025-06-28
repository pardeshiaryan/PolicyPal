import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Calculator, Target, Bot, CheckCircle, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <Navbar />
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            PolicyPal
            <span className="block text-3xl md:text-4xl text-emerald-600 font-medium mt-2">
              Your GenAI Insurance Advisor
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Understand, Claim, and Upgrade Your Insurance Smarter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg">
              <Bot className="w-5 h-5 mr-2" />
              Try the Chatbot
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 text-lg bg-transparent"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Check Your Claim Eligibility
            </Button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <Image
                src="/hero.png"
                alt="PolicyPal AI Assistant Interface"
                className="w-full h-auto rounded-lg"
                width={800}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Intelligent Insurance Solutions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Leverage the power of Generative AI to make informed decisions about your insurance policies
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1: Policy Summarization */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-emerald-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">Policy Summarization</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-gray-600 text-base leading-relaxed">
                Extracts and simplifies key information from any insurance policy. Get clear, concise summaries of
                complex policy documents in seconds.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Feature 2: Claim Eligibility Estimator */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-orange-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">Claim Eligibility Estimator</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-gray-600 text-base leading-relaxed">
                Dynamically asks questions and evaluates the success rate of a claim. Know your chances before you file
                and optimize your claim strategy.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Feature 3: Policy Recommendation */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">Policy Recommendation</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-gray-600 text-base leading-relaxed">
                Analyzes current policy gaps and suggests better alternatives. Discover opportunities to improve
                coverage and reduce costs.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Insurance Experience?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already making smarter insurance decisions with PolicyPal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 text-lg"
            >
              <Bot className="w-5 h-5 mr-2" />
              Try the Chatbot
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-emerald-700 px-8 py-3 text-lg bg-transparent"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Check Your Claim Eligibility
            </Button>
          </div>
        </div>
      </section>

   
    </div>
  )
}
