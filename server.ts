import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '15mb' }));

  // API Proxy for Groq
  app.post('/api/groq/chat', async (req, res) => {
    try {
      const apiKey = req.body.apiKey || process.env.GROQ_API_KEY || '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';
      let requestedModel = req.body.model || 'openai/gpt-oss-120b';
      // Correct common typo: 120h -> 120b
      if (requestedModel.includes('gpt-oss-120h')) {
        requestedModel = 'openai/gpt-oss-120b';
      }

      const candidateModels = [requestedModel, 'openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b'];
      const uniqueModels = [...new Set(candidateModels)];

      const messages = req.body.messages || [];
      const temperature = req.body.temperature ?? 0.3;
      const max_tokens = req.body.max_tokens || 1024;

      let lastErrorData: any = null;

      for (const model of uniqueModels) {
        try {
          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model,
              messages,
              temperature,
              max_tokens
            })
          });

          const data = await response.json();
          if (response.ok) {
            return res.json(data);
          }
          lastErrorData = data;
        } catch (e: any) {
          lastErrorData = { error: e.message };
        }
      }

      return res.status(400).json(lastErrorData || { error: 'Failed to query Groq model' });
    } catch (error: any) {
      console.error('Groq proxy error:', error);
      return res.status(500).json({ error: error.message || 'Internal server error calling Groq' });
    }
  });

  // Get available models on Groq
  app.get('/api/groq/models', async (req, res) => {
    try {
      const apiKey = req.query.apiKey as string || process.env.GROQ_API_KEY || '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';
      const response = await fetch('https://api.groq.com/openai/v1/models', {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      const data = await response.json();
      return res.json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  });

  // API Proxy for Tavily
  app.post('/api/tavily/search', async (req, res) => {
    try {
      const apiKey = req.body.apiKey || process.env.TAVILY_API_KEY || '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';
      const query = req.body.query || '';

      const response = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          api_key: apiKey,
          query,
          search_depth: 'basic',
          max_results: 5
        })
      });

      const data = await response.json();
      if (!response.ok) {
        return res.status(response.status).json(data);
      }
      return res.json(data);
    } catch (error: any) {
      console.error('Tavily proxy error:', error);
      return res.status(500).json({ error: error.message || 'Internal server error calling Tavily' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Mount Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
