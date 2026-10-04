'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Server, Database, Shield, Zap, DollarSign, TrendingUp, Cpu, Activity, ArrowUpRight } from 'lucide-react';

export default function TelemetryAndRoi() {
  const [hourlyRate, setHourlyRate] = useState(45);
  const [ticketVolume, setTicketVolume] = useState(2500);

  // Financial ROI Calculator
  const estimatedAnnualSavings = Math.round((ticketVolume * 0.789 * (hourlyRate * 0.25)) * 12);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Universal Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400 font-bold">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-wide">OmniServe AI</h1>
            <p className="text-[11px] text-slate-400">Executive ROI & System Telemetry Workstation</p>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Customer Portal</Link>
          <Link href="/agent" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Agent CRM</Link>
          <Link href="/architecture" className="text-emerald-400 text-sm font-semibold border-b-2 border-emerald-400 pb-0.5">Telemetry & ROI</Link>
          <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-mono text-emerald-400 font-semibold">REST API :5002 LIVE</span>
          </div>
        </nav>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
        
        {/* Executive ROI Calculator Card */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800/80 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Executive Financial ROI Simulator</h2>
              <p className="text-xs text-slate-400">Calculate projected labor cost reduction using OmniServe's 78.9% AI Deflection Rate</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="space-y-5 lg:col-span-2">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300">Monthly Support Ticket Volume</span>
                  <span className="text-emerald-400 font-bold">{ticketVolume.toLocaleString()} tickets / mo</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="10000" 
                  step="250"
                  value={ticketVolume} 
                  onChange={(e) => setTicketVolume(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300">Avg Human Support Agent Cost</span>
                  <span className="text-emerald-400 font-bold">${hourlyRate}.00 / hr</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  value={hourlyRate} 
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>
            </div>

            {/* Total Annual Savings Highlight */}
            <div className="bg-slate-950/80 border border-emerald-500/30 p-6 rounded-2xl text-center shadow-xl">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">Projected Annual Savings</span>
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">${estimatedAnnualSavings.toLocaleString()}</span>
              <span className="text-[11px] text-emerald-500/80 block mt-2">Based on 78.9% AI resolution rate</span>
            </div>
          </div>
        </div>

        {/* Live Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl space-y-3">
            <Server className="w-6 h-6 text-emerald-400" />
            <h3 className="text-base font-bold text-white">C# .NET 8 Web API</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Decoupled controller handling ticket persistence, CORS middleware, and CRM payload sync.
            </p>
            <span className="inline-block text-[10px] font-mono bg-slate-800 text-emerald-400 px-2.5 py-1 rounded-full">Port 5002 - Active</span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl space-y-3">
            <Activity className="w-6 h-6 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Broadcast Sync Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero-latency cross-tab event propagation connecting Customer escalations to Agent CRM queues.
            </p>
            <span className="inline-block text-[10px] font-mono bg-slate-800 text-indigo-400 px-2.5 py-1 rounded-full">WebSockets - Synchronized</span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl space-y-3">
            <Cpu className="w-6 h-6 text-amber-400" />
            <h3 className="text-base font-bold text-white">AI Policy Guardrails</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamic rule evaluation preventing unauthorized automated refunds while accelerating valid resolutions.
            </p>
            <span className="inline-block text-[10px] font-mono bg-slate-800 text-amber-400 px-2.5 py-1 rounded-full">RAG Engine v2.4</span>
          </div>
        </div>

      </main>
    </div>
  );
}
