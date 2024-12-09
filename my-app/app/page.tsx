'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, Activity, Brain, AlertCircle, Droplets } from 'lucide-react';
import Link from 'next/link';



/**
 * interface for analysis of the blood component
 */
interface AnalysisDetails {
  component?: string;
  value?: number;
  normalRange?: string;
  alertLevel?: 'none' | 'warning' | 'critical';
}
/**
 * chat message in conversation which includes both user and ai
 */
interface Message {
  type: 'user' | 'assistant';
  content: string;
  intent?: string;
  confidence?: number;
  isTyping?: boolean;
  requiresRetraining?: boolean;
  context?: string[];
  analysisDetails?: AnalysisDetails;
}


export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scroll effect
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialization effect
  useEffect(() => {
    const initializeAI = async () => {
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            text: "initialize",
            isInitializing: true
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to initialize AI');
        }

        setIsInitialized(true);
        console.log('AI initialized successfully');
      } catch (error) {
        console.error('Error initializing AI:', error);
      }
    };

    initializeAI();
  }, []);
/**
 * typing effect from ai response
 * @param text -complex text
 * @param messageIndex -index of message
 */
  const simulateTyping = async (text: string, messageIndex: number) => {
    const words = text.split(' ');
    let currentText = '';
    
    for (const word of words) {
      currentText += word + ' ';
      setMessages(prev => prev.map((msg, idx) => 
        idx === messageIndex 
          ? { ...msg, content: currentText.trim(), isTyping: true }
          : msg
      ));
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    setMessages(prev => prev.map((msg, idx) => 
      idx === messageIndex 
        ? { ...msg, isTyping: false }
        : msg
    ));
  };
/**
 * handle message submission and ai repsonse
 * @returns 
 */
  const handleSend = async () => {
    if (!isInitialized) {
      setMessages(prev => [...prev, { 
        type: 'assistant',
        content: "Please wait while the system initializes..."
      }]);
      return;
    }

    if (input.trim() && !isProcessing) {
      setIsProcessing(true);
      const userMessage = { type: 'user' as const, content: input.trim() };
      setMessages(prev => [...prev, userMessage]);
      setInput('');

      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            text: userMessage.content,
            context: messages.slice(-5).map(m => m.content)
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response');
        }

        const data = await response.json();

        // Add AI response to messages
        setMessages(prev => [...prev, { 
          type: 'assistant',
          content: '',
          intent: data.intent,
          confidence: data.confidence,
          isTyping: true,
          requiresRetraining: data.requiresRetraining,
          analysisDetails: data.analysisDetails,
          context: data.context
        }]);

        // Simulate typing effect
        await simulateTyping(data.response, messages.length + 1);

      } catch (error) {
        console.error('Error processing message:', error);
        setMessages(prev => [...prev, { 
          type: 'assistant',
          content: "I apologize, but I encountered an error processing your request. Could you please try rephrasing your question?"
        }]);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
/**
 * 
 * @param confidence confidence score
 * @returns - tailwind color 
 */
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-500';
    if (confidence >= 0.6) return 'text-yellow-500';
    return 'text-red-500';
  };


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-900 to-red-950">
      {/* Header */}
      <header className="py-4 px-6 border-b border-gray-800 bg-gray-900/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Droplets className="text-red-500 w-8 h-8 animate-pulse" />
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Dxter
            </h1>
          </div>
          <Link
            href="/admin/dashboard"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 
                      transition-colors group relative"
          >
            <Brain size={18} className="text-gray-400 group-hover:text-gray-300" />
            <span className="text-gray-300 group-hover:text-white">AI Dashboard</span>
          </Link>
        </div>
      </header>
  
      {/* Main Chat Container */}
      <main className="flex-grow flex flex-col max-w-4xl w-full mx-auto p-4 sm:p-6 overflow-hidden">
        <div className="flex-grow overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {messages.length === 0 ? (
            // Welcome Screen
            <div className="flex flex-col items-center justify-center h-full space-y-8 py-12">
              <div className="flex flex-col items-center space-y-2">
                <Droplets size={48} className="text-red-500 animate-pulse" />
                <h2 className="text-2xl font-semibold text-gray-200">Welcome to Dxter</h2>
                <p className="text-gray-400 text-center max-w-md">
                  Your intelligent blood analysis assistant. Ask questions about blood components or paste your test results.
                </p>
              </div>
              
              <div 
                onClick={() => inputRef.current?.focus()}
                className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-red-500/50 
                           transition-all cursor-pointer group hover:bg-gray-800/70 w-full max-w-md"
              >
                <div className="flex items-center space-x-3">
                  <Activity className="text-red-500 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-300 group-hover:text-white">Ask About Components</span>
                </div>
              </div>
            </div>
          ) : (
            // Messages
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-4 ${
                  msg.type === 'user' ? 'justify-end' : ''
                }`}
              >
                {msg.type === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-red-800 
                                flex items-center justify-center flex-shrink-0 shadow-lg">
                    {msg.requiresRetraining ? (
                      <Brain className="text-white w-5 h-5 animate-pulse" />
                    ) : (
                      <Droplets className="text-white w-5 h-5" />
                    )}
                  </div>
                )}
                
                <div className="flex flex-col space-y-1 max-w-[80%]">
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-lg ${
                      msg.type === 'user'
                        ? 'bg-red-900/50 text-white ml-12 border border-red-800/50'
                        : 'bg-gray-800/90 text-gray-100 border border-gray-700'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    {msg.isTyping && (
                      <span className="inline-flex ml-2">
                        <span className="animate-pulse">.</span>
                        <span className="animate-pulse delay-100">.</span>
                        <span className="animate-pulse delay-200">.</span>
                      </span>
                    )}
                  </div>
  
                  {msg.type === 'assistant' && (
                    <>
                      {/* Confidence Only */}
                      {msg.confidence && (
                        <div className="text-xs text-gray-500 flex items-center space-x-2 flex-wrap">
                          <span className={`${getConfidenceColor(msg.confidence)} bg-gray-800/50 px-2 py-1 rounded-full`}>
                            Confidence: {(msg.confidence * 100).toFixed(1)}%
                          </span>
                          {msg.requiresRetraining && (
                            <span className="text-blue-400 flex items-center bg-blue-900/20 px-2 py-1 rounded-full">
                              Learning <Brain className="w-3 h-3 ml-1 animate-pulse" />
                            </span>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
  
                {msg.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Activity className="text-gray-300 w-5 h-5" />
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>
  
      {/* Input Area */}
      <div className="border-t border-gray-800 bg-gray-900/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          <div className="flex items-end space-x-2">
            <div className="flex-grow relative">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full resize-none rounded-xl bg-gray-800 border border-gray-700 text-white 
                         px-4 py-3 pr-24 focus:outline-none focus:border-red-500/50 transition-colors
                         placeholder-gray-500"
                placeholder={isProcessing ? "Processing..." : "Ask about your blood report or blood components..."}
                style={{ maxHeight: '200px' }}
                disabled={isProcessing}
              />
              <div className="absolute right-2 bottom-2.5 flex items-center space-x-2">
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isProcessing}
                  className={`p-1.5 rounded-lg transition-all ${
                    input.trim() && !isProcessing
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-gray-700 text-gray-400'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  title="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-end items-center text-xs text-gray-400">
            <span className="flex items-center space-x-1">
              <AlertCircle size={12} />
              <span>Your data is processed securely</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );}
  /**
   * https://lucide.dev/guide/packages/lucide-react
   * 
   */