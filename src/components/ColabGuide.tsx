import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  Play, 
  Download, 
  Terminal, 
  FileText, 
  Cpu, 
  Sparkles, 
  ChevronRight,
  ExternalLink,
  Layers,
  Search,
  DollarSign,
  Monitor
} from 'lucide-react';
import { COLAB_STEPS, downloadNotebookFile, downloadPythonFile } from '../data/colabNotebook';
import { downloadResumePdf } from '../data/sampleResume';

export const ColabGuide: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [simulatedStepId, setSimulatedStepId] = useState<string | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const simulateStep = (id: string) => {
    setSimulatedStepId(id);
  };

  const currentStep = COLAB_STEPS[activeStepIndex];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-56 h-56 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Complete Google Colab Pipeline
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Job Application AI Agent for Google Colab
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Step-by-step notebook code pre-configured with your Groq API key and Tavily key. 
              Builds a RAG resume retriever, salary calculator tool, and launches an interactive Gradio web application with a live public URL.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <button
              onClick={() => downloadNotebookFile()}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-orange-500/25 transition hover:scale-[1.02] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download .ipynb File
            </button>
            <button
              onClick={() => downloadPythonFile()}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-sm font-semibold transition cursor-pointer"
            >
              <FileText className="w-4 h-4 text-orange-400" />
              Download .py Script
            </button>
            <button
              onClick={() => downloadResumePdf()}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-900/40 hover:bg-blue-800/40 border border-blue-500/40 text-blue-300 text-sm font-semibold transition cursor-pointer"
              title="Download sample resume PDF"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              Sample PDF
            </button>
          </div>
        </div>

        {/* Quick Tech Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-700/60 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span><strong>Groq:</strong> Llama-3.3-70B LPU</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span><strong>Embeddings:</strong> all-MiniLM-L6-v2</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span><strong>Vector DB:</strong> FAISS Vectorstore</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span><strong>UI:</strong> Gradio (share=True)</span>
          </div>
        </div>
      </div>

      {/* Main Stepper Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step Index Navigation List */}
        <div className="lg:col-span-4 space-y-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-3">
            Pipeline Steps ({COLAB_STEPS.length})
          </h2>
          <div className="space-y-1.5">
            {COLAB_STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex items-start gap-3 ${
                    isActive
                      ? 'bg-slate-800 border-orange-500/80 shadow-md ring-1 ring-orange-500/20'
                      : 'bg-slate-900/60 hover:bg-slate-800/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      isActive
                        ? 'bg-orange-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {step.stepNumber}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-sm font-semibold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                        {step.title}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {step.badge}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-orange-400 translate-x-0.5' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Quick Colab Link Card */}
          <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 font-semibold text-slate-100">
              <ExternalLink className="w-4 h-4 text-orange-400" />
              <span>Ready to run in Colab?</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Open Google Colab, select <strong>Upload</strong>, and upload <code>Job_Application_Agent.ipynb</code>.
            </p>
            <a
              href="https://colab.research.google.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-orange-400 font-semibold border border-orange-500/30 transition text-center"
            >
              Open Google Colab ↗
            </a>
          </div>
        </div>

        {/* Active Step Detailed Viewer */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            {/* Step Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    Step {currentStep.stepNumber} of {COLAB_STEPS.length}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {currentStep.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {currentStep.title}
                </h3>
                <p className="text-sm text-slate-300">
                  {currentStep.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => copyToClipboard(currentStep.code, currentStep.id)}
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {copiedId === currentStep.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Cell</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => simulateStep(currentStep.id)}
                  className="px-3.5 py-2 text-xs font-bold rounded-lg bg-orange-500 hover:bg-orange-600 text-slate-950 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Simulate Run</span>
                </button>
              </div>
            </div>

            {/* Code Block */}
            <div className="relative bg-slate-950 p-4 sm:p-5 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed border-b border-slate-800 max-h-[420px] overflow-y-auto">
              <pre className="whitespace-pre">
                <code>{currentStep.code}</code>
              </pre>
            </div>

            {/* Step Explanation & Simulation Output */}
            <div className="p-5 sm:p-6 bg-slate-900/60 space-y-4">
              <div className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
                <strong className="text-slate-100 font-semibold block mb-1">💡 What this code does:</strong>
                {currentStep.explanation}
              </div>

              {/* Expected Output vs Simulation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-orange-400" />
                    Colab Console Output
                  </span>
                  {simulatedStepId === currentStep.id && (
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                      Simulation Complete (0.34s)
                    </span>
                  )}
                </div>

                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/90 font-mono text-xs text-emerald-400/90 whitespace-pre-wrap leading-relaxed shadow-inner">
                  {currentStep.expectedOutput}
                </div>
              </div>

              {/* Step Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                >
                  ← Previous Step
                </button>
                <span className="text-xs text-slate-500 font-medium">
                  Step {activeStepIndex + 1} of {COLAB_STEPS.length}
                </span>
                <button
                  disabled={activeStepIndex === COLAB_STEPS.length - 1}
                  onClick={() => setActiveStepIndex(prev => Math.min(COLAB_STEPS.length - 1, prev + 1))}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-600 text-slate-950 font-bold transition"
                >
                  Next Step →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
