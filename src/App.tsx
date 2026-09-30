import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { NotebookView } from './components/NotebookView';
import { LivePlayground } from './components/LivePlayground';
import { ColabGuide } from './components/ColabGuide';
import { ColabInstructionsModal } from './components/ColabInstructionsModal';
import { ResumeModal } from './components/ResumeModal';
import { GithubModal } from './components/GithubModal';
import { downloadNotebookFile } from './data/colabNotebook';
import { downloadResumePdf } from './data/sampleResume';
import { 
  Download, 
  ExternalLink, 
  Terminal, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Bot 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'notebook' | 'playground' | 'steps'>('notebook');
  const [isColabModalOpen, setIsColabModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        onOpenColabGuideModal={() => setIsColabModalOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenGithubModal={() => setIsGithubModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'notebook' && (
          <NotebookView onOpenColabInstructions={() => setIsColabModalOpen(true)} />
        )}

        {activeTab === 'playground' && (
          <LivePlayground />
        )}

        {activeTab === 'steps' && (
          <ColabGuide />
        )}
      </main>

      {/* Sticky Bottom Quick Help & Action Bar */}
      <div className="sticky bottom-0 z-30 bg-slate-900/90 backdrop-blur border-t border-slate-800 py-3 px-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              <strong>Job Application Agent</strong> • Ready for Google Colab with Groq & Tavily
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Preview Resume</span>
            </button>

            <button
              onClick={() => setIsColabModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-orange-400 border border-orange-500/30 transition flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>How to Run in Colab</span>
            </button>

            <button
              onClick={() => downloadNotebookFile()}
              className="px-4 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-orange-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .ipynb</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ColabInstructionsModal
        isOpen={isColabModalOpen}
        onClose={() => setIsColabModalOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      <GithubModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
      />
    </div>
  );
}
