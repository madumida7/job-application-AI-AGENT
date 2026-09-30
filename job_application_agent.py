"""
Job Application Agent - Standalone Python Script
Run in Google Colab or local Python environment.
"""

import os
import groq
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from langchain_community.document_loaders import PyPDFLoader
try:
    from langchain_text_splitters import RecursiveCharacterTextSplitter
except ImportError:
    from langchain.text_splitter import RecursiveCharacterTextSplitter

try:
    from langchain_huggingface import HuggingFaceEmbeddings
except ImportError:
    from langchain_community.embeddings import HuggingFaceEmbeddings

from langchain_community.vectorstores import FAISS
from langchain_groq import ChatGroq
from langchain.tools import tool
from tavily import TavilyClient
import gradio as gr

# API Keys Configuration
os.environ["GROQ_API_KEY"] = "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"
os.environ["TAVILY_API_KEY"] = "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"

print("1. Generating sample resume PDF...")
pdf_filename = "sample_resume.pdf"
c = canvas.Canvas(pdf_filename, pagesize=letter)
c.setFont("Helvetica-Bold", 16)
c.drawString(50, 750, "Alexander Chen - Senior Full Stack & AI Engineer")
c.setFont("Helvetica", 10)
c.drawString(50, 735, "Email: alex.chen@example.com | Phone: (555) 234-5678 | San Francisco, CA")
c.line(50, 725, 550, 725)
c.setFont("Helvetica-Bold", 12)
c.drawString(50, 705, "PROFESSIONAL SUMMARY")
c.setFont("Helvetica", 10)
c.drawString(50, 690, "Senior Full Stack & AI Engineer with 6+ years experience in Python, LangChain, Groq,")
c.drawString(50, 675, "React, TypeScript, Vector Databases (FAISS), and high-throughput cloud microservices.")
c.setFont("Helvetica-Bold", 12)
c.drawString(50, 650, "TECHNICAL SKILLS")
c.setFont("Helvetica", 10)
c.drawString(50, 635, "- Languages & Frameworks: Python, TypeScript, React, Next.js, FastAPI, Node.js")
c.drawString(50, 620, "- AI & RAG: LangChain, Groq API, HuggingFace, FAISS, Vector Search, Prompt Engineering")
c.drawString(50, 605, "- Databases & Cloud: PostgreSQL, Redis, Docker, AWS, GCP, CI/CD pipelines")
c.setFont("Helvetica-Bold", 12)
c.drawString(50, 580, "EXPERIENCE")
c.setFont("Helvetica-Bold", 11)
c.drawString(50, 565, "Senior Full Stack & AI Engineer - InnovateAI Labs (2022 - Present)")
c.setFont("Helvetica", 10)
c.drawString(50, 550, "- Architected enterprise LangChain + Groq RAG pipeline, cutting document query time by 80%.")
c.drawString(50, 535, "- Led front-end and back-end integration in React and FastAPI serving 2M+ active users.")
c.drawString(50, 520, "- Boosted vector retrieval precision from 72% to 94.6% using hybrid chunking strategies.")
c.setFont("Helvetica-Bold", 11)
c.drawString(50, 495, "Software Engineer - CloudScale Systems (2019 - 2022)")
c.setFont("Helvetica", 10)
c.drawString(50, 480, "- Built microservices handling 30,000+ requests/min in Python and PostgreSQL.")
c.drawString(50, 465, "- Reduced p95 response time by 120ms with Redis caching and query indexing.")
c.setFont("Helvetica-Bold", 12)
c.drawString(50, 440, "EDUCATION")
c.setFont("Helvetica", 10)
c.drawString(50, 425, "B.S. in Computer Science - University of California, Berkeley (2015 - 2019)")
c.save()
print("   Created:", pdf_filename)

print("2. Initializing RAG Pipeline (PyPDFLoader + RecursiveCharacterTextSplitter + HuggingFace + FAISS)...")
loader = PyPDFLoader(pdf_filename)
documents = loader.load()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=60)
chunks = text_splitter.split_documents(documents)
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vector_db = FAISS.from_documents(chunks, embeddings)
retriever = vector_db.as_retriever(search_kwargs={"k": 2})
print("   RAG Pipeline initialized with", len(chunks), "chunks")

