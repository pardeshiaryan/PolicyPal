import { Badge } from "@/components/ui/badge"
import { Bot } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 mt-auto">
      {" "}
      {/* Added mt-auto to push footer to bottom */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">PolicyPal</span>
          </Link>

          <div className="text-center md:text-right">
            <p className="text-gray-400 mb-2">Made with</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-2">
              <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                LangChain
              </Badge>
              <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                Gemini
              </Badge>
              <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                FastAPI
              </Badge>
              <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                Next.js
              </Badge>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500">© 2025 PolicyPal. Empowering smarter insurance decisions with AI.</p>
        </div>
      </div>
    </footer>
  )
}
