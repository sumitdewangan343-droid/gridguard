'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { investigationCases } from '@/data/cases';
import { InvestigationCase } from '@/types/grid';
import { RiskBadge } from '@/components/dashboard/RiskBadge';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { CaseDetailModal } from '@/components/investigations/CaseDetailModal';
import { SearchCode, ExternalLink, Filter } from 'lucide-react';

export default function InvestigationsPage() {
  const [selectedCase, setSelectedCase] = useState<InvestigationCase | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredCases = investigationCases.filter((c) => {
    if (filterStatus === 'ALL') return true;
    return c.status === filterStatus;
  });

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="pb-3 border-b border-slate-200 font-sans">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <SearchCode className="w-5 h-5 text-sky-700" />
          Active Investigation Cases
        </h1>
        <p className="text-xs text-slate-500 mt-0.5 font-mono">
          Prioritized case management system for field technicians and distribution audit teams.
        </p>
      </div>

      {/* Filter Header */}
      <div className="flex items-center justify-between gap-4 bg-white p-4 border border-slate-200 rounded-md shadow-2xs font-sans">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <Filter className="w-4 h-4 text-slate-400" />
          Filter Cases by Status:
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs font-mono font-bold text-slate-800 focus:outline-hidden"
        >
          <option value="ALL">All Cases ({investigationCases.length})</option>
          <option value="Open">Open</option>
          <option value="Investigating">Investigating</option>
          <option value="Inspection Scheduled">Inspection Scheduled</option>
          <option value="Requires Review">Requires Review</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Cases Table */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs font-sans">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-sans font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Case ID</th>
                <th className="py-2.5 px-3">Consumer</th>
                <th className="py-2.5 px-3">Transformer</th>
                <th className="py-2.5 px-3">Probable Cause</th>
                <th className="py-2.5 px-3">Risk Score</th>
                <th className="py-2.5 px-3">Confidence</th>
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3">Created</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredCases.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedCase(item)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="py-2.5 px-3 font-bold text-sky-700">
                    {item.id}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">
                    {item.consumerId}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {item.transformerId}
                  </td>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-800">
                    {item.probableCause}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">
                    {item.riskScore}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {item.confidencePct}%
                  </td>
                  <td className="py-2.5 px-3">
                    <RiskBadge level={item.priority} />
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 text-[11px]">{item.createdAt}</td>
                  <td className="py-2.5 px-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedCase(item)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 rounded-sm text-[11px] font-mono font-bold transition-colors inline-flex items-center gap-1"
                    >
                      <span>View Case</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Detail Modal */}
      <CaseDetailModal item={selectedCase} onClose={() => setSelectedCase(null)} />
    </DashboardLayout>
  );
}
