# 🤖 Digital Twin MCP Server

> An intelligent AI-powered digital twin assistant using Retrieval-Augmented Generation (RAG) to answer questions about professional profiles.

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![MCP Server](https://img.shields.io/badge/MCP-Server-green)](https://modelcontextprotocol.io/)
[![Upstash Vector](https://img.shields.io/badge/Upstash-Vector-red)](https://upstash.com/docs/vector/)

## 📋 Overview

This project implements a **Model Context Protocol (MCP) server** that acts as a digital twin assistant for professional profiles. It leverages **Retrieval-Augmented Generation (RAG)** to provide accurate, context-aware responses about a person's experience, skills, projects, and qualifications.

### Key Features

- 🔍 **Semantic Search**: Vector-based retrieval using Upstash Vector for accurate information retrieval
- 🧠 **RAG Architecture**: Combines retrieval with LLM generation for grounded responses
- 🎯 **Job Matching**: Analyzes job postings and matches qualifications
- 💬 **Interactive Interview**: Simulates technical interview scenarios
- 🌐 **Dual Interface**: Works as both an MCP server (for VS Code/Claude Desktop) and a web UI

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User Query                                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              MCP Server / Web UI                             │
│  (Next.js 15 + TypeScript)                                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│            Vector Search (Upstash)                           │
│  • Semantic search with metadata                            │
│  • Top-K retrieval (k=3)                                    │
│  • Context filtering                                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│          LLM Generation (Groq/Llama)                         │
│  • Context-aware response                                   │
│  • Grounded in retrieved data                               │
│  • Professional tone                                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   Response                                   │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Technology Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15.5.3 |
| **Language** | TypeScript (strict mode) |
| **Vector DB** | Upstash Vector |
| **LLM** | Groq API (Llama 3.3 70B) |
| **UI** | ShadCN UI + Tailwind CSS |
| **Protocol** | Model Context Protocol (MCP) |
| **Hosting** | Vercel (production ready) |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm package manager
- Python 3.8+ (for scripts)
- Upstash Vector account
- Groq API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/digital-twin-mcp-portfolio.git
   cd digital-twin-mcp-portfolio
   ```

2. **Install dependencies**
   ```bash
   cd mcp-server
   pnpm install
   ```

3. **Set up environment variables**
   
   Create `.env.local` in the `mcp-server` directory:
   ```env
   UPSTASH_VECTOR_REST_URL=your_upstash_url
   UPSTASH_VECTOR_REST_TOKEN=your_upstash_token
   GROQ_API_KEY=your_groq_api_key
   ```

4. **Embed profile data**
   ```bash
   cd ../scripts
   python embed_digitaltwin.py
   ```

5. **Start the server**
   ```bash
   cd ../mcp-server
   pnpm dev
   ```

Visit `http://localhost:3000` to see the web UI.

## 📱 Usage Modes

### 1. MCP Server Mode (VS Code Agent)

Configure in VS Code settings or Claude Desktop:

```json
{
  "digital-twin": {
    "command": "node",
    "args": [
      "C:/path/to/mcp-server/.next/standalone/server.js"
    ],
    "env": {
      "UPSTASH_VECTOR_REST_URL": "your_url",
      "UPSTASH_VECTOR_REST_TOKEN": "your_token",
      "GROQ_API_KEY": "your_key"
    }
  }
}
```

Then query the digital twin directly from your IDE:
- "What are my recent projects?"
- "Do I have experience with React?"
- "What's my educational background?"

### 2. Web UI Mode

Access the interactive web interface at `http://localhost:3000`:
- Chat interface for asking questions
- Job posting analysis
- Technical interview simulation

### 3. API Mode

Make direct API calls to the MCP endpoint:

```typescript
const response = await fetch('/api/mcp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: "What are my Python skills?"
  })
});
```

## 🎯 Use Cases

### 1. **Job Application Tailoring**
```
Query: "How do my skills match this job posting?"
→ Analyzes job requirements against your profile
→ Highlights relevant experience
→ Suggests emphasis areas for cover letter
```

### 2. **Interview Preparation**
```
Query: "Prepare me for questions about my React experience"
→ Retrieves all React-related projects
→ Generates interview talking points
→ Suggests technical questions you might face
```

### 3. **Portfolio Summary**
```
Query: "Summarize my experience for a senior developer role"
→ Extracts relevant experiences
→ Highlights leadership and technical skills
→ Provides concise professional summary
```

## 📂 Project Structure

```
digital-twin-mcp-portfolio/
├── mcp-server/                 # Next.js MCP server
│   ├── app/
│   │   ├── api/mcp/           # MCP endpoint
│   │   ├── components/        # UI components
│   │   └── actions/           # Server actions
│   └── lib/
│       └── digital-twin.ts    # Core RAG logic
├── scripts/                   # Data processing scripts
│   ├── embed_digitaltwin.py   # Profile data embedding
│   └── embed_job_postings.py  # Job posting processing
├── data/                      # Profile data
│   └── digitaltwin_clean.json
└── docs/                      # Documentation
```

## 🔬 How It Works

### RAG Pipeline

1. **Data Preparation**
   - Professional profile stored in JSON format
   - Chunked into semantic sections (education, experience, projects, skills)
   - Each chunk embedded using Upstash's text embedding model

2. **Query Processing**
   - User query is converted to vector embedding
   - Semantic search retrieves top-3 most relevant chunks
   - Includes metadata (category, context) for better filtering

3. **Response Generation**
   - Retrieved context passed to LLM (Llama 3.3 70B via Groq)
   - Explicit instructions to ground response in retrieved data
   - Professional, accurate, and context-aware responses

### Vector Search Configuration

```typescript
const results = await index.query({
  data: query,
  topK: 3,
  includeMetadata: true
});
```

## 👤 Author

**Archana Mukunthamani** - *Primary Developer & Sole Contributor*

- 🎯 Complete system architecture and implementation
- 🧠 RAG pipeline development with Upstash Vector and Groq LLM
- 🎤 Technical interview simulator feature
- 🌐 Web UI design and development
- 🚀 Vercel deployment and production configuration
- 📊 94% of all commits and entire core functionality

**GitHub**: [@archana-mukunthamani](https://github.com/archana-mukunthamani)

### Acknowledgments

This project was initially started as a team project. Special thanks to:
- **Himani1201** - Initial repository setup and README template
- **vivian** - Initial AGENTS.md documentation file

*Note: After initial setup, this project was designed, developed, and completed entirely by Archana Mukunthamani.*

---

**Built with ❤️ by Archana Mukunthamani**

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

- ✅ Building production-ready MCP servers
- ✅ Implementing RAG architectures
- ✅ Working with vector databases
- ✅ Next.js 15 server actions and API routes
- ✅ TypeScript strict typing
- ✅ UI/UX design with ShadCN
- ✅ LLM integration (Groq API)
- ✅ Environment management and deployment

## 📊 Performance Metrics

- **Response Time**: ~2-3 seconds (including LLM)
- **Search Accuracy**: Top-K retrieval with semantic matching
- **Context Window**: Optimized for 3 relevant chunks
- **Error Handling**: Comprehensive fallbacks and validation

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `UPSTASH_VECTOR_REST_URL`
   - `UPSTASH_VECTOR_REST_TOKEN`
   - `GROQ_API_KEY`
4. Deploy!

The app is configured with `vercel.json` for optimal Next.js 15 deployment.

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome! Feel free to:
- Open issues for bugs or improvements
- Submit pull requests
- Share feedback

## 📄 License

MIT License - feel free to use this project as a reference or starting point for your own digital twin assistant.

## 👤 Contact

**Your Name**
- LinkedIn: [your-linkedin-url]
- GitHub: [@your-username](https://github.com/your-username)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Reference architecture from [Roll Dice MCP Server](https://github.com/gocallum/rolldice-mcpserver.git)
- RAG implementation inspired by [Digital Twin Python Reference](https://github.com/gocallum/binal_digital-twin_py.git)
- Built as part of internship project at Ausbiz Consulting

---

⭐ **If you find this project useful, please consider giving it a star!**
