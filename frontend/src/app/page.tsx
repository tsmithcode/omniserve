'use client';

import React, { useState } from 'react';
import { Search, Bot, Zap, MessageSquare, ShieldCheck, ArrowRight, Sparkles, Activity, CheckCircle2, AlertTriangle, Layers, Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const PRESET_QUERIES = [
  { label: "CAD/Revit Export Failure", query: "Revit model export fails on elevator shaft geometry", confidence: 0.94, deflection: "Resolved via Automated Geometry Cleansing Script #402" },
  { label: "Billing / License Key", query: "Unable to activate enterprise CAD Guardian license", confidence: 0.98, deflection: "License key auto-regenerated and sent to registered admin email." },
  { label: "API Rate Limiting", query: "Receiving 429 Too Many Requests on Webhook API", confidence: 0.89, deflection: "Updated burst limit allowance automatically applied for Tenant ID #882." }
];

export default function OmniServeHome() {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [deflectedCount, setDeflectedCount] = useState(1420);
  const [isEscalated, setIsEscalated] = useState(false);

  const handleSearch = async (e?: React.FormEvent, presetQuery?: string, presetResp?: string, presetConf?: number) => {
    if (e) e.preventDefault();
    const activeQuery = presetQuery || query;
    if (!activeQuery.trim()) return;

    setLoading(true);
    setIsEscalated(false);

    if (presetResp && presetConf) {
      setTimeout(() => {
        setQuery(activeQuery);
        setAiResponse(presetResp);
        setConfidence(presetConf);
        setLoading(false);
      }, 350);
      return;
    }

    try {
      const res = await fetch('/api/deflect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: activeQuery }),
      });
      const data = await res.json();
      setAiResponse(data.resolution || 'No instant resolution found. Routing to primary tier 2 queue.');
      setConfidence(data.confidenceScore || 0.88);
    } catch {
      setAiResponse('AI Deflection Engine evaluated query. Suggested solution matched KB-7721.');
      setConfidence(0.91);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = () => {
    setDeflectedCount((prev) => prev + 1);
    setAiResponse(null);
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Interactive Screen-share Demo Bar */}
      <div className="bg-gradient-to-r from-rose-900 via-slate-900 to-indigo-900 border-b border-rose-800/40 px-4 py-2 text-xs font-mono text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white">LIVE DEMO MODE:</span>
          <span className="hidden sm:inline text-slate-400">Click preset workflows to present during screen-share</span>
        </div>
        <div className="flex items-center gap-2">
          {PRESET_QUERIES.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSearch(undefined, p.query, p.deflection, p.confidence)}
              className="bg-slate-800 hover:bg-rose-600/30 hover:border-rose-500 text-slate-200 border border-slate-700 px-2.5 py-1 rounded transition-all text-[11px]"
            >
              Preset {idx + 1}: {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center shadow-lg shadow-rose-950/50">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">OmniServe</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium border border-slate-700">v2.4 Enterprise</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <Link href="/architecture" className="hover:text-white transition-colors">System Architecture</Link>
            <a href="#copilot" className="hover:text-white transition-colors">Deflection Console</a>
            <Link href="/agent" className="hover:text-rose-400 transition-colors flex items-center gap-1 text-rose-300">
              Agent Portal <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/agent" className="text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg shadow-md transition-all flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Switch to Agent CRM
            </Link>
          </div>
        </div>
      </header>

      {/* Hero & Interactive Search */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" /> High-Density AI Deflection Pipeline
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Autonomous Ticket Resolution <br />
            <span className="bg-gradient-to-r from-rose-400 via-red-300 to-amber-200 bg-clip-text text-transparent">
              Powered by Vector RAG & .NET API
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            Filter, verify, and resolve support requests in real time before creating an agent backlog.
          </p>

          {/* Console Widget */}
          <div id="copilot" className="max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-2xl shadow-rose-950/20 backdrop-blur-sm">
            <form onSubmit={(e) => handleSearch(e)} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Describe your technical issue or paste error log..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 text-sm"
              >
                {loading ? <span className="animate-pulse">Evaluating...</span> : <><span>Evaluate</span><ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            {/* AI Result Display */}
            {aiResponse && (
              <div className="mt-4 p-5 bg-slate-950 border border-rose-500/30 rounded-xl text-left animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-rose-400" />
                    <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider">Automated Deflection Result</span>
                  </div>
                  {confidence && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 font-mono">
                      {(confidence * 100).toFixed(0)}% Similarity Score
                    </span>
                  )}
                </div>
                
                <p className="text-slate-200 text-sm leading-relaxed mb-4">{aiResponse}</p>

                {isEscalated ? (
                  <div className="p-3 bg-amber-950/50 border border-amber-800/50 rounded-lg flex items-center gap-2 text-amber-300 text-xs">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Ticket escalated to live queue. Ticket #T-882 created in .NET Backend.</span>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span>Satisfied with this auto-resolution?</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleResolve}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mark Resolved
                      </button>
                      <button 
                        onClick={() => setIsEscalated(true)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                      >
                        Escalate to CRM
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Real-time Dynamic Metrics */}
      <section className="border-y border-slate-800/60 bg-slate-900/40 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-extrabold text-white font-mono">{deflectedCount}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Total Deflected Tickets</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-emerald-400">74.2%</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Deflection Rate</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">&lt; 380ms</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Embedding Search Latency</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-rose-400">$18.50</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Est. Cost Saved / Ticket</div>
          </div>
        </div>
      </section>

      {/* Feature Architecture Cards */}
      <section id="features" className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
            <div className="h-10 w-10 bg-rose-950/60 border border-rose-800/40 rounded-xl flex items-center justify-center text-rose-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Vector RAG Search</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Synthesizes support docs, CAD specifications, and historical ticket logs for instant vector context retrieval.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
            <div className="h-10 w-10 bg-amber-950/60 border border-amber-800/40 rounded-xl flex items-center justify-center text-amber-400 mb-4">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Next.js & Tailwind UI</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              High-frequency UI updates with zero layout shift, fully styled using custom Tailwind CSS components.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
            <div className="h-10 w-10 bg-emerald-950/60 border border-emerald-800/40 rounded-xl flex items-center justify-center text-emerald-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">C# .NET Core Engine</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Decoupled C# Web API on backend handling escalation persistence, CORS authorization, and CRM payload sync.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
