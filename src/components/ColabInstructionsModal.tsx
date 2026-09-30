import React from 'react';
import { X, ExternalLink, Download, Play, CheckCircle2, Terminal, ArrowRight, Sparkles, FileText } from 'lucide-react';
import { downloadNotebookFile } from '../data/colabNotebook';
import { downloadResumePdf } from '../data/sampleResume';

interface ColabInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ColabInstructionsModal: React.FC<ColabInstructionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Colab Execution Guide
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              How to View & Run in Google Colab
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Follow these simple steps to load the generated code and launch your live agent in Google Colab.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Step Walkthrough */}
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-sm">
              1
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="text-sm font-bold text-white flex items-center justify-between">
                <span>Download the Notebook (.ipynb)</span>
                <span className="text-[11px] font-normal text-slate-400">Pre-configured with keys</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Click the download button below to save <code>Job_Application_Agent.ipynb</code> to your computer.
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => downloadNotebookFile()}
                  className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Job_Application_Agent.ipynb
                </button>
                <button
                  onClick={() => downloadResumePdf()}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 border border-slate-700 transition cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  Download sample_resume.pdf
                </button>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-sm">
              2
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="text-sm font-bold text-white">
                Open Google Colab & Upload
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Go to <a href="https://colab.research.google.com" target="_blank" rel="noreferrer" className="text-orange-400 underline font-semibold">colab.research.google.com</a>. In the popup dialog, click the <strong>Upload</strong> tab, then choose or drag-and-drop the <code>Job_Application_Agent.ipynb</code> file you just downloaded.
              </p>
              <a
                href="https://colab.research.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 font-semibold"
              >
                Go to Google Colab <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-sm">
              3
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="text-sm font-bold text-white">
                Run All Cells
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                In Google Colab's top menu, click <strong>Runtime → Run all</strong> (or press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 font-mono text-[11px]">Ctrl+F9</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 font-mono text-[11px]">Cmd+F9</kbd>).
              </p>
              <ul className="text-xs text-slate-400 space-y-1 pl-2">
                <li>• Cell 1 installs dependencies (~45 seconds)</li>
                <li>• Cell 2 automatically generates <code>sample_resume.pdf</code> inside Colab</li>
                <li>• Cell 3 & 4 connect and test your Groq key</li>
                <li>• Cell 5 builds the RAG FAISS vector store</li>
                <li>• Cell 6 & 7 initialize your LangChain tools and agent</li>
                <li>• Cell 8 launches the Gradio web UI</li>
              </ul>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-sm">
              4
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>View Live Gradio Web App & Output</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                  share=True
                </span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                At the bottom of the last cell output, Colab will print:
              </p>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-400">
                Running on public URL: https://b7d23a104f.gradio.live
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Click that <code>gradio.live</code> link! It opens your fully functional Job Application Agent in a clean web tab where you can chat, search resumes with RAG, and compute salary packages!
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-4 border-t border-slate-800 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
          >
            Close
          </button>
          <button
            onClick={() => {
              downloadNotebookFile();
              window.open('https://colab.research.google.com', '_blank');
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
          >
            <span>Download & Open Colab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
