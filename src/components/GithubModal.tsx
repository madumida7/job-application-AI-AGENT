import React, { useState } from 'react';
import { 
  X, 
  Github, 
  ExternalLink, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Terminal, 
  Play, 
  FileCode, 
  FolderGit2, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  ArrowRight,
  Archive
} from 'lucide-react';
import { downloadNotebookFile, downloadPythonFile, downloadZipPackage } from '../data/colabNotebook';
import { downloadResumePdf } from '../data/sampleResume';

interface GithubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GithubModal: React.FC<GithubModalProps> = ({ isOpen, onClose }) => {
  const [githubUser, setGithubUser] = useState('25mca029-grd');
  const [repoName, setRepoName] = useState('job-application-agent');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activePushTab, setActivePushTab] = useState<'colab-direct' | 'web-upload' | 'cli-fix'>('colab-direct');

  if (!isOpen) return null;

  const colabDirectUrl = `https://colab.research.google.com/github/${githubUser}/${repoName}/blob/main/Job_Application_Agent.ipynb`;
  const markdownBadge = `[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](${colabDirectUrl})`;

  const gitCliFixCommands = `# If git says "rejected / remote contains work":
git pull origin main --rebase
git push -u origin main

# OR force push if you want this local code to overwrite the empty GitHub repo:
git push -u origin main --force`;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <FolderGit2 className="w-3.5 h-3.5" /> Direct GitHub Execution & Push
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Github className="w-6 h-6 text-white" />
              Fix "Not Pushing / Try Again" & Run from GitHub
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Here is why Git says "try again not pushing" and the <strong>3 guaranteed ways</strong> to push and run directly from GitHub without errors.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Why it says "try again not pushing" diagnostic alert */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed">
            <strong className="text-white block font-semibold">Why is Git saying "try again / not pushing"?</strong>
            <p>
              This happens for one of 2 reasons:
            </p>
            <ul className="list-disc list-inside space-y-0.5 text-amber-200/90 pl-1">
              <li><strong>GitHub Password Deprecation:</strong> GitHub no longer accepts normal account passwords in the terminal. You must use a Personal Access Token (PAT).</li>
              <li><strong>Conflict with Initial Commit:</strong> If you checked "Add README" when creating the GitHub repo, GitHub rejects local pushes until you force-push or rebase.</li>
            </ul>
            <p className="pt-1 text-emerald-300 font-semibold">
              👉 Choose <strong>Method 1 (Google Colab 1-Click)</strong> or <strong>Method 2 (Web Upload)</strong> below to push in 10 seconds without any terminal errors!
            </p>
          </div>
        </div>

        {/* Push Method Tabs */}
        <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1.5 text-xs">
          <button
            onClick={() => setActivePushTab('colab-direct')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activePushTab === 'colab-direct'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Method 1: Direct from Colab (Easiest)</span>
          </button>

          <button
            onClick={() => setActivePushTab('web-upload')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activePushTab === 'web-upload'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Method 2: Web Drag & Drop (ZIP)</span>
          </button>

          <button
            onClick={() => setActivePushTab('cli-fix')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activePushTab === 'cli-fix'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Method 3: Fix Git CLI Push</span>
          </button>
        </div>

        {/* TAB 1: PUSH DIRECTLY FROM GOOGLE COLAB */}
        {activePushTab === 'colab-direct' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Push to GitHub Directly from Inside Google Colab (Zero Terminal)
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                1-Click Official Feature
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Google Colab has a built-in "Save to GitHub" button that authorizes via your browser and pushes directly without typing any git commands!
            </p>

            <ol className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2.5 bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <strong>Open your notebook in Google Colab</strong> (or upload <code>Job_Application_Agent.ipynb</code> at <a href="https://colab.research.google.com" target="_blank" rel="noreferrer" className="text-orange-400 underline font-semibold">colab.research.google.com</a>).
                </div>
              </li>

              <li className="flex items-start gap-2.5 bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  In Colab's top menu, click <strong>File</strong> → <strong>Save a copy in GitHub</strong>.
                </div>
              </li>

              <li className="flex items-start gap-2.5 bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  A popup will ask you to authorize Google Colab with GitHub. Click <strong>Authorize</strong>.
                </div>
              </li>

              <li className="flex items-start gap-2.5 bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs">4</span>
                <div>
                  Select your repository (e.g. <code>{repoName}</code>) and click <strong>OK</strong>! Colab automatically commits the notebook and adds the "Open in Colab" badge for you!
                </div>
              </li>
            </ol>

            <div className="pt-2 flex justify-end">
              <a
                href="https://colab.research.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition"
              >
                <span>Open Google Colab ↗</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* TAB 2: WEB DRAG AND DROP (ZIP) */}
        {activePushTab === 'web-upload' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Archive className="w-4 h-4 text-emerald-400" />
                Download Complete Project ZIP & Upload via GitHub Web
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                No Git CLI, no tokens, no terminal passwords. 100% success rate.
              </p>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-white">Download All Repository Files</h4>
                  <p className="text-[11px] text-slate-400">
                    Includes: <code>Job_Application_Agent.ipynb</code>, <code>job_application_agent.py</code>, <code>sample_resume.pdf</code>, <code>requirements.txt</code>, and <code>README.md</code> with Colab badge.
                  </p>
                </div>
                <button
                  onClick={() => downloadZipPackage()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download job-application-agent.zip</span>
                </button>
              </div>
            </div>

            <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
              <li>Download the ZIP above and extract the files on your computer.</li>
              <li>Go to <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-emerald-400 underline font-semibold">github.com/new</a> and create your repository.</li>
              <li>Click <strong>"uploading an existing file"</strong> (or click <strong>Add file → Upload files</strong>).</li>
              <li>Drag and drop the extracted files into the box.</li>
              <li>Click the green <strong>"Commit changes"</strong> button. Your project is now on GitHub!</li>
            </ol>
          </div>
        )}

        {/* TAB 3: FIX GIT CLI PUSH */}
        {activePushTab === 'cli-fix' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-orange-400" />
                Terminal Fix: Force Push or Rebase
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                If Git CLI says <code>Updates were rejected because the remote contains work</code>:
              </p>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Fix rejected push command:</span>
                <button
                  onClick={() => copyToClipboard(gitCliFixCommands, 'fix-cli')}
                  className="hover:text-emerald-400 flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === 'fix-cli' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === 'fix-cli' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="whitespace-pre overflow-x-auto text-emerald-400">
                <code>{gitCliFixCommands}</code>
              </pre>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
              <strong className="text-white block font-semibold">If Git asks for Username and Password:</strong>
              <p className="text-slate-400 leading-relaxed">
                GitHub <strong>does not accept your account password</strong> in the terminal! You must create a Personal Access Token:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-slate-300 pl-1">
                <li>Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer" className="text-orange-400 underline">github.com/settings/tokens</a>.</li>
                <li>Click <strong>Generate new token (classic)</strong>.</li>
                <li>Check the <code className="text-emerald-400 font-mono">repo</code> scope checkbox and click Generate.</li>
                <li>Copy the token (starts with <code className="text-emerald-400 font-mono">ghp_...</code>) and paste it when git prompts for your password!</li>
              </ol>
            </div>
          </div>
        )}

        {/* Colab Direct Link & Badge Generator Section */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-emerald-400 fill-current" />
              Your Direct Colab Link (Once Pushed to GitHub)
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">GitHub Username</label>
              <input
                type="text"
                value={githubUser}
                onChange={e => setGithubUser(e.target.value.trim())}
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Repo Name</label>
              <input
                type="text"
                value={repoName}
                onChange={e => setRepoName(e.target.value.trim())}
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 font-mono"
              />
            </div>
          </div>

          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center justify-between gap-2">
            <span className="truncate">{colabDirectUrl}</span>
            <button
              onClick={() => copyToClipboard(colabDirectUrl, 'direct-run-url')}
              className="text-slate-300 hover:text-white shrink-0 cursor-pointer"
            >
              {copiedId === 'direct-run-url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <button
            onClick={() => downloadZipPackage()}
            className="text-xs text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
          >
            <Download className="w-3.5 h-3.5" /> Download Project ZIP
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
