import { jsPDF } from 'jspdf';

export const SAMPLE_RESUME_TEXT = `
ALEXANDER CHEN
San Francisco, CA | alex.chen@example.com | (555) 234-5678 | linkedin.com/in/alexchen-dev | github.com/alexchen-tech

PROFESSIONAL SUMMARY
Results-driven Senior Full Stack & AI Engineer with 6+ years of experience designing scalable distributed web applications and production AI systems. Proven expertise in React, TypeScript, Python, FastAPI, LangChain, Groq, vector databases, and cloud microservices. Led architectural migration reducing latency by 45% and built intelligent search systems serving 2M+ monthly active users.

TECHNICAL SKILLS
- Programming Languages: Python, TypeScript, JavaScript, SQL, Go
- Frontend Frameworks: React, Next.js, Tailwind CSS, Vite, Redux Toolkit
- Backend & AI Frameworks: FastAPI, Node.js, Express, LangChain, LlamaIndex, Groq API, HuggingFace, PyTorch
- Databases & Vector Stores: PostgreSQL, MongoDB, Redis, FAISS, ChromaDB, Pinecone
- DevOps & Cloud: Docker, Kubernetes, AWS (ECS, Lambda, S3), Google Cloud Platform, GitHub Actions CI/CD
- Concepts: Retrieval-Augmented Generation (RAG), Agentic Workflows, RESTful APIs, Microservices, System Design

PROFESSIONAL EXPERIENCE

Senior Full Stack & AI Engineer | InnovateAI Labs | San Francisco, CA
March 2022 - Present
- Architected enterprise RAG pipeline utilizing LangChain, Groq LLMs, and FAISS vector database, decreasing document analysis turnaround time from 20 minutes to 3.5 seconds.
- Designed and built high-performance responsive web interfaces in React and TypeScript with 99.9% uptime.
- Spearheaded prompt engineering and automated evaluation framework, raising retrieval accuracy from 72% to 94.6%.
- Mentored a team of 7 engineers, established automated CI/CD pipelines, and conducted architecture review sessions.

Software Engineer | CloudScale Systems | Austin, TX
July 2019 - February 2022
- Developed distributed microservices using Python FastAPI and PostgreSQL handling 30,000+ requests per minute.
- Integrated third-party search and NLP APIs, reducing search drop-off by 30%.
- Implemented automated end-to-end testing with Jest and PyTest, elevating code coverage to 92%.
- Optimized database queries and Redis cache layers, cutting p95 response latency by 120ms.

PROJECTS
- Autonomous Job Matching Agent: LangChain agent leveraging Groq and Tavily APIs to match candidates to relevant tech positions and formulate personalized pitch letters.
- Neural Doc Search: Production open-source RAG search engine with multi-modal embeddings and hybrid sparse-dense retrieval (1.4k GitHub stars).
- DevSprint Collaborative Workspace: Real-time collaborative kanban and code review suite built with React and WebSockets.

EDUCATION & CERTIFICATIONS
- Bachelor of Science in Computer Science | University of California, Berkeley (2015 - 2019)
- AWS Certified Solutions Architect - Associate
- DeepLearning.AI Generative AI with LLMs Certification
`;

export function generateResumePdfBlob(): Blob {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = 45;

  // Header Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(26, 32, 44);
  doc.text('ALEXANDER CHEN', margin, y);

  y += 18;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(74, 85, 104);
  doc.text('San Francisco, CA  |  alex.chen@example.com  |  (555) 234-5678  |  github.com/alexchen-tech', margin, y);

  y += 12;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(1);
  doc.line(margin, y, margin + contentWidth, y);
  y += 16;

  // Section Helper
  const addSectionTitle = (title: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(30, 58, 138); // Dark blue
    doc.text(title.toUpperCase(), margin, y);
    y += 4;
    doc.setDrawColor(191, 219, 254);
    doc.setLineWidth(0.75);
    doc.line(margin, y, margin + contentWidth, y);
    y += 12;
  };

  // Summary
  addSectionTitle('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const summaryLines = doc.splitTextToSize(
    'Results-driven Senior Full Stack & AI Engineer with 6+ years experience building scalable web applications and enterprise AI systems with React, Python, LangChain, Groq, and FAISS. Led architectural initiatives serving 2M+ users.',
    contentWidth
  );
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 11 + 8;

  // Technical Skills
  addSectionTitle('Technical Skills');
  const skills = [
    'Languages & AI: Python, TypeScript, SQL, LangChain, Groq, HuggingFace, FAISS, Vector DBs',
    'Frontend & Backend: React, Vite, Next.js, FastAPI, Node.js, Express, Tailwind CSS',
    'Cloud & Systems: PostgreSQL, Docker, AWS, GCP, Redis, Git, CI/CD, RAG Workflows'
  ];
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  skills.forEach(skill => {
    doc.text(`• ${skill}`, margin + 5, y);
    y += 11;
  });
  y += 6;

  // Experience
  addSectionTitle('Professional Experience');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Senior Full Stack & AI Engineer | InnovateAI Labs', margin, y);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('San Francisco, CA | 2022 - Present', margin + contentWidth - 140, y);
  y += 12;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const exp1Bullets = [
    'Architected enterprise RAG pipeline utilizing LangChain, Groq LLMs, and FAISS, cutting document analysis latency from 20m to 3.5s.',
    'Engineered high-performance web applications using React & TypeScript, boosting user engagement by 35%.',
    'Spearheaded automated prompt evaluation pipelines, increasing retrieval accuracy from 72% to 94.6%.'
  ];
  exp1Bullets.forEach(b => {
    const lines = doc.splitTextToSize(`• ${b}`, contentWidth - 10);
    doc.text(lines, margin + 5, y);
    y += lines.length * 10 + 2;
  });
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Software Engineer | CloudScale Systems', margin, y);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Austin, TX | 2019 - 2022', margin + contentWidth - 110, y);
  y += 12;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const exp2Bullets = [
    'Built distributed microservices in Python FastAPI and PostgreSQL processing 30,000+ RPM.',
    'Integrated search and NLP indexing, reducing search bounce rate by 30%.',
    'Maintained 92% unit and integration test coverage across core API services.'
  ];
  exp2Bullets.forEach(b => {
    const lines = doc.splitTextToSize(`• ${b}`, contentWidth - 10);
    doc.text(lines, margin + 5, y);
    y += lines.length * 10 + 2;
  });
  y += 6;

  // Projects
  addSectionTitle('Key Projects');
  const projects = [
    'Autonomous Job Matching Agent: LangChain + Groq RAG tool matching job specs to candidate strengths.',
    'Neural Doc Search: Open source vector search system with hybrid retrieval (1.4k GitHub stars).'
  ];
  projects.forEach(p => {
    const lines = doc.splitTextToSize(`• ${p}`, contentWidth - 10);
    doc.text(lines, margin + 5, y);
    y += lines.length * 10 + 2;
  });
  y += 6;

  // Education
  addSectionTitle('Education & Certifications');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('B.S. in Computer Science - University of California, Berkeley (2015 - 2019)', margin + 5, y);
  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.text('Certifications: AWS Solutions Architect Associate, DeepLearning.AI Generative AI with LLMs', margin + 5, y);

  return doc.output('blob');
}

export function downloadResumePdf(filename = 'sample_resume.pdf') {
  const blob = generateResumePdfBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
