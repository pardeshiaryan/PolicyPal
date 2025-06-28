"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Bot, Menu, Upload, MessageCircle, Calculator, Target, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Upload", href: "/upload", icon: Upload },
  { name: "Chat", href: "/chat", icon: MessageCircle },
  { name: "Claim Check", href: "/claim", icon: Calculator },
  { name: "Recommendations", href: "/policies", icon: Target },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PolicyPal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all",
                      isActive
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
              AI-Powered
            </Badge>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <MessageCircle className="w-4 h-4 mr-2" />
              Try Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">PolicyPal</span>
                </div>
              </div>

              <div className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start space-x-3 h-12",
                          isActive
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Button>
                    </Link>
                  )
                })}
              </div>

              <div className="mt-8 pt-8 border-t">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Try PolicyPal Now
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
