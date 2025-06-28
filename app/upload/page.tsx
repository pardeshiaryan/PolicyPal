import FileUploader from "@/components/FileUploader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, ArrowLeft, FileText, Shield, Target } from "lucide-react"
import Link from "next/link"

    import Navbar from "@/components/navbar"
export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <Navbar />
    

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Welcome to PolicyPal</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Upload your insurance policy documents to get started with AI-powered analysis, recommendations, and claim
              eligibility assessments.
            </p>

            {/* Feature highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Smart Summarization</h3>
                  <p className="text-sm text-gray-600">Extract key information from complex policy documents</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Coverage Analysis</h3>
                  <p className="text-sm text-gray-600">Understand your coverage and identify potential gaps</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
                  <p className="text-sm text-gray-600">Get personalized suggestions for better coverage</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Upload Section */}
          <Card className="shadow-2xl border-0 bg-white">
            <CardHeader className="bg-emerald-50 border-b text-center">
              <CardTitle className="flex items-center justify-center space-x-2 text-emerald-800">
                <Upload className="w-6 h-6" />
                <span>Upload Your Policy Documents</span>
              </CardTitle>
              <p className="text-emerald-700 mt-2">Supported formats: PDF, JPG, PNG, WEBP • Maximum 5 files</p>
            </CardHeader>
            <CardContent className="p-8">
              <FileUploader />
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What happens next?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Document Processing</h3>
                <p className="text-gray-600 text-sm">
                  Our AI analyzes your policy documents and extracts key information
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Smart Analysis</h3>
                <p className="text-gray-600 text-sm">
                  Get detailed summaries, coverage analysis, and personalized insights
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Take Action</h3>
                <p className="text-gray-600 text-sm">
                  Chat with PolicyPal, check claim eligibility, or get recommendations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
