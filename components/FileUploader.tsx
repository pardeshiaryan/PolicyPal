"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CircleArrowDown, RocketIcon, FileText, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function FileUploader() {
  const [jobId, setJobId] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle")
  const [fields, setFields] = useState<Record<string, string>>({})

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setStatus("processing")

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      })

      const { jobId } = await res.json()
      setJobId(jobId)
      localStorage.setItem("jobId", jobId)

      const poll = async () => {
        const r = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/result?jobId=${jobId}`)
        const data = await r.json()

        if (data.status === "done") {
          localStorage.setItem("text", data.message || "")

          // fetch summary (for localStorage only)
          // fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/summary?jobId=${jobId}`)
          //   .then((r) => r.json())
          //   .then((s) => {
          //     if (s.status === "done") {
          //       localStorage.setItem("summary", s.summary)
          //     }
          //   })

          // fetch extract (fields to display)
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/extract?jobId=${jobId}`)
            .then((r) => r.json())
            .then((e) => {
              if (e.status === "done") {
                setFields(e.fields || {})
                setStatus("done")
              } else {
                setTimeout(poll, 2000)
              }
            })
        } else {
          setTimeout(poll, 3000)
        }
      }

      poll()
    } catch (error) {
      console.error("Upload error:", error)
      setStatus("idle")
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".jpeg", ".png", ".webp"],
    },
    maxFiles: 5,
  })

  const resetUploader = () => {
    setStatus("idle")
    setFields({})
    setJobId(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {status === "idle" && (
        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
            isFocused || isDragActive
              ? "border-emerald-400 bg-emerald-50 scale-105"
              : "border-emerald-300 bg-emerald-25 hover:border-emerald-400 hover:bg-emerald-50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
              {isDragActive ? (
                <RocketIcon className="w-10 h-10 text-emerald-600 animate-bounce" />
              ) : (
                <CircleArrowDown className="w-10 h-10 text-emerald-600 animate-bounce" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isDragActive ? "Drop your files here!" : "Upload Your Policy Documents"}
              </h3>
              <p className="text-gray-600 mb-4">
                {isDragActive
                  ? "Release to upload your policy documents"
                  : "Drag & drop your files here, or click to browse"}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">PDF</Badge>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">JPG</Badge>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">PNG</Badge>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">WEBP</Badge>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 mt-4">
                <FileText className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
            </div>
          </div>
        </div>
      )}

      {status === "processing" && (
        <Card className="border-0 shadow-xl">
          <CardContent className="p-12 text-center">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Processing Your Document</h3>
              <p className="text-gray-600 mb-4">This may take a few moments...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {status === "done" && (
        <div className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Document Processed Successfully!</h3>
                  <p className="text-gray-600">Key policy details have been extracted:</p>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-emerald-800 mb-3 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Extracted Policy Fields
                </h4>
                <div className="text-sm text-gray-700 leading-relaxed max-h-60 overflow-y-auto space-y-2">
                  {Object.entries(fields).map(([key, value]) => (
                    <div key={key}>
                      <strong className="text-gray-900">{key}:</strong> {value}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/chat">Chat with PolicyPal</Link>
                </Button>
                <Button asChild variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                  <Link href="/policies">Get Recommendations</Link>
                </Button>
                <Button asChild variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                  <Link href="/claim">Check Claim Eligibility</Link>
                </Button>
              </div>

              <div className="mt-4 text-center">
                <Button variant="ghost" onClick={resetUploader} className="text-gray-500 hover:text-gray-700">
                  Upload Another Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
