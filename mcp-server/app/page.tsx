import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Digital Twin MCP Server</h1>
      <p>
        This is an MCP (Model Context Protocol) server that provides RAG (Retrieval-Augmented Generation) 
        functionality for querying professional profile information.
      </p>
      
      <div style={{ 
        background: '#f0f9ff', 
        border: '2px solid #0284c7', 
        padding: '1.5rem', 
        borderRadius: '8px', 
        marginTop: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginTop: 0 }}>🎯 Try the Interview Experience</h2>
        <p>Experience the AI-powered interview system in action</p>
        <Link 
          href="/interview" 
          style={{
            display: 'inline-block',
            background: '#0284c7',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            marginTop: '1rem'
          }}
        >
          Launch Interview System →
        </Link>
      </div>

      <h2>Available Tools:</h2>
      <ul>
        <li><strong>rag_query</strong> - Ask any question about the professional background</li>
        <li><strong>query_experience</strong> - Get work experience information</li>
        <li><strong>query_skills</strong> - Get technical skills information</li>
        <li><strong>query_projects</strong> - Get project information</li>
        <li><strong>query_education</strong> - Get educational background</li>
        <li><strong>query_career_goals</strong> - Get career goals and aspirations</li>
        <li><strong>health_check</strong> - Check system status</li>
      </ul>

      <h2>MCP Endpoint:</h2>
      <p>
        The MCP server is available at: <code>/api/mcp</code>
      </p>

      <h2>Status:</h2>
      <p>✅ Server is running and ready to handle MCP requests.</p>
    </div>
  )
}