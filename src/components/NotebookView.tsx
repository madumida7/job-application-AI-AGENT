import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  Play, 
  ExternalLink, 
  Terminal, 
  FileCode2, 
  Sparkles,
  BookOpen,
  Info
} from 'lucide-react';
import { COLAB_STEPS, USER_GROQ_KEY, USER_TAVILY_KEY, downloadNotebookFile, downloadPythonFile } from '../data/colabNotebook';
import { downloadResumePdf } from '../data/sampleResume';

export const NotebookView: React.FC<{ onOpenColabInstructions: () => void }> = ({ onOpenColabInstructions }) => {
  const [copiedCellId, setCopiedCellId] = useState<string | null>(null);
  const [executedCells, setExecutedCells] = useState<Record<string, boolean>>({});

  const handleCopyCell = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCellId(id);
    setTimeout(() => setCopiedCellId(null), 2000);
  };

  const handleRunCell = (id: string) => {
    setExecutedCells(prev => ({ ...prev, [id]: true }));
  };

  const handleRunAll = () => {
    const all: Record<string, boolean> = {};
    COLAB_STEPS.forEach(s => {
      all[s.id] = true;
    });
    setExecutedCells(all);
  };

  return (
    <div className="space-y-6">
      {/* Colab Notebook Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
            <FileCode2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white">
                Job_Application_Agent.ipynb
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                Python 3 (Colab Kernel)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive Jupyter Notebook ready to upload to Google Colab
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleRunAll}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current text-orange-400" />
            <span>Simulate Run All</span>
          </button>

          <button
            onClick={onOpenColabInstructions}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-orange-400 text-xs font-semibold border border-orange-500/30 transition flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Colab Guide</span>
          </button>

          <button
            onClick={() => downloadNotebookFile()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-orange-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .ipynb</span>
          </button>
        </div>
      </div>

      {/* Quick notice banner with user's keys info */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-orange-400 shrink-0" />
          <span>
            Pre-configured with your keys: <strong>Groq</strong> (<code className="text-orange-400 font-mono">gsk_C3...</code>) and <strong>Tavily</strong> (<code className="text-blue-400 font-mono">tvly-dev...</code>).
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => downloadResumePdf()}
            className="text-xs text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3 h-3" /> Get sample_resume.pdf
          </button>
        </div>
      </div>

      {/* Jupyter Notebook Cells */}
      <div className="space-y-5">
        {/* Cell 0: Markdown Intro */}
        <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-5 sm:p-6 space-y-3 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800/60 font-mono">
            <span>[Markdown Cell]</span>
            <span className="text-[11px] text-slate-400">Documentation</span>
          </div>
          <div className="prose prose-invert max-w-none text-slate-200 text-xs sm:text-sm space-y-2">
            <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
              💼 Job Application AI Agent
            </h1>
            <p className="text-slate-300">
              This notebook builds an end-to-end Job Application Agent using Groq LPU inference, LangChain, HuggingFace embeddings, and FAISS vector search, wrapped in a live Gradio web application with <code className="text-orange-400">share=True</code>.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                <strong className="text-white block">1. PDF & RAG</strong>
                PyPDFLoader + FAISS
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                <strong className="text-white block">2. Groq LLM</strong>
                llama-3.3-70b-versatile
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                <strong className="text-white block">3. Tools</strong>
                RAG + Budget + Tavily
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                <strong className="text-white block">4. Gradio UI</strong>
                Interactive web app
              </div>
            </div>
          </div>
        </div>

        {/* Code Cells */}
        {COLAB_STEPS.map((step, idx) => {
          const isExecuted = executedCells[step.id] ?? false;

          return (
            <div
              key={step.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg transition-all"
            >
              {/* Cell Header */}
              <div className="p-3.5 sm:p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <button
                    onClick={() => handleRunCell(step.id)}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition cursor-pointer"
                    title="Run Cell"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                  <span className="text-slate-400 font-semibold">
                    [{isExecuted ? idx + 1 : ' '}]
                  </span>
                  <span className="font-bold text-slate-200">
                    Step {step.stepNumber}: {step.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCell(step.code, step.id)}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCellId === step.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Editor Body */}
              <div className="bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed max-h-[360px] overflow-y-auto">
                <pre className="whitespace-pre">
                  <code>{step.code}</code>
                </pre>
              </div>

              {/* Cell Output (Visible when executed or by default showing expected) */}
              <div className="p-4 bg-slate-950/70 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Terminal className="w-3 h-3 text-orange-400" />
                    Console Output
                  </span>
                  {isExecuted && (
                    <span className="text-emerald-400 font-semibold">
                      Executed in Colab kernel
                    </span>
                  )}
                </div>
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-xs text-emerald-400/90 whitespace-pre-wrap leading-relaxed shadow-inner">
                  {step.expectedOutput}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
