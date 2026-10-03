'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { alertsData } from '@/data/alerts';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { AlertCircle } from 'lucide-react';

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Critical' | 'High' | 'Medium' | 'Resolved'>('All');

  const filteredAlerts = alertsData.filter((a) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Resolved') return a.status === 'Resolved';
    return a.riskLevel.toUpperCase() === activeTab.toUpperCase();
  });

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="pb-3 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-700" />
          Items Requiring Attention
        </h1>
        <p className="text-xs text-slate-600 mt-0.5">
          System observations grouped by Investigation, Data Quality, Network Imbalance & Telemetry.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 text-xs font-sans overflow-x-auto">
        {(['All', 'Critical', 'High', 'Medium', 'Resolved'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded font-semibold transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab} Items
          </button>
        ))}
      </div>

      {/* Items Table */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3">Target Endpoint</th>
                <th className="py-2.5 px-3">Transformer</th>
                <th className="py-2.5 px-3">Observation Type</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Details</th>
                <th className="py-2.5 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredAlerts.map((alt) => (
                <tr key={alt.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">{alt.timestamp}</td>
                  <td className="py-2.5 px-3 font-bold font-mono">
                    {alt.consumerId ? (
                      <Link href={`/consumers/${alt.consumerId}`} className="text-sky-700 hover:underline">
                        {alt.consumerId}
                      </Link>
                    ) : (
                      <span className="text-slate-600">Transformer level</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 font-mono">{alt.transformerId}</td>
                  <td className="py-2.5 px-3 text-slate-800">{alt.type}</td>
                  <td className="py-2.5 px-3">
                    <StatusBadge status={alt.status} />
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 max-w-md truncate">{alt.message}</td>
                  <td className="py-2.5 px-3">
                    <Link
                      href={alt.consumerId ? `/consumers/${alt.consumerId}` : `/transformers/${alt.transformerId}`}
                      className="px-2 py-1 bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-800 rounded text-[11px] font-semibold transition-colors inline-block"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
