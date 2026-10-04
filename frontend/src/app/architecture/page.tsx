'use client';

import React, { useState } from 'react';
import { ArrowLeft, Terminal, Server, Database, Cpu, Activity, CheckCircle2, Shield, Code2 } from 'lucide-react';
import Link from 'next/link';

export default function ArchitecturePage() {
  const [activeTab, setActiveTab] = useState<'rag' | 'dotnet' | 'db'>('rag');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/50 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-rose-500" />
            <h1 className="font-bold text-lg text-white">OmniServe System Telemetry & Architecture</h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Customer View</Link>
          <Link href="/agent" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Agent CRM</Link>
          <div className="flex items-center gap-2 ml-2 border-l border-slate-700 pl-4">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono text-emerald-400">REST API :5002 LIVE</span>
          </div>
        </div>
      </header>

      <main className="animate-in p-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Architecture Flow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            onClick={() => setActiveTab('rag')} 
            className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-900/10 ${activeTab === 'rag' ? 'bg-slate-900 border-rose-500/80 shadow-lg shadow-rose-950/20' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center justify-between mb-3">
              <Cpu className="w-6 h-6 text-rose-400" />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Tier 1</span>
            </div>
            <h3 className="font-bold text-white mb-1">1. RAG Vector Search</h3>
            <p className="text-xs text-slate-400">Embedding similarity matched against indexed technical documentation and historical resolution logs.</p>
          </div>

          <div 
            onClick={() => setActiveTab('dotnet')} 
            className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-900/10 ${activeTab === 'dotnet' ? 'bg-slate-900 border-rose-500/80 shadow-lg shadow-rose-950/20' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center justify-between mb-3">
              <Server className="w-6 h-6 text-amber-400" />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Tier 2</span>
            </div>
            <h3 className="font-bold text-white mb-1">2. C# .NET Web API</h3>
            <p className="text-xs text-slate-400">High-concurrency controller pipeline handling authentication headers, CORS verification, and state dispatch.</p>
          </div>

          <div 
            onClick={() => setActiveTab('db')} 
            className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-900/10 ${activeTab === 'db' ? 'bg-slate-900 border-rose-500/80 shadow-lg shadow-rose-950/20' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center justify-between mb-3">
              <Database className="w-6 h-6 text-emerald-400" />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Tier 3</span>
            </div>
            <h3 className="font-bold text-white mb-1">3. Persistence & Escalation</h3>
            <p className="text-xs text-slate-400">Relational record storage updating ticket status, SLA timers, and agent assignment queues.</p>
          </div>
        </div>

        {/* Dynamic Telemetry Terminal */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl overflow-x-auto">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-400">
              <Code2 className="w-4 h-4 text-rose-400" />
              <span>Telemetry Inspector — {activeTab.toUpperCase()} Payload Trace</span>
            </div>
            <span className="text-emerald-400">200 OK</span>
          </div>

          <div className="p-6 font-mono text-xs overflow-x-auto text-slate-300">
            {activeTab === 'rag' && (
              <pre className="text-rose-300 leading-relaxed">
{`{
  "engine": "OmniServe-Vector-RAG-v2",
  "vectorModel": "text-embedding-3-small",
  "dimensions": 1536,
  "topKMatch": [
    {
      "docId": "KB-7721",
      "title": "Revit CAD Exporter Plugin Crash Diagnosis",
      "cosineSimilarity": 0.9421,
      "recommendedAction": "Execute geometry repair script #402 before export"
    }
  ],
  "latencyMs": 342
}`}
              </pre>
            )}

            {activeTab === 'dotnet' && (
              <pre className="text-amber-300 leading-relaxed">
{`HTTP/1.1 200 OK
Host: localhost:5002
Access-Control-Allow-Origin: http://localhost:3000
Content-Type: application/json; charset=utf-8

{
  "status": "Success",
  "controller": "TicketsController",
  "action": "GetActiveEscalations",
  "activeCount": 3,
  "serverTime": "${new Date().toISOString()}"
}`}
              </pre>
            )}

            {activeTab === 'db' && (
              <pre className="text-emerald-300 leading-relaxed">
{`SQL EXECUTE -- Transaction ID: #TX-90182
INSERT INTO TicketEscalations (TicketId, CustomerName, Priority, Status, CreatedAt)
VALUES ('T-104', 'Enterprise Tenant Alpha', 'High', 'Open', CURRENT_TIMESTAMP);

-- Row modified: 1 affected
-- Agent SLA Timer Initialized: 15 minutes`}
              </pre>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
