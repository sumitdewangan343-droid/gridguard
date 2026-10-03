'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { NetworkOverview } from '@/components/dashboard/NetworkOverview';
import { RiskDistributionChart } from '@/components/charts/RiskDistributionChart';
import { ProbableCausesChart } from '@/components/charts/ProbableCausesChart';
import { ConsumptionChart } from '@/components/charts/ConsumptionChart';
import { RiskBadge } from '@/components/dashboard/RiskBadge';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { transformers } from '@/data/transformers';
import { alertsData } from '@/data/alerts';
import { investigationCases } from '@/data/cases';
import {
  Users,
  AlertTriangle,
  Bell,
  Cpu,
  TrendingUp,
  Activity,
  ArrowRight,
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight font-sans">
            Grid Overview
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Monitor feeder health, transformer performance and consumer anomalies.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto text-xs text-slate-600 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-2xs font-mono font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span>Last updated: <strong className="text-slate-900">10:42:18 AM</strong></span>
        </div>
      </div>

      {/* 6 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Total Consumers"
          value="150"
          subtitle="Monitored"
          // trend="+3 this month"
          // trendDirection="up"
          trendColor="success"
          icon={Users}
          iconBg="bg-sky-50 text-sky-700 border border-sky-200"
        />

        <KPICard
          title="High Risk"
          value="12"
          subtitle="High-risk consumers"
          trend="3 from yesterday"
          trendDirection="up"
          trendColor="danger"
          icon={AlertTriangle}
          iconBg="bg-rose-50 text-rose-700 border border-rose-200"
        />

        <KPICard
          title="Active Alerts"
          value="04"
          subtitle="Requires attention"
          trend="2 critical"
          trendDirection="neutral"
          trendColor="warning"
          icon={Bell}
          iconBg="bg-amber-50 text-amber-700 border border-amber-200"
        />

        <KPICard
          title="Transformers"
          value="3"
          subtitle="Monitored"
          trend="All online"
          trendDirection="neutral"
          trendColor="success"
          icon={Cpu}
          iconBg="bg-emerald-50 text-emerald-700 border border-emerald-200"
        />

        <KPICard
          title="Unexplained Loss"
          value="6.8%"
          subtitle="Estimated"
          trend="↑ 1.4%"
          trendDirection="up"
          trendColor="danger"
          icon={TrendingUp}
          iconBg="bg-purple-50 text-purple-700 border border-purple-200"
        />

        <KPICard
          title="Network Health"
          value="92%"
          subtitle="Overall health"
          trend="Good"
          trendDirection="neutral"
          trendColor="success"
          icon={Activity}
          iconBg="bg-teal-50 text-teal-700 border border-teal-200"
        />
      </div>

      {/* Network Topology Visual Card */}
      <NetworkOverview transformers={transformers} />

      {/* Risk Overview (Two Column Section) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RiskDistributionChart />
        <ProbableCausesChart />
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
                    <th className="py-2.5 px-3">Transformer</th>
                    <th className="py-2.5 px-3">Consumers</th>
                    <th className="py-2.5 px-3">Input</th>
                    <th className="py-2.5 px-3">Consumer Usage</th>
                    <th className="py-2.5 px-3">Loss %</th>
                    <th className="py-2.5 px-3">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {transformers.map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <td className="py-2.5 px-3">
                        <Link href={`/transformers/${t.id}`} className="font-bold text-sky-700 hover:underline">
                          {t.id}
                        </Link>
                      </td>
                      <td className="py-2.5 px-3 text-slate-700 font-sans">{t.consumerCount}</td>
                      <td className="py-2.5 px-3 text-slate-800">
                        {t.inputEnergyKWh.toLocaleString()} kWh
                      </td>
                      <td className="py-2.5 px-3 text-slate-800">
                        {t.consumerUsageKWh.toLocaleString()} kWh
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">
                        <span className={t.lossPercentage > 5 ? 'text-rose-600' : 'text-emerald-700'}>
                          {t.lossPercentage}%
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <RiskBadge level={t.riskLevel} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* High Priority Investigations Table */}
          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Priority Investigations
                </h3>
                <p className="text-xs text-slate-500">
                  Consumers flagged by XGBoost model for urgent field inspection
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
                    <th className="py-2.5 px-3">Consumer</th>
                    <th className="py-2.5 px-3">DT</th>
                    <th className="py-2.5 px-3">Risk Score</th>
                    <th className="py-2.5 px-3">Probable Cause</th>
                    <th className="py-2.5 px-3">Confidence</th>
                    <th className="py-2.5 px-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {investigationCases.slice(0, 4).map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
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
                      <td className="py-2.5 px-3 text-slate-600">
                        {c.confidencePct}%
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
                  ))}
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
