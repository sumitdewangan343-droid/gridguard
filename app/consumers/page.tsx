'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { consumers } from '@/data/consumers';
import { RiskBadge } from '@/components/dashboard/RiskBadge';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import {
  Users,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

export default function ConsumersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDT, setSelectedDT] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedRisk, setSelectedRisk] = useState('ALL');
  const [selectedCause, setSelectedCause] = useState('ALL');
  const [selectedMeterStatus, setSelectedMeterStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredConsumers = useMemo(() => {
    return consumers.filter((c) => {
      const matchSearch =
        c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.meterId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchDT = selectedDT === 'ALL' || c.transformerId === selectedDT;
      const matchCategory = selectedCategory === 'ALL' || c.category === selectedCategory;
      const matchRisk = selectedRisk === 'ALL' || c.prediction.riskLevel.toUpperCase() === selectedRisk.toUpperCase();
      const matchCause = selectedCause === 'ALL' || c.prediction.probableCause === selectedCause;
      const matchMeter = selectedMeterStatus === 'ALL' || c.meterHealth.status === selectedMeterStatus;

      return matchSearch && matchDT && matchCategory && matchRisk && matchCause && matchMeter;
    });
  }, [searchTerm, selectedDT, selectedCategory, selectedRisk, selectedCause, selectedMeterStatus]);

  const totalPages = Math.ceil(filteredConsumers.length / itemsPerPage) || 1;
  const paginatedConsumers = filteredConsumers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="pb-3 border-b border-slate-200 font-sans">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Users className="w-5 h-5 text-sky-700" />
          Consumer Directory & Investigation Matrix
        </h1>
        <p className="text-xs text-slate-500 mt-0.5 font-mono">
          Monitor 150 connected distribution endpoints, theft risk flags and telemetry health.
        </p>
      </div>

      {/* Filter & Search Bar Card */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs space-y-4 font-sans">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-mono">
            <Filter className="w-4 h-4 text-slate-400" />
            Filter & Search Network Consumers
          </h2>
          <span className="text-xs font-mono font-semibold text-slate-500">
            Showing {filteredConsumers.length} of {consumers.length} Consumers
          </span>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Search Input */}
          <div className="relative sm:col-span-2 md:col-span-2">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Consumer ID (e.g. C071), Meter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden font-mono"
            />
          </div>

          {/* Transformer Filter */}
          <div>
            <select
              value={selectedDT}
              onChange={(e) => {
                setSelectedDT(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs font-mono font-bold text-slate-800 focus:outline-hidden"
            >
              <option value="ALL">All Transformers</option>
              <option value="DT-01">DT-01</option>
              <option value="DT-02">DT-02 (High Loss)</option>
              <option value="DT-03">DT-03</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs font-mono font-bold text-slate-800 focus:outline-hidden"
            >
              <option value="ALL">All Categories</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Agricultural">Agricultural</option>
            </select>
          </div>

          {/* Risk Filter */}
          <div>
            <select
              value={selectedRisk}
              onChange={(e) => {
                setSelectedRisk(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs font-mono font-bold text-slate-800 focus:outline-hidden"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="CRITICAL">Critical Risk</option>
              <option value="HIGH">High Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="LOW">Low Risk</option>
            </select>
          </div>

          {/* Cause Filter */}
          <div>
            <select
              value={selectedCause}
              onChange={(e) => {
                setSelectedCause(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs font-mono font-bold text-slate-800 focus:outline-hidden"
            >
              <option value="ALL">All Probable Causes</option>
              <option value="Possible Theft / Tampering">Possible Theft / Tampering</option>
              <option value="Meter Malfunction">Meter Malfunction</option>
              <option value="Communication Failure">Communication Failure</option>
              <option value="Abnormal Consumption">Abnormal Consumption</option>
              <option value="Seasonal Variation">Seasonal Variation</option>
              <option value="Normal">Normal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs font-sans">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-sans font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Consumer</th>
                <th className="py-2.5 px-3">Meter</th>
                <th className="py-2.5 px-3">Transformer</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Current Usage</th>
                <th className="py-2.5 px-3">Baseline</th>
                <th className="py-2.5 px-3">Deviation</th>
                <th className="py-2.5 px-3">Risk</th>
                <th className="py-2.5 px-3">Cause</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {paginatedConsumers.map((c) => {
                const isHero = c.id === 'C071';
                const isAnomaly = c.prediction.riskScore >= 70;
                return (
                  <tr
                    key={c.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      isHero
                        ? 'bg-amber-50/60 font-semibold'
                        : isAnomaly
                        ? 'bg-rose-50/20'
                        : ''
                    }`}
                  >
                    <td className="py-2.5 px-3">
                      <Link href={`/consumers/${c.id}`} className="font-bold text-sky-700 hover:underline flex items-center gap-1.5">
                        {c.id}
                        {isHero && (
                          <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 border border-amber-300 text-[9px] rounded-sm font-extrabold font-mono">
                            DEMO HERO
                          </span>
                        )}
                      </Link>
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">{c.meterId}</td>
                    <td className="py-2.5 px-3">
                      <Link href={`/transformers/${c.transformerId}`} className="text-slate-800 hover:underline">
                        {c.transformerId}
                      </Link>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 font-sans">{c.category}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">
                      {c.currentUsageKWh} kWh
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">{c.baselineKWh} kWh</td>
                    <td className="py-2.5 px-3 font-bold">
                      <span className={c.deviationPercentage < -50 ? 'text-rose-600' : 'text-slate-700'}>
                        {c.deviationPercentage}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <RiskBadge level={c.prediction.riskLevel} score={c.prediction.riskScore} />
                    </td>
                    <td className="py-2.5 px-3 text-slate-800 font-sans font-semibold">
                      {c.prediction.probableCause}
                    </td>
                    <td className="py-2.5 px-3">
                      <StatusBadge status={c.meterHealth.status} />
                    </td>
                    <td className="py-2.5 px-3">
                      <Link
                        href={`/consumers/${c.id}`}
                        className="px-2.5 py-1 bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 rounded-sm text-[11px] font-mono font-bold transition-colors inline-flex items-center gap-1"
                      >
                        Investigate <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination UI */}
        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
          <div>
            Page <span className="font-bold text-slate-900">{currentPage}</span> of{' '}
            <span className="font-bold text-slate-900">{totalPages}</span>
          </div>

          <div className="flex items-center gap-2 font-sans">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-md border border-slate-200 disabled:opacity-40 hover:bg-slate-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-md border border-slate-200 disabled:opacity-40 hover:bg-slate-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
