'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ElectricalFeederHierarchyVisualizer } from '@/components/network/ElectricalFeederHierarchyVisualizer';
import { feederF001 } from '@/data/feeders';
import { transformers } from '@/data/transformers';
import { Network, Activity, Zap, Database, BarChart3, Radio } from 'lucide-react';
import { StatusBadge } from '@/components/dashboard/StatusBadge';

export default function NetworkPage() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="pb-3 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Network className="w-5 h-5 text-sky-700" />
          Network Topology & Feeder Visualizer
        </h1>
        <p className="text-xs text-slate-600 mt-0.5">
          Feeder F001 • Substation Alpha • 1 Feeder • 3 Distribution Transformers • 150 Consumers
        </p>
      </div>

      {/* Main Interactive Electrical Feeder Hierarchy Visualizer */}
      <ElectricalFeederHierarchyVisualizer transformers={transformers} />

      {/* Technical Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
        <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 font-mono">
              <Database className="w-4 h-4 text-sky-700" />
              Substation Alpha — Feeder F001 Technical Parameters
            </h3>
            <StatusBadge status="Online" />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-[10px] font-sans text-slate-500 font-semibold uppercase block">Primary Substation</span>
              <span className="font-bold text-slate-900">{feederF001.substation}</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-[10px] font-sans text-slate-500 font-semibold uppercase block">Feeder Voltage Rating</span>
              <span className="font-bold text-slate-900">11.0 kV AC Nominal</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-[10px] font-sans text-slate-500 font-semibold uppercase block">Distribution Transformers</span>
              <span className="font-bold text-slate-900">3 Step-down Nodes</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-[10px] font-sans text-slate-500 font-semibold uppercase block">Smart Meters Monitored</span>
              <span className="font-bold text-slate-900">150 Connected Units</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 font-mono">
              <BarChart3 className="w-4 h-4 text-sky-700" />
              Feeder Energy & Loss Breakdown
            </h3>
            <span className="text-[10px] font-mono font-semibold text-slate-500">Billing Oct 2026</span>
          </div>

          <div className="space-y-2 text-xs font-sans">
            <div className="flex justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-slate-600">Total Bulk Energy Input:</span>
              <span className="font-mono font-bold text-slate-900">{feederF001.totalEnergyKWh.toLocaleString()} kWh</span>
            </div>

            <div className="flex justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-slate-600">Technical Line Loss:</span>
              <span className="font-mono font-bold text-slate-900">{feederF001.totalLossPercentage}%</span>
            </div>

            <div className="flex justify-between p-2.5 bg-rose-50 border border-rose-200 rounded-md font-bold text-rose-900">
              <span>Unexplained Loss Ratio:</span>
              <span className="font-mono text-rose-700">{feederF001.unexplainedLossPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
