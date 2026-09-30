# 💼 Job Application AI Agent

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/madumida7/job-application-AI-AGENT/blob/main/Job_Application_Agent.ipynb)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Groq LPU](https://img.shields.io/badge/Inference-Groq_LPU-orange.svg)](https://groq.com)
[![LangChain](https://img.shields.io/badge/Orchestrator-LangChain-emerald.svg)](https://langchain.com)
[![Gradio](https://img.shields.io/badge/Interface-Gradio_UI-red.svg)](https://gradio.app)

An intelligent agentic system for automated job applications, resume evaluation, market salary compensation calculation, and tailored pitch generation. Powered by **Groq LPU** inference (`openai/gpt-oss-120b`), **LangChain**, **HuggingFace** sentence embeddings, and **FAISS** vector search.

---

## ⚡ Direct 1-Click Execution from GitHub (No Setup Required!)

Click the badge below to run this agent directly inside Google Colab without downloading anything:

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/madumida7/job-application-AI-AGENT/blob/main/Job_Application_Agent.ipynb)

Direct Colab Link: `https://colab.research.google.com/github/madumida7/job-application-AI-AGENT/blob/main/Job_Application_Agent.ipynb`

---

## 🚀 Key Features

1. **RAG Resume Retriever:** Automatically parses resume PDFs with `PyPDFLoader`, splits documents using `RecursiveCharacterTextSplitter`, and performs semantic search over vector embeddings with FAISS.
2. **Groq LPU Speed:** Sub-second inference latency using Groq's high-speed inference engine with model fallbacks.
3. **Budget & Salary Tool:** Dynamic compensation calculator providing 25th percentile, target median, and 90th percentile offer bands, signing bonuses, and tactical negotiation scripts.
4. **Live Job Market Search:** Real-time job listing intelligence powered by the Tavily Search API.
5. **Gradio Web Interface:** Interactive multi-tab web application with public shareable link (`share=True`).

---

## 📦 Repository Structure

```
├── Job_Application_Agent.ipynb  # Primary Google Colab Notebook
├── job_application_agent.py     # Standalone Python script
├── sample_resume.pdf            # Sample applicant resume for RAG testing
├── requirements.txt             # Python package dependencies
└── README.md                    # Project documentation & Colab badge
```

---

## 🛠️ How to Push to GitHub

### Option A: Using Git CLI

```bash
# 1. Initialize git
git init

# 2. Add all project files
git add .

# 3. Create your first commit
git commit -m "feat: initial release of Job Application Agent for Colab"

# 4. Set main branch
git branch -M main

# 5. Add your GitHub remote repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/job-application-agent.git

# 6. Push to GitHub
git push -u origin main
```

### Option B: Using GitHub Web UI (Drag and Drop)
1. Go to [github.com/new](https://github.com/new) and create a repository named `job-application-agent`.
2. Click **"uploading an existing file"**.
3. Drag and drop `Job_Application_Agent.ipynb`, `job_application_agent.py`, `sample_resume.pdf`, `requirements.txt`, and `README.md`.
4. Click **"Commit changes"**.

---

## 🔑 Environment Variables

The agent requires the following API keys (already configured in the notebook):
- `GROQ_API_KEY`: Groq API key for LPU model inference.
- `TAVILY_API_KEY`: Tavily API key for live tech job web queries.

---

## 📄 License
Apache-2.0
