'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { transformers } from '@/data/transformers';
import { consumers } from '@/data/consumers';
import { KPICard } from '@/components/dashboard/KPICard';
import { RiskBadge } from '@/components/dashboard/RiskBadge';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { LossChart } from '@/components/charts/LossChart';
import { RiskDistributionChart } from '@/components/charts/RiskDistributionChart';
import {
  Cpu,
  Zap,
  Users,
  AlertTriangle,
  TrendingUp,
  Activity,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';

export default function TransformerDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || 'DT-02';

  const transformer = transformers.find((t) => t.id === id) || transformers[1];
  const transformerConsumers = consumers.filter((c) => c.transformerId === transformer.id);

  return (
    <DashboardLayout>
      {/* Back Button & Header */}
      <div className="space-y-3 font-sans">
        <Link
          href="/transformers"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Transformers
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-3 font-mono">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
                {transformer.id}
              </h1>
              <RiskBadge level={transformer.riskLevel} />
              <StatusBadge status={transformer.status} />
            </div>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              {transformer.name} • Feeder {transformer.feederId} • {transformer.capacityKVA} kVA • {transformer.consumerCount} Consumers
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid (6 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Input Energy"
          value={`${transformer.inputEnergyKWh.toLocaleString()} kWh`}
          subtitle="Substation Meter"
          icon={Zap}
          iconBg="bg-sky-50 text-sky-700 border border-sky-200"
        />

        <KPICard
          title="Consumer Energy"
          value={`${transformer.consumerUsageKWh.toLocaleString()} kWh`}
          subtitle="Metered Total"
          icon={Users}
          iconBg="bg-emerald-50 text-emerald-700 border border-emerald-200"
        />

        <KPICard
          title="Technical Loss"
          value={`${transformer.technicalLossKWh} kWh`}
          subtitle="Line Impedance"
          icon={Activity}
          iconBg="bg-slate-100 text-slate-700 border border-slate-200"
        />

        <KPICard
          title="Unexplained Loss"
          value={`${transformer.unexplainedLossKWh.toLocaleString()} kWh`}
          subtitle="Unmetered / Theft"
          trend="Critical"
          trendDirection="up"
          trendColor="danger"
          icon={AlertTriangle}
          iconBg="bg-rose-50 text-rose-700 border border-rose-200"
        />

        <KPICard
          title="Loss Percentage"
          value={`${transformer.lossPercentage}%`}
          subtitle="Total Loss"
          trend="↑ 2.4%"
          trendDirection="up"
          trendColor="danger"
          icon={TrendingUp}
          iconBg="bg-amber-50 text-amber-700 border border-amber-200"
        />

        <KPICard
          title="High-Risk Users"
          value={transformer.highRiskCount}
          subtitle="Flagged Consumers"
          trend="Urgent Audit"
          trendDirection="neutral"
          trendColor="danger"
          icon={Cpu}
          iconBg="bg-purple-50 text-purple-700 border border-purple-200"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <LossChart />
        <RiskDistributionChart />
      </div>

      {/* Consumers Table */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs font-sans">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Consumers under {transformer.id} ({transformerConsumers.length} Total)
            </h3>
            <p className="text-xs text-slate-500">
              Individual consumer consumption vs baseline and AI anomaly predictions
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-sans font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Consumer</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Current Usage</th>
                <th className="py-2.5 px-3">Baseline</th>
                <th className="py-2.5 px-3">Deviation</th>
                <th className="py-2.5 px-3">Risk Level</th>
                <th className="py-2.5 px-3">Probable Cause</th>
                <th className="py-2.5 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {transformerConsumers.map((c) => {
                const isAnomaly = c.prediction.riskScore >= 70;
                return (
                  <tr
                    key={c.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      isAnomaly ? 'bg-rose-50/20' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3">
                      <Link href={`/consumers/${c.id}`} className="font-bold text-sky-700 hover:underline">
                        {c.id}
                      </Link>
                      <div className="text-[10px] text-slate-400 font-mono">{c.meterId}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 font-sans">{c.category}</td>
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
                    <td className="py-2.5 px-3 font-sans font-semibold text-slate-800">
                      {c.prediction.probableCause}
                    </td>
                    <td className="py-2.5 px-3">
                      <Link
                        href={`/consumers/${c.id}`}
                        className="px-2.5 py-1 bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 rounded-sm text-[11px] font-mono font-bold transition-colors inline-flex items-center gap-1"
                      >
                        Inspect <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
