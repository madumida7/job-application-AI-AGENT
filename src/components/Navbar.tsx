import React from 'react';
import { Download, FileText, ExternalLink, Terminal, ShieldCheck, Sparkles, Github } from 'lucide-react';
import { downloadNotebookFile, downloadPythonFile } from '../data/colabNotebook';
import { downloadResumePdf } from '../data/sampleResume';

interface NavbarProps {
  onOpenColabGuideModal: () => void;
  onOpenResumeModal: () => void;
  onOpenGithubModal: () => void;
  activeTab: 'notebook' | 'playground' | 'steps';
  setActiveTab: (tab: 'notebook' | 'playground' | 'steps') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenColabGuideModal,
  onOpenResumeModal,
  onOpenGithubModal,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Terminal className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-slate-100 tracking-tight">
                  Job Application Agent
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Colab Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">Groq • LangChain • HuggingFace • FAISS • Gradio</p>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="hidden md:flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab('notebook')}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'notebook'
                  ? 'bg-orange-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Colab Notebook (.ipynb)
            </button>
            <button
              onClick={() => setActiveTab('playground')}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'playground'
                  ? 'bg-orange-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Live Agent Sandbox
            </button>
            <button
              onClick={() => setActiveTab('steps')}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'steps'
                  ? 'bg-orange-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Step-by-Step Guide
            </button>
          </div>

          {/* Quick Action Downloads & GitHub Launcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onOpenGithubModal}
              className="text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-emerald-500/40 hover:border-emerald-500/60 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 transition font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Push to GitHub & Run directly from GitHub in Colab"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Push / Run in GitHub</span>
            </button>

            <button
              onClick={onOpenColabGuideModal}
              className="hidden sm:flex text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800/70 hover:bg-slate-800 text-slate-200 transition font-medium items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
              <span>Colab Guide</span>
            </button>

            <button
              onClick={() => downloadNotebookFile()}
              className="text-xs sm:text-sm px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold transition shadow-md shadow-orange-500/20 flex items-center gap-1.5 cursor-pointer"
              title="Download Job_Application_Agent.ipynb to open directly in Colab"
            >
              <Download className="w-4 h-4" />
              <span>Download .ipynb</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