print("3. Connecting LangChain to Groq (openai/gpt-oss-120b)...")
llm = ChatGroq(
    model_name="openai/gpt-oss-120b",
    groq_api_key=os.environ["GROQ_API_KEY"],
    temperature=0.3
)
tavily_client = TavilyClient(api_key=os.environ["TAVILY_API_KEY"])

def query_resume_data(query: str) -> str:
    results = retriever.invoke(query)
    if not results:
        return "No relevant resume data found."
    return "\n---\n".join([doc.page_content for doc in results])

@tool
def resume_rag_tool(query: str) -> str:
    """Searches the candidate resume PDF for skills, past roles, achievements, and education."""
    return query_resume_data(query)

def calculate_compensation_report(role_title: str, experience_years: float, location: str = "Remote") -> str:
    exp = float(experience_years)
    base = 125000 * (1 + (exp * 0.075))
    min_sal = round(base * 0.90, -3)
    target_sal = round(base, -3)
    max_sal = round(base * 1.15, -3)
    sign_bonus = round(base * 0.08, -3)
    return f"""
COMPENSATION & BUDGET ANALYSIS:
• Role: {role_title} ({exp} yrs exp | {location})
• Base Salary Range: ${int(min_sal):,} - ${int(max_sal):,} USD
• Recommended Target Offer: ${int(target_sal):,} USD
• Suggested Signing Bonus: ${int(sign_bonus):,} USD
"""

@tool
def budget_and_salary_tool(role_title: str, experience_years: float, location: str = "Remote") -> str:
    """Calculates salary budget, target offer, and negotiation range."""
    return calculate_compensation_report(role_title, experience_years, location)

def search_live_market(query: str) -> str:
    try:
        res = tavily_client.search(query=query + " hiring tech roles", max_results=3)
        return "\n".join([f"• {r['title']}: {r['content'][:150]}..." for r in res.get("results", [])])
    except Exception as e:
        return f"Market search notice: {e}"

@tool
def live_job_market_tool(query: str) -> str:
    """Searches live job listings with Tavily."""
    return search_live_market(query)

def run_job_application_agent(user_message: str, history=None) -> str:
    user_lower = str(user_message).lower()
    if any(k in user_lower for k in ["salary", "budget", "compensation", "pay", "offer"]):
        budget_data = calculate_compensation_report("Senior AI & Full Stack Engineer", 6.0, "Remote")
        prompt = f"System: You are an expert Job Application Agent.\nBudget Data: {budget_data}\nUser: {user_message}"
        return llm.invoke(prompt).content
    
    resume_data = query_resume_data(user_message)
    prompt = f"System: You are the Job Application Agent with verified resume data.\nResume: {resume_data}\nUser: {user_message}"
    return llm.invoke(prompt).content

print("4. Starting Gradio Interface...")
with gr.Blocks(theme=gr.themes.Soft(), title="Job Application Agent") as demo:
    gr.Markdown("# 💼 Job Application AI Agent\n### Built with Groq (openai/gpt-oss-120b), LangChain & FAISS")
    with gr.Tab("💬 Job Agent Chat"):
        gr.ChatInterface(
            fn=lambda m, h: run_job_application_agent(m.get("text", "") if isinstance(m, dict) else str(m), h),
            examples=[
                "Write a tailored cover letter for a Senior AI & Full Stack role.",
                "What are my key skills and achievements from the resume?",
                "What is my target salary range for 6 years experience?"
            ]
        )
    with gr.Tab("💰 Budget Tool"):
        role_in = gr.Textbox(value="Senior Full Stack & AI Engineer", label="Role Title")
        exp_in = gr.Slider(0, 20, value=6, label="Experience (Years)")
        calc_btn = gr.Button("Calculate", variant="primary")
        out_b = gr.Textbox(label="Budget Report")
        calc_btn.click(fn=lambda r, e: calculate_compensation_report(r, float(e)), inputs=[role_in, exp_in], outputs=out_b)

if __name__ == "__main__":
    demo.launch(share=True)
