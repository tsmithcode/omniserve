'use client';

import React, { useState, useEffect } from 'react';
import { Bot, User, Clock, CheckCircle2, AlertCircle, Shield, ArrowLeft, RefreshCw, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface Ticket {
  id: string;
  customer: string;
  issue: string;
  priority: string;
  status: string;
}

export default function AgentDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      // Mock or fetch from .NET Backend
      const res = await fetch('http://localhost:5002/api/tickets').catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        setTickets(data);
      } else {
        // Fallback demo data if backend is offline
        setTickets([
          { id: "T-101", customer: "Alice Smith", issue: "Account Access Failure", priority: "High", status: "Open" },
          { id: "T-102", customer: "Bob Jones", issue: "Billing Discrepancy", priority: "Medium", status: "In Progress" },
          { id: "T-103", customer: "Carol Vance", issue: "SSO Integration Error", priority: "Urgent", status: "Open" }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/50 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-rose-500" />
            <h1 className="font-bold text-lg text-white">OmniServe Agent CRM Console</h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Customer View</Link>
          <Link href="/architecture" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Telemetry</Link>
          <button onClick={fetchTickets} className="flex items-center gap-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-all border border-slate-700">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>
      </header>

      <main className="animate-in p-6 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ticket Feed */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Active Inbound Escalations</h2>
            <span className="text-xs bg-rose-950 text-rose-300 border border-rose-800/50 px-2.5 py-0.5 rounded-full font-mono">
              {tickets.length} Live Tickets
            </span>
          </div>

          {tickets.map((t) => (
            <div key={t.id} className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-all flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-rose-400 font-bold">{t.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                    t.priority === 'Urgent' ? 'bg-red-950 text-red-400 border border-red-800/50' :
                    t.priority === 'High' ? 'bg-amber-950 text-amber-400 border border-amber-800/50' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {t.priority}
                  </span>
                </div>
                <h3 className="font-semibold text-white">{t.issue}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <User className="w-3.5 h-3.5" /> {t.customer}
                </div>
              </div>

              <button className="text-xs bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-lg transition-colors">
                Take Ticket
              </button>
            </div>
          ))}
        </div>

        {/* AI Co-Pilot Assistance Panel */}
        <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl h-fit space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
            <Bot className="w-4 h-4" /> Agent Copilot Insight
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Select a ticket on the left to view RAG-generated conversation history, sentiment scoring, and recommended single-click resolutions.
          </p>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-400">
            Status: Engine Online <br />
            Embedding Store: Connected
          </div>
        </div>
      </main>
    </div>
  );
}
