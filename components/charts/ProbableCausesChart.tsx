'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { fetchSummary } from '@/lib/api';

interface ProbableCausesChartProps {
  distribution?: Record<string, number>;
}

const DEFAULT_CAUSE_DIST: Record<string, number> = {
  'Normal': 128,
  'meter_tampering': 7,
  'by_pass': 6,
  'comm_failure': 4,
  'malfunction': 3,
  'seasonal': 2,
};

const CAUSE_COLOR_PALETTE = [
  '#10b981',
  '#e11d48',
  '#ea580c',
  '#7c3aed',
  '#ca8a04',
  '#0284c7',
  '#f59e0b',
  '#06b6d4',
];

function formatCauseLabel(key: string): string {
  if (key === 'meter_tampering') return 'Possible Tampering';
  if (key === 'by_pass') return 'Bypass / Direct Hook';
  if (key === 'unbilled') return 'Unbilled Usage';
  if (key === 'comm_failure') return 'Communication Fail';
  if (key === 'malfunction') return 'Meter Malfunction';
  if (key === 'seasonal') return 'Seasonal Variation';
  if (key === 'Normal' || key === 'normal') return 'Normal';

  // Fallback: capitalize snake_case
  return key
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export const ProbableCausesChart: React.FC<ProbableCausesChartProps> = ({ distribution: propDist }) => {
  const [dist, setDist] = useState<Record<string, number>>(propDist || DEFAULT_CAUSE_DIST);

  useEffect(() => {
    if (propDist) {
      setDist(propDist);
      return;
    }

    fetchSummary()
      .then((res) => {
        if (res?.consumers?.cause_distribution && Object.keys(res.consumers.cause_distribution).length > 0) {
          setDist(res.consumers.cause_distribution);
        }
      })
      .catch((err) => {
        console.warn('ProbableCausesChart: failed to fetch live summary, using fallback:', err);
      });
  }, [propDist]);

  const data = Object.entries(dist)
    .filter(([_, value]) => value > 0)
    .map(([key, count], index) => ({
      cause: formatCauseLabel(key),
      count,
      color: CAUSE_COLOR_PALETTE[index % CAUSE_COLOR_PALETTE.length],
    }));

  return (
    <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs font-sans">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-900">
          Probable Cause Breakdown
        </h3>
        <p className="text-xs text-slate-500">
          AI classification model primary flagged causes
        </p>
      </div>

      <div className="h-56 font-mono text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="cause"
              width={140}
              tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(val: any) => [`${val ?? 0} consumers`, 'Count']}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                borderRadius: '6px',
                color: '#0f172a',
                fontSize: '12px',
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
              }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={14}>
              {data.map((entry, index) => (
                <Cell key={`bar-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
