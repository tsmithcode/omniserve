'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, UserCheck, Clock, CheckCircle, AlertTriangle, ArrowUpRight, Zap, Bell, Sparkles, Filter } from 'lucide-react';

export default function AgentCRM() {
  const [tickets, setTickets] = useState([
    { id: 'T-101', customer: 'Acme Corp', issue: 'API Webhook Timeout on Payment Gateway', priority: 'High', status: 'Open', timestamp: '14:22' },
    { id: 'T-102', customer: 'Global Logistics LLC', issue: 'Custom CAD Export File Conversion Failure', priority: 'Medium', status: 'In Progress', timestamp: '14:05' },
    { id: 'T-103', customer: 'Apex Systems', issue: 'Billing Invoice Dispute - Seat Count', priority: 'Low', status: 'Resolved', timestamp: '13:40' }
  ]);
  const [liveNotice, setLiveNotice] = useState<string | null>(null);

  useEffect(() => {
    // Listen for real-time tickets broadcasted from Customer view
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel('omniserve_live_queue');
      channel.onmessage = (event) => {
        const newTicket = event.data;
        setTickets(prev => [newTicket, ...prev]);
        setLiveNotice(`🚨 New Escalated Ticket Received: ${newTicket.id} (${newTicket.customer})`);
        
        // Auto-dismiss notification badge after 5 seconds
        setTimeout(() => setLiveNotice(null), 5000);
      };
      return () => channel.close();
    }
  }, []);

  const resolveTicket = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'Resolved' } : t));
  };

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
            <p className="text-[11px] text-slate-400">Enterprise Agent CRM & Escalation Workstation</p>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Customer Portal</Link>
          <Link href="/agent" className="text-emerald-400 text-sm font-semibold border-b-2 border-emerald-400 pb-0.5">Agent CRM</Link>
          <Link href="/architecture" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Telemetry & ROI</Link>
          <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-mono text-emerald-400 font-semibold">SIGNALR LISTENING</span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        
        {/* Real-time Alert Banner */}
        {liveNotice && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/40 rounded-2xl text-emerald-300 text-sm font-semibold flex items-center justify-between shadow-xl shadow-emerald-950/40 animate-bounce">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-emerald-400 animate-pulse" />
              <span>{liveNotice}</span>
            </div>
            <span className="text-xs bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-full text-emerald-400 font-mono">Real-Time Sync Active</span>
          </div>
        )}

        {/* Dashboard Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl">
            <p className="text-slate-400 text-xs font-mono mb-1">Active Queue</p>
            <p className="text-2xl font-bold text-white">{tickets.filter(t => t.status !== 'Resolved').length}</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl">
            <p className="text-slate-400 text-xs font-mono mb-1">Avg SLA Response</p>
            <p className="text-2xl font-bold text-emerald-400">1.4 mins</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl">
            <p className="text-slate-400 text-xs font-mono mb-1">AI Deflection Rate</p>
            <p className="text-2xl font-bold text-indigo-400">78.9%</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl">
            <p className="text-slate-400 text-xs font-mono mb-1">C# Engine Health</p>
            <p className="text-2xl font-bold text-emerald-400 font-mono">100% UP</p>
          </div>
        </div>

        {/* Ticket List Table */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Live Escalated Ticket Stream</span>
            </h2>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Filter className="w-4 h-4 text-slate-500" /> Auto-Sorting by Priority
            </div>
          </div>

          <div className="divide-y divide-slate-800/60">
            {tickets.map((t) => (
              <div key={t.id} className="p-5 flex items-center justify-between hover:bg-slate-800/40 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">{t.id}</span>
                    <span className="text-sm font-bold text-white">{t.customer}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      t.priority === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {t.priority} Priority
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{t.issue}</p>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    t.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse'
                  }`}>
                    {t.status}
                  </span>

                  {t.status !== 'Resolved' && (
                    <button 
                      onClick={() => resolveTicket(t.id)}
                      className="bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-semibold text-xs px-4 py-2 rounded-xl transition-all border border-emerald-500/40"
                    >
                      Resolve Ticket
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
