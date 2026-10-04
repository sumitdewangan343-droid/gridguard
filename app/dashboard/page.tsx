'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { NetworkOverview } from '@/components/dashboard/NetworkOverview';
import { RiskDistributionChart } from '@/components/charts/RiskDistributionChart';
import { ProbableCausesChart } from '@/components/charts/ProbableCausesChart';
import { ConsumptionChart } from '@/components/charts/ConsumptionChart';
import { RiskBadge } from '@/components/dashboard/RiskBadge';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { transformers as mockTransformers } from '@/data/transformers';
import { alertsData } from '@/data/alerts';
import { investigationCases as mockCases } from '@/data/cases';
import { fetchSummary, fetchConsumers, fetchDTs, BackendSummary, ConsumerScore, DTScore } from '@/lib/api';
import {
  Users,
  AlertTriangle,
  Bell,
  Cpu,
  TrendingUp,
  Activity,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

export default function DashboardPage() {
  const [summary, setSummary] = useState<BackendSummary | null>(null);
  const [consumers, setConsumers] = useState<ConsumerScore[]>([]);
  const [dts, setDts] = useState<DTScore[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('Fetching data...');

  const loadData = async () => {
    setLoading(true);
    try {
      const [sumRes, consRes, dtRes] = await Promise.all([
        fetchSummary().catch(() => null),
        fetchConsumers(10).catch(() => []),
        fetchDTs().catch(() => []),
      ]);

      if (sumRes) {
        setSummary(sumRes);
      }
      if (consRes && consRes.length > 0) {
        setConsumers(consRes);
      }
      if (dtRes && dtRes.length > 0) {
        setDts(dtRes);
      }
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Failed to load live backend data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Metric Computations (Backend live data with fallback to mock data)
  const totalConsumers = summary?.consumers?.total ?? 0;
  const highRiskConsumers = summary?.consumers?.flagged ?? (summary?.consumers?.risk_distribution?.['High'] ?? 12);
  // const activeAlerts = (summary?.dts?.p1 ?? 0) + (summary?.dts?.p2 ?? 0) || 4;
  const suspiciousDts = summary?.dts?.suspicious ?? 0;
  const totalTransformers = summary?.dts?.total ?? mockTransformers.length;

  // Calculate average loss from DTs if available
  const avgLoss =
    dts.length > 0
      ? (
        (1 -
          1 /
          (dts.reduce(
            (acc, curr) => acc + (curr.dt_loss_ratio ?? 1),
            0
          ) / dts.length)) *
        100
      ).toFixed(1) + '%'
      : 'N/A';

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight font-sans">
            Grid Overview
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Monitor feeder health, transformer performance and consumer anomalies dynamically from Python Backend.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs text-slate-700 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 shadow-2xs font-medium cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Live Backend</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-2xs font-mono font-medium">
            <span className={`w-2 h-2 rounded-full ${summary ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span>Last updated: <strong className="text-slate-900">{lastUpdated}</strong></span>
          </div>
        </div>
      </div>

      {/* 6 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Total Consumers"
          value={String(totalConsumers)}
          subtitle="Monitored in MongoDB"
          trendColor="success"
          icon={Users}
          iconBg="bg-sky-50 text-sky-700 border border-sky-200"
        />

        <KPICard
          title="High Risk"
          value={String(highRiskConsumers)}
          subtitle="Flagged by Model"
          // trend="Urgent audit"   
          // trendDirection="up"  
          trendColor="danger"
          icon={AlertTriangle}
          iconBg="bg-rose-50 text-rose-700 border border-rose-200"
        />

        <KPICard
          title="Suspicious DTs"
          value={String(suspiciousDts)}
          subtitle="Requires attention"
          trend="High DT suspicion"
          trendDirection="neutral"
          trendColor="warning"
          icon={Bell}
          iconBg="bg-amber-50 text-amber-700 border border-amber-200"
        />

        <KPICard
          title="Transformers"
          value={String(totalTransformers)}
          subtitle="Distribution units"
          // trend="Online"
          trendDirection="neutral"
          trendColor="success"
          icon={Cpu}
          iconBg="bg-emerald-50 text-emerald-700 border border-emerald-200"
        />

        <KPICard
          title="Unexplained Loss"
          value={avgLoss}
          subtitle="Estimated loss"
          // trend="↑ Live calculation"
          // trendDirection="up"
          // trendColor="danger"
          icon={TrendingUp}
          iconBg="bg-purple-50 text-purple-700 border border-purple-200"
        />

        <KPICard
          title="Network Health"
          value={summary ? `${Math.round(((totalConsumers - highRiskConsumers) / (totalConsumers || 1)) * 100)}%` : '92%'}
          subtitle="Overall score"
          trend="Active"
          trendDirection="neutral"
          trendColor="success"
          icon={Activity}
          iconBg="bg-teal-50 text-teal-700 border border-teal-200"
        />
      </div>

      {/* Network Topology Visual Card */}
      <NetworkOverview transformers={mockTransformers} />

      {/* Risk Overview (Two Column Section) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RiskDistributionChart distribution={summary?.consumers?.risk_distribution} />
        <ProbableCausesChart distribution={summary?.consumers?.cause_distribution} />
      </div>

      {/* Network Consumption Trend Line Chart */}
      <ConsumptionChart />

      {/* Grid Tables & Live Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 font-sans">
        {/* Left Column: Transformer Performance & Priority Investigations */}
        <div className="lg:col-span-2 space-y-5">
          {/* Transformer Performance Table */}
          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Transformer Performance Overview
                </h3>
                <p className="text-xs text-slate-500">
                  Substation distribution transformer input vs aggregated consumer energy
                </p>
              </div>
              <Link
                href="/transformers"
                className="text-xs font-bold text-sky-700 hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-sans font-semibold uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3">Transformer ID</th>
                    <th className="py-2.5 px-3">Total / Flagged</th>
                    <th className="py-2.5 px-3">Suspicion Index</th>
                    <th className="py-2.5 px-3">Loss Ratio</th>
                    <th className="py-2.5 px-3">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {dts.length > 0 ? (
                    dts.slice(0, 5).map((t) => (
                      <tr key={t.dt_id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                        <td className="py-2.5 px-3">
                          <Link href={`/transformers/${t.dt_id}`} className="font-bold text-sky-700 hover:underline">
                            {t.dt_id}
                          </Link>
                        </td>
                        <td className="py-2.5 px-3 text-slate-700 font-sans">
                          {t.total_count} / <span className="text-rose-600 font-bold">{t.flagged_count}</span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-800 font-bold">
                          {t.dt_suspicion ? (t.dt_suspicion * 100).toFixed(1) + '%' : '0.0%'}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">
                          <span className={(t.dt_loss_ratio ?? 0) > 0.1 ? 'text-rose-600' : 'text-emerald-700'}>
                            {t.dt_loss_ratio ? (t.dt_loss_ratio * 100).toFixed(1) + '%' : '0.0%'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <RiskBadge level={t.dt_priority === 'P1' ? 'High' : t.dt_priority === 'P2' ? 'Medium' : 'Low'} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    mockTransformers.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                        <td className="py-2.5 px-3">
                          <Link href={`/transformers/${t.id}`} className="font-bold text-sky-700 hover:underline">
                            {t.id}
                          </Link>
                        </td>
                        <td className="py-2.5 px-3 text-slate-700 font-sans">{t.consumerCount}</td>
                        <td className="py-2.5 px-3 text-slate-800">{t.inputEnergyKWh.toLocaleString()} kWh</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">
                          <span className={t.lossPercentage > 5 ? 'text-rose-600' : 'text-emerald-700'}>
                            {t.lossPercentage}%
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <RiskBadge level={t.riskLevel} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* High Priority Investigations Table */}
          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Priority Consumer Anomaly Investigations
                </h3>
                <p className="text-xs text-slate-500">
                  Consumers flagged by Python ML backend for urgent inspection
                </p>
              </div>
              <Link
                href="/investigations"
                className="text-xs font-bold text-sky-700 hover:underline flex items-center gap-1"
              >
                Manage Cases <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-sans font-semibold uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3">Priority</th>
                    <th className="py-2.5 px-3">Consumer ID</th>
                    <th className="py-2.5 px-3">DT ID</th>
                    <th className="py-2.5 px-3">XGB Score</th>
                    <th className="py-2.5 px-3">Probable Cause</th>
                    <th className="py-2.5 px-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {consumers.length > 0 ? (
                    consumers.slice(0, 5).map((c) => (
                      <tr key={c.CONS_NO} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3">
                          <RiskBadge level={c.risk_level} />
                        </td>
                        <td className="py-2.5 px-3">
                          <Link href={`/consumers/${c.CONS_NO}`} className="font-bold text-sky-700 hover:underline">
                            {c.CONS_NO}
                          </Link>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">{c.dt_id || 'N/A'}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">
                          {(c.xgb_score * 100).toFixed(1)}%
                        </td>
                        <td className="py-2.5 px-3 text-slate-800 font-sans font-semibold">
                          {c.probable_cause || 'Pattern Anomaly'}
                        </td>
                        <td className="py-2.5 px-3">
                          <Link
                            href={`/consumers/${c.CONS_NO}`}
                            className="px-2.5 py-1 bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 rounded-sm text-[11px] font-mono font-bold transition-colors"
                          >
                            Inspect
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    mockCases.slice(0, 4).map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3">
                          <RiskBadge level={c.priority} />
                        </td>
                        <td className="py-2.5 px-3">
                          <Link href={`/consumers/${c.consumerId}`} className="font-bold text-sky-700 hover:underline">
                            {c.consumerId}
                          </Link>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">{c.transformerId}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">
                          {c.riskScore}
                        </td>
                        <td className="py-2.5 px-3 text-slate-800 font-sans font-semibold">
                          {c.probableCause}
                        </td>
                        <td className="py-2.5 px-3">
                          <Link
                            href={`/consumers/${c.consumerId}`}
                            className="px-2.5 py-1 bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 rounded-sm text-[11px] font-mono font-bold transition-colors"
                          >
                            Inspect
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Live Alerts Panel */}
        <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Live Alerts Stream
                </h3>
              </div>
              <span className="px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-sm text-[10px] font-mono font-bold">
                REALTIME
              </span>
            </div>

            <div className="space-y-3">
              {alertsData.slice(0, 5).map((alt) => (
                <div
                  key={alt.id}
                  className="p-3 bg-slate-50 rounded-md border border-slate-200 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-1 font-mono">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      {alt.consumerId ? (
                        <Link href={`/consumers/${alt.consumerId}`} className="text-sky-700 hover:underline">
                          {alt.consumerId}
                        </Link>
                      ) : (
                        <span>{alt.transformerId}</span>
                      )}
                      <span className="text-[10px] font-sans font-medium text-slate-500">({alt.type})</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{alt.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-snug line-clamp-2 font-sans">
                    {alt.message}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between">
                    <RiskBadge level={alt.riskLevel} score={alt.riskScore} />
                    <StatusBadge status={alt.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-200">
            <Link
              href="/alerts"
              className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-md text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <span>View All Live Network Alerts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
