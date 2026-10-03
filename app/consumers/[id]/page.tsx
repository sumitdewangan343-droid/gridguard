'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { consumers, heroConsumer } from '@/data/consumers';
import { heroConsumerTrends } from '@/data/readings';
import { RiskGauge } from '@/components/dashboard/RiskGauge';
import { EvidenceCard } from '@/components/dashboard/EvidenceCard';
import { ShapChart } from '@/components/dashboard/ShapChart';
import { ConsumptionChart } from '@/components/charts/ConsumptionChart';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import {
  ArrowLeft,
  CheckCircle,
  Download,
} from 'lucide-react';

export default function ConsumerDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || 'C071';

  const [timeRange, setTimeRange] = useState<'30D' | '90D' | '6M' | '1Y'>('90D');
  const [investigating, setInvestigating] = useState(false);

  const consumer = consumers.find((c) => c.id === id) || heroConsumer;
  const chartPoints = heroConsumerTrends[timeRange] || heroConsumerTrends['90D'];

  return (
    <DashboardLayout>
      {/* Back Button & Header */}
      <div className="space-y-3 font-sans">
        <Link
          href="/consumers"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Consumer Directory
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
                Consumer <span className="font-mono text-sky-700">{consumer.id}</span>
              </h1>
              <span className="px-2 py-0.5 bg-sky-50 text-sky-800 border border-sky-200 text-[11px] font-mono font-bold rounded-sm">
                {consumer.category}
              </span>
              <StatusBadge status={consumer.connectionStatus} />
            </div>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              {consumer.name} • Meter {consumer.meterId} • Transformer{' '}
              <Link href={`/transformers/${consumer.transformerId}`} className="text-sky-700 hover:underline">
                {consumer.transformerId}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Top Grid: Risk Summary (Gauge) & Consumer Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 font-sans">
        {/* Risk Gauge */}
        <RiskGauge
          score={consumer.prediction.riskScore}
          level={consumer.prediction.riskLevel}
          probableCause={consumer.prediction.probableCause}
          confidence={consumer.prediction.confidence}
        />

        {/* Consumer Profile Card */}
        <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-3">
              Consumer Specifications
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Consumer ID:</span>
                <span className="font-bold text-slate-900">{consumer.id}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Meter Serial Number:</span>
                <span className="font-semibold text-slate-800">{consumer.meterId}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Substation Transformer:</span>
                <span className="font-semibold text-sky-700">{consumer.transformerId}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Tariff Category:</span>
                <span className="font-medium text-slate-800 font-sans">{consumer.tariff}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Sanctioned Load Limit:</span>
                <span className="font-bold text-slate-900">{consumer.sanctionedLoadKW} kW</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Premises Address:</span>
                <span className="font-medium text-slate-700 text-right font-sans">{consumer.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Meter Health Card */}
        <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                Meter Telemetry Health
              </h3>
              <StatusBadge status={consumer.meterHealth.communication} />
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Internal Diagnostic:</span>
                <StatusBadge status={consumer.meterHealth.status} />
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Communication Gateway:</span>
                <span className="font-semibold text-slate-800 font-sans">{consumer.meterHealth.communication}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Missing Packet Ratio:</span>
                <span className="text-slate-800">{consumer.meterHealth.missingReadingsPct}%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Duplicate Packets:</span>
                <span className="text-slate-800">{consumer.meterHealth.duplicateReadingsPct}%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Data Quality Index:</span>
                <span className="font-bold text-emerald-700">{consumer.meterHealth.dataQualityPct}%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Last Heartbeat Ping:</span>
                <span className="text-slate-500">{consumer.meterHealth.lastPing}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Consumption vs Baseline Chart */}
      <div className="space-y-3 font-sans">
        <div className="flex justify-end">
          <div className="inline-flex p-1 bg-slate-100 rounded-md border border-slate-200 font-mono text-xs">
            {(['30D', '90D', '6M', '1Y'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 text-xs font-bold rounded-sm transition-all ${
                  timeRange === r
                    ? 'bg-white text-sky-700 shadow-2xs border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <ConsumptionChart
          customData={chartPoints}
          title={`Consumer ${consumer.id} Historical Consumption vs Baseline`}
          subtitle="Comparing actual smart meter readings against ML expected baseline & peer residential group average"
          showPeer={true}
        />
      </div>

      {/* Flagged Evidence & SHAP Model Explanation (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 font-sans">
        <EvidenceCard
          consumerId={consumer.id}
          evidence={consumer.prediction.evidence}
          probableCause={consumer.prediction.probableCause}
        />

        <ShapChart factors={consumer.prediction.topFactors} />
      </div>

      {/* Recommended Action Prominent Card */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6 font-sans">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-md text-xs font-mono font-bold tracking-wider uppercase">
              RECOMMENDED ACTION: {consumer.prediction.recommendedAction}
            </span>
            <span className="px-2 py-0.5 bg-rose-700 text-white text-[10px] font-bold font-mono rounded-sm">
              PRIORITY: {consumer.prediction.actionPriority}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900">
            Action Plan for Consumer {consumer.id}
          </h3>

          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            {consumer.prediction.recommendedActionReason}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 font-sans">
          <button
            onClick={() => setInvestigating(!investigating)}
            className={`w-full sm:w-auto px-4 py-2 rounded-md text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              investigating
                ? 'bg-emerald-700 text-white'
                : 'bg-sky-700 text-white hover:bg-sky-800'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{investigating ? 'Marked as Investigating' : 'Mark as Investigating'}</span>
          </button>

          <button
            onClick={() => alert(`Report for ${consumer.id} exported successfully!`)}
            className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-md text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Report</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
