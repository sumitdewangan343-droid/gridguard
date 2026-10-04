/**
 * my-app/lib/api.ts
 * Typed API fetcher client for electricity theft backend (FastAPI / Proxy).
 */

export interface ConsumerScore {
  CONS_NO: string;
  dt_id?: string;
  xgb_score: number;
  combined_score: number;
  predicted_flag: 0 | 1;
  risk_level: 'Normal' | 'Low' | 'Medium' | 'High';
  historical_mean?: number;
  current_mean?: number;
  deviation_pct?: number;
  probable_cause?: string;
  cause_confidence?: number;
  priority?: string;
  recommended_action?: string;
  supporting_features?: Array<{ feature: string; value: number; shap: number }>;
  features?: Record<string, number>;
}

export interface DTScore {
  dt_id: string;
  dt_if_risk: number;
  dt_if_risk_max: number;
  dt_suspicion: number;
  dt_priority: 'P1' | 'P2' | 'P3';
  flagged_count: number;
  total_count: number;
  flagged_ratio: number;
  dt_mean_power?: number;
  dt_loss_ratio?: number;
  dt_loss_zscore?: number;
}

export interface BackendSummary {
  computed_at?: string;
  consumers: {
    total: number;
    flagged: number;
    cause_distribution: Record<string, number>;
    priority_distribution: Record<string, number>;
    risk_distribution: Record<string, number>;
  };
  dts: {
    total: number;
    suspicious?: number;
    p1: number;
    p2: number;
    top_suspicious: Array<{ dt_id: string; dt_suspicion: number }>;
  };
}

const PROXY_BASE = '/api/backend';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorText = await res.text().catch(() => '');
    throw new Error(`API Error ${res.status}: ${errorText || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchSummary(): Promise<BackendSummary> {
  const res = await fetch(`${PROXY_BASE}/api/v1/scores/summary`, { cache: 'no-store' });
  return handleResponse<BackendSummary>(res);
}

export async function fetchConsumers(limit: number = 500): Promise<ConsumerScore[]> {
  const res = await fetch(`${PROXY_BASE}/api/v1/scores/consumers?n=${limit}`, { cache: 'no-store' });
  return handleResponse<ConsumerScore[]>(res);
}

export async function fetchDTs(): Promise<DTScore[]> {
  const res = await fetch(`${PROXY_BASE}/api/v1/scores/dts`, { cache: 'no-store' });
  return handleResponse<DTScore[]>(res);
}

export async function fetchConsumerDetail(consNo: string): Promise<ConsumerScore> {
  let res = await fetch(`${PROXY_BASE}/api/v1/scores/consumer/${encodeURIComponent(consNo)}`, { cache: 'no-store' });
  if (res.status === 404) {
    res = await fetch(`${PROXY_BASE}/api/v1/consumer/${encodeURIComponent(consNo)}`, { cache: 'no-store' });
  }
  const data = await handleResponse<any>(res);
  if (data && data.score) {
    return {
      ...data.score,
      CONS_NO: data.CONS_NO || data.score.CONS_NO || consNo,
      features: data.features || data.score.features || {},
    };
  }
  return data as ConsumerScore;
}
