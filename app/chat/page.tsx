
'use client';

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Send, ArrowLeft, MessageCircle } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar";

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [context, setContext] = useState<string>('');

  useEffect(() => {
    const savedJobId = localStorage.getItem('jobId');

    if (savedJobId) {
      setJobId(savedJobId);
      const savedText = localStorage.getItem('text');
      if (savedText) {
        setContext(savedText); // Load saved context from localStorage
      }
    }

  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);
     // Auto-scroll to bottom
    setTimeout(() => {
      const chatContainer = document.getElementById("chat-messages")
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    }, 100)

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
    
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
     <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Chat with PolicyPal</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ask me anything about your insurance policies, coverage details, or get personalized recommendations.
            </p>
          </div>

          {/* Chat Interface */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-emerald-50 border-b">
              <CardTitle className="flex items-center space-x-2 text-emerald-800">
                <MessageCircle className="w-5 h-5" />
                <span>Insurance Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages Area */}
                  <ScrollArea className="h-[500px] p-6" id="chat-messages">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bot className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to PolicyPal!</h3>
                    <p className="text-gray-600 mb-4">
                      I'm here to help you understand your insurance policies and answer any questions you might have.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge variant="outline" className="text-xs">
                        Policy Summaries
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Coverage Details
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Claim Guidance
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Recommendations
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`flex items-start space-x-3 max-w-[80%] ${
                            msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              msg.role === "user" ? "bg-gray-600" : "bg-emerald-600"
                            }`}
                          >
                            {msg.role === "user" ? (
                              <User className="w-4 h-4 text-white" />
                            ) : (
                              <Bot className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div
                            className={`p-4 rounded-2xl ${
                              msg.role === "user"
                                ? "bg-gray-600 text-white"
                                : "bg-emerald-50 text-gray-900 border border-emerald-100"
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {loading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-sm text-emerald-700">PolicyPal is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t bg-white p-6">
                <div className="flex space-x-4">
                  <Input
                    className="flex-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                     onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        sendMessage()
                      }
                    }}
                    placeholder="Ask about your policy, coverage, claims, or get recommendations..."
                    disabled={loading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 px-6"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift + Enter for new line</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
