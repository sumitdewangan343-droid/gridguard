'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { transformers } from '@/data/transformers';
import { RiskBadge } from '@/components/dashboard/RiskBadge';
import { Cpu, Users, AlertTriangle, ArrowRight } from 'lucide-react';

export default function TransformersPage() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="pb-3 border-b border-slate-200 font-sans">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Cpu className="w-5 h-5 text-sky-700" />
          Distribution Transformers
        </h1>
        <p className="text-xs text-slate-500 mt-0.5 font-mono">
          Monitor energy loss, capacity loading and risk status across distribution nodes.
        </p>
      </div>

      {/* 3 Transformer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-sans">
        {transformers.map((dt) => {
          const isHighRisk = dt.riskLevel === 'High' || dt.riskLevel === 'Critical';

          return (
            <div
              key={dt.id}
              className={`bg-white border rounded-md p-5 shadow-2xs flex flex-col justify-between transition-all duration-150 ${
                isHighRisk
                  ? 'border-rose-300 ring-1 ring-rose-200 bg-rose-50/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-md border ${
                        isHighRisk
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-sky-50 text-sky-700 border-sky-200'
                      }`}
                    >
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                        {dt.feederId}
                      </div>
                      <h2 className="text-base font-bold text-slate-900 font-mono">
                        {dt.id}
                      </h2>
                    </div>
                  </div>

                  <RiskBadge level={dt.riskLevel} />
                </div>

                <p className="text-xs text-slate-500 mb-4 font-medium">
                  {dt.name} • {dt.location}
                </p>

                {/* Specs Grid */}
                <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-md border border-slate-200 mb-4 font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-sans">Capacity:</span>
                    <span className="font-bold text-slate-900">
                      {dt.capacityKVA} kVA
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-sans">Consumers Monitored:</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1 font-sans">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {dt.consumerCount} users
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-sans">Substation Input:</span>
                    <span className="text-slate-800">
                      {dt.inputEnergyKWh.toLocaleString()} kWh
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-sans">Consumer Usage:</span>
                    <span className="text-slate-800">
                      {dt.consumerUsageKWh.toLocaleString()} kWh
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                    <span className="text-slate-500 font-sans">Unexplained Loss:</span>
                    <span className={`font-bold ${isHighRisk ? 'text-rose-600' : 'text-slate-700'}`}>
                      {dt.unexplainedLossKWh.toLocaleString()} kWh
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-sans">Distribution Loss:</span>
                    <span className={`text-sm font-extrabold ${isHighRisk ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {dt.lossPercentage}%
                    </span>
                  </div>
                </div>

                {isHighRisk && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-900 mb-4 flex items-center gap-2 font-sans">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>8 suspicious consumers with abnormal load drops flagged under DT-02.</span>
                  </div>
                )}
              </div>

              <Link
                href={`/transformers/${dt.id}`}
                className={`w-full py-2 px-3 rounded-md text-xs font-bold text-center flex items-center justify-center gap-2 transition-colors ${
                  isHighRisk
                    ? 'bg-rose-700 text-white hover:bg-rose-800'
                    : 'bg-sky-700 text-white hover:bg-sky-800'
                }`}
              >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
