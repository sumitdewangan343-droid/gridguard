'use client';

import React from 'react';
import Link from 'next/link';
import {
  Zap,
  ShieldAlert,
  Activity,
  Cpu,
  Network,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Radio,
  FileText,
  ChevronRight,
  Layers,
  Lock,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-sky-700 selection:text-white antialiased">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION WITH SEAMLESS VIDEO OVERLAY (LIGHT THEME) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-200">
        {/* HTML5 Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none scale-100 transition-transform duration-1000"
        >
          <source src="/video/gemini_generated_video_396348fd.mp4" type="video/mp4" />
          Your browser does not support HTML5 video playback.
        </video>

        {/* Editorial Light Gradient Overlay: Soft solid light backdrop on the left for text legibility, transparent on the right for video clarity */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-slate-50/80 to-slate-50/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/70 via-transparent to-slate-50 pointer-events-none" />

        {/* Top Header / Navigation Bar */}
        <header className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-600 text-white rounded-md shadow-xs">
              <Zap className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 tracking-tight text-xl font-sans">
                GridGuard
              </div>
              {/* <div className="text-[10px] font-mono font-bold text-sky-700 uppercase tracking-widest">
                Utility Intelligence
              </div> */}
            </div>
          </div>

          {/* Navigation Anchors */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-700">
            <a href="#features" className="hover:text-sky-700 transition-colors">
              Platform Features
            </a>
            <a href="#visualizer" className="hover:text-sky-700 transition-colors">
              Topology Visualizer
            </a>
            <a href="#architecture" className="hover:text-sky-700 transition-colors">
              ML Engine
            </a>
            <a href="#telemetry" className="hover:text-sky-700 transition-colors">
              Live Telemetry
            </a>
          </nav>

          {/* Header Action Button */}
          <div className="flex items-center gap-3 font-mono">
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Main Hero Banner Content */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 flex flex-col justify-center items-start space-y-6">
          {/* Realtime System Badge */}
          {/* <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-sky-100/90 border border-sky-200/80 rounded-full text-xs font-mono text-sky-900 shadow-2xs backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-bold text-sky-950">FEEDER F001</span>
            <span className="text-sky-400">•</span>
            <span className="text-sky-900 font-sans font-medium">SCADA Distribution Intelligence</span>
          </div> */}

          {/* Hero Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.12] max-w-4xl">
            From Electricity Data
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-700 to-sky-900">
              to Actionable Intelligence
            </span>
          </h1>

          {/* Hero Sub-headline */}
          <p className="text-base sm:text-xl text-slate-700 max-w-2xl font-normal leading-relaxed">
            AI powered electricity intelligence platform combining consumer behavior analysis, time-series detection, and grid level analytics to detect anomalies, explain probable causes, and prioritize inspections.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto font-sans">
            <Link
              href="/dashboard"
              className="px-6 py-3.5 bg-sky-600 hover:bg-sky-700 text-white rounded-md text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:-translate-y-0.5"
            >
              <span>Open Executive Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/network"
              className="px-6 py-3.5 bg-slate-900/5 hover:bg-slate-900/10 text-slate-800 border border-slate-900/15 rounded-md text-sm font-bold flex items-center justify-center gap-2 transition-all backdrop-blur-xs"
            >
              <Network className="w-4 h-4 text-sky-700" />
              <span>Explore Network Visualizer</span>
            </Link>
          </div>

          {/* Key Value Indicators with Clean Horizontal Border */}
          {/* <div className="pt-6 w-full max-w-3xl border-t border-slate-300/80">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs">
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-sans font-bold block">Primary Voltage</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">11.0 kV Feeder</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-sans font-bold block">Distribution Nodes</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">3 x 100 kVA DTs</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-sans font-bold block">Endpoints Monitored</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">150 Smart Meters</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-sans font-bold block">ML Theft Precision</span>
                <span className="text-sm font-bold text-emerald-700 mt-0.5 block">99.4% Accuracy</span>
              </div>
            </div>
          </div> */}
        </div>

        {/* Bottom Hero Ticker Bar */}
        {/* <div className="relative z-10 bg-slate-100/90 border-t border-slate-200 py-3 px-4 sm:px-8 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-700" />
              <span className="font-semibold text-slate-900">LIVE SCADA STREAM:</span>
              <span>Substation Alpha • Transformer DT-02 flagged for unmetered load drop</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-rose-700 font-bold bg-rose-100/80 px-2 py-0.5 border border-rose-200 rounded-sm">Unexplained Loss: 17.5%</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-800 font-bold">8 Suspicious Endpoints</span>
            </div>
          </div>
        </div> */}
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: PLATFORM CAPABILITIES GRID */}
      {/* ------------------------------------------------------------- */}
      <section id="features" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono font-bold text-sky-700 uppercase tracking-widest">
              ENTERPRISE UTILITY ARCHITECTURE
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Engineered for High-Density Grid Infrastructure
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Replaces generic SaaS dashboards with specialized industrial software visual tools for power system engineers, energy auditors, and field inspection crews.
            </p>
          </div>

          {/* 6 Capabilities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-md space-y-3 shadow-2xs hover:border-sky-300 transition-colors">
              <div className="p-2.5 bg-sky-100 text-sky-800 w-fit rounded-md border border-sky-200">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                SCADA Energy Balancing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Continuous mathematical delta audit comparing bulk distribution transformer output against aggregated consumer smart meter consumption.
              </p>
              <div className="pt-2 text-[11px] font-mono text-sky-700 font-bold flex items-center gap-1">
                <span>Loss Ratio Calculation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-md space-y-3 shadow-2xs hover:border-sky-300 transition-colors">
              <div className="p-2.5 bg-rose-100 text-rose-800 w-fit rounded-md border border-rose-200">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                XGBoost Theft Detection
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Supervised & unsupervised machine learning pipeline detecting meter bypass, phase tapping, and physical tampering patterns.
              </p>
              <div className="pt-2 text-[11px] font-mono text-rose-700 font-bold flex items-center gap-1">
                <span>Isolation Forest + XGBoost</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-md space-y-3 shadow-2xs hover:border-sky-300 transition-colors">
              <div className="p-2.5 bg-indigo-100 text-indigo-800 w-fit rounded-md border border-indigo-200">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                SHAP Explainable AI
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Transparent feature attribution showing exact delta metrics (e.g., −62% baseline drop) so field teams understand why a consumer was flagged.
              </p>
              <div className="pt-2 text-[11px] font-mono text-indigo-700 font-bold flex items-center gap-1">
                <span>Empirical Evidence Cards</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-md space-y-3 shadow-2xs hover:border-sky-300 transition-colors">
              <div className="p-2.5 bg-amber-100 text-amber-800 w-fit rounded-md border border-amber-200">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Feeder Hierarchy Visualizer
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Vector line topology mapping transmission pylons down to distribution transformers and consumer clusters with telemetry signal flow.
              </p>
              <div className="pt-2 text-[11px] font-mono text-amber-800 font-bold flex items-center gap-1">
                <span>Vector Node Diagram</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-md space-y-3 shadow-2xs hover:border-sky-300 transition-colors">
              <div className="p-2.5 bg-emerald-100 text-emerald-800 w-fit rounded-md border border-emerald-200">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Realtime SCADA Stream
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Low-latency telemetry feed tracking packet delivery, missing readings, duplicate packets, and meter diagnostic heartbeat status.
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-700 font-bold flex items-center gap-1">
                <span>0.4s Packet Stream</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-md space-y-3 shadow-2xs hover:border-sky-300 transition-colors">
              <div className="p-2.5 bg-purple-100 text-purple-800 w-fit rounded-md border border-purple-200">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Utility Audit Reporting
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Automated case generation, inspection scheduling, and one-click PDF regulatory exports for energy audit compliance.
              </p>
              <div className="pt-2 text-[11px] font-mono text-purple-700 font-bold flex items-center gap-1">
                <span>One-Click Export</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: TOPOLOGY & DEMO PREVIEW SHOWCASE */}
      {/* ------------------------------------------------------------- */}
      <section id="visualizer" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-mono font-bold text-sky-700 uppercase tracking-widest">
                LIVE TOPOLOGY DEMO
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Substation Alpha • Distribution Feeder F001
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Interactive representation of 11.0 kV Primary Feeder connected to 3 Distribution Transformers monitoring 150 consumer endpoints.
              </p>
            </div>

            <Link
              href="/network"
              className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white rounded-md text-xs font-bold font-mono inline-flex items-center gap-2 transition-colors shrink-0"
            >
              <span>Launch Full Screen Visualizer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Embedded Interactive Topology Card Preview */}
          <div className="bg-white border border-slate-200 rounded-md p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-slate-900 text-white font-bold rounded-sm">
                  Substation Alpha (132/11 kV)
                </span>
                <span className="text-slate-500">Feeder F001</span>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  DT-01: 2.1% Normal
                </span>
                <span className="text-rose-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                  DT-02: 17.5% High Loss
                </span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  DT-03: 1.8% Normal
                </span>
              </div>
            </div>

            {/* Quick Demo Node Teaser Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-900">Node DT-01</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px]">Normal</span>
                </div>
                <p className="text-[11px] text-slate-500 font-sans">100 kVA • Sector 4 Residential</p>
                <div className="pt-2 text-[11px] text-slate-700 flex justify-between border-t border-slate-200">
                  <span>Usage: 21,500 kWh</span>
                  <span className="text-emerald-700 font-bold">Loss: 2.1%</span>
                </div>
              </div>

              <div className="p-4 bg-rose-50/40 border border-rose-300 rounded-md space-y-2 ring-1 ring-rose-200">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-900">Node DT-02</span>
                  <span className="px-2 py-0.5 bg-rose-50 text-rose-800 border border-rose-200 text-[10px]">High Loss</span>
                </div>
                <p className="text-[11px] text-slate-500 font-sans">100 kVA • Industrial Bypass Area</p>
                <div className="pt-2 text-[11px] text-slate-700 flex justify-between border-t border-rose-200">
                  <span>Usage: 16,800 kWh</span>
                  <span className="text-rose-600 font-bold">Loss: 17.5%</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-900">Node DT-03</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px]">Normal</span>
                </div>
                <p className="text-[11px] text-slate-500 font-sans">100 kVA • Commercial Hub</p>
                <div className="pt-2 text-[11px] text-slate-700 flex justify-between border-t border-slate-200">
                  <span>Usage: 24,100 kWh</span>
                  <span className="text-emerald-700 font-bold">Loss: 1.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: ML ENGINE & ARCHITECTURE STEPS */}
      {/* ------------------------------------------------------------- */}
      <section id="architecture" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono font-bold text-sky-700 uppercase tracking-widest">
              END-TO-END PIPELINE
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Machine Learning & Data Processing Flow
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              How GridGuard ingests raw smart meter telemetry, calculates delta energy loss, and serves explainable AI predictions.
            </p>
          </div>

          {/* 4 Pipeline Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-sans">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-md space-y-3 relative">
              <div className="text-xs font-mono font-bold text-sky-700">STEP 01</div>
              <h3 className="text-sm font-bold text-slate-900">SCADA Ingestion</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aggregates 15-minute interval smart meter readings and bulk transformer substation meter telemetry.
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-md space-y-3 relative">
              <div className="text-xs font-mono font-bold text-sky-700">STEP 02</div>
              <h3 className="text-sm font-bold text-slate-900">Energy Balancing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Computes mathematical delta line loss against physical impedance baselines to detect unexplained energy drops.
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-md space-y-3 relative">
              <div className="text-xs font-mono font-bold text-sky-700">STEP 03</div>
              <h3 className="text-sm font-bold text-slate-900">XGBoost & Isolation Forest</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evaluates load drop patterns, peer deviation ratios, and communication health to score theft probability.
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-md space-y-3 relative">
              <div className="text-xs font-mono font-bold text-sky-700">STEP 04</div>
              <h3 className="text-sm font-bold text-slate-900">SHAP Explainability</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Outputs exact feature contribution metrics and dispatches prioritized inspection tickets to utility field teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 5: CTA BANNER */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to Explore GridGuard Intelligence?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              Access the live frontend intelligence workspace featuring 1 Feeder, 3 Transformers, and 150 Consumer Endpoints.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 font-mono">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-md text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-sky-600/30"
            >
              <span>Enter Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FOOTER */}
      {/* ------------------------------------------------------------- */}
      <footer className="py-8 bg-white border-t border-slate-200 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-sm">
              <Zap className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 font-sans">GridGuard Utility Intelligence</span>
            <span className="text-slate-400">|</span>
            <span>v2.4 Production Release</span>
          </div>

          <div className="flex items-center gap-6 font-sans text-slate-500">
            <Link href="/dashboard" className="hover:text-slate-900 transition-colors">
              Dashboard
            </Link>
            <Link href="/network" className="hover:text-slate-900 transition-colors">
              Topology Visualizer
            </Link>
            <Link href="/transformers" className="hover:text-slate-900 transition-colors">
              Transformers
            </Link>
            <Link href="/consumers" className="hover:text-slate-900 transition-colors">
              Consumers
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
