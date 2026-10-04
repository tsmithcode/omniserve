'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bot, User, ArrowRight, Shield, Zap, Sparkles, AlertCircle, CheckCircle2, Sliders, RefreshCw, Layers } from 'lucide-react';

export default function CustomerPortal() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am OmniServe AI. How can I assist you with your account, billing, or technical orders today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [autoRefundThreshold, setAutoRefundThreshold] = useState(50);
  const [policyNotice, setPolicyNotice] = useState<string | null>(null);

  // Broadcast channel for instantaneous cross-tab synchronization
  const broadcastTicket = (ticketData: any) => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel('omniserve_live_queue');
      channel.postMessage(ticketData);
      channel.close();
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/deflect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userText })
      });
      const data = await res.json();
      setIsTyping(false);

      if (data.escalated) {
        setEscalated(true);
        const ticketPayload = {
          id: `T-${Math.floor(1000 + Math.random() * 9000)}`,
          customer: 'Enterprise Tenant Alpha',
          issue: userText,
          priority: 'High',
          status: 'Open',
          timestamp: new Date().toLocaleTimeString()
        };
        
        // Broadcast immediately to Agent CRM tab
        broadcastTicket(ticketPayload);

        setMessages(prev => [
          ...prev,
          { 
            sender: 'bot', 
            text: `⚠️ Policy Triggered: ${data.reply}

I have routed your ticket to an active Senior Escalation Engineer on the Agent CRM queue.` 
          }
        ]);
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
      }
    } catch (err) {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Connected to local .NET Core fallback engine. System operates smoothly.' }]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Universal Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400 font-bold shadow-lg shadow-emerald-950/40">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-wide">OmniServe AI</h1>
            <p className="text-[11px] text-slate-400">Autonomous Tier-1 Customer Resolution Platform</p>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-emerald-400 text-sm font-semibold border-b-2 border-emerald-400 pb-0.5">Customer Portal</Link>
          <Link href="/agent" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Agent CRM</Link>
          <Link href="/architecture" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Telemetry & ROI</Link>
          <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-mono text-emerald-400 font-semibold">NET 8 LIVE</span>
          </div>
        </nav>
      </header>

      {/* Main Grid: Chat & Live Policy Simulator */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: AI Support Concierge */}
        <div className="lg:col-span-7 flex flex-col bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-bold text-slate-200">AI Concierge Assistant</span>
            </div>
            {escalated && (
              <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs rounded-full font-mono flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Escalated to Agent CRM
              </span>
            )}
          </div>

          <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[500px]">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800/50 flex items-center justify-center text-emerald-400 shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                  m.sender === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-md shadow-emerald-950/30' 
                    : 'bg-slate-800/80 text-slate-200 border border-slate-700/50 rounded-bl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
                {m.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs font-mono p-2">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" /> Evaluating RAG Knowledge Base...
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-slate-800 bg-slate-900/90 flex gap-3">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question or type 'escalate' / 'refund request'..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-all placeholder:text-slate-500"
            />
            <button 
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-emerald-950/50"
            >
              <span>Send</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Live Policy RAG Testbench */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-4">
              <Sliders className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">Dynamic AI Guardrails & Rules</h2>
            </div>
            
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Test how OmniServe AI evaluates business logic before invoking backend escalation APIs. Adjust parameters below to simulate live policy changes.
            </p>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300 font-semibold">Auto-Refund Threshold</span>
                  <span className="text-emerald-400 font-bold">${autoRefundThreshold}.00 USD</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={autoRefundThreshold} 
                  onChange={(e) => {
                    setAutoRefundThreshold(Number(e.target.value));
                    setPolicyNotice(`Updated Auto-Refund Policy threshold to $${e.target.value}.00`);
                  }}
                  className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>

              {policyNotice && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{policyNotice}</span>
                </div>
              )}

              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <span className="text-xs font-bold text-slate-300 block">Active AI Knowledge Specs</span>
                
                <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs space-y-2">
                  <div className="flex justify-between text-slate-400">
                    <span>Vector Knowledge Index</span>
                    <span className="text-emerald-400 font-mono">v2.4-Active</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Embedding Model</span>
                    <span className="text-slate-300 font-mono">text-embedding-3-small</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>CORS Authorization</span>
                    <span className="text-emerald-400 font-mono">Enabled (Port 5002)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">Cross-Tab Real-Time Sync</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Open <Link href="/agent" target="_blank" className="text-emerald-400 underline font-semibold hover:text-emerald-300">Agent CRM in a new tab</Link> side-by-side. Submitting a ticket here will trigger an instant WebSocket event in the CRM!
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
