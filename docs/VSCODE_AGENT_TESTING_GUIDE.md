# Digital Twin MCP Server - VS Code Agent Mode Testing Guide

## Overview

This guide provides **detailed step-by-step instructions** for testing your Digital Twin MCP Server from Visual Studio Code in **Agent Mode** instead of the Web UI variant.

### What You'll Be Testing

- **MCP Server Integration**: Your deployed Digital Twin MCP server at Vercel
- **VS Code Agent Mode**: GitHub Copilot's agent capabilities to interact with your MCP server
- **RAG Pipeline**: Retrieval-Augmented Generation using Upstash Vector + Groq LLM
- **Interview Simulation**: AI-powered interview preparation using your professional profile

### System Architecture (Agent Mode)

```
┌────────────────────────────────────────────────────────────────┐
│                  Visual Studio Code (Agent Mode)               │
│                                                                │
│     ┌────────────────────────────────────────────────────┐     │
│     │ Agentic LLM (Claude Sonnet / Opus / Groq Fast)     │     │
│     │ - Reads job description + agent instructions       │     │
│     │ - Conducts interview autonomously                  │     │
│     │ - Decides when to retrieve information             │     │
│     │ - Generates structured answers + final report      │     │
│     └────────────────────────────────────────────────────┘     │
│                         ▲            │                         │
│                         │ Tool Call  │                         │
│                         │            ▼                         │
│     ┌────────────────────────────────────────────────────┐     │
│     │ MCP Retrieval Tool                                 │     │
│     │ - Accepts search queries from AI agent             │     │
│     │ - Returns relevant profile chunks                  │     │
│     └────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼ (HTTP Request)
         ┌──────────────────────────────────────────┐
         │  Your MCP Server (Vercel Deployment)     │
         │  https://digital-twin-project-team2-1    │
         │         .vercel.app/api/mcp              │
         └──────────────────────────────────────────┘
                              │
                  ┌───────────┴───────────┐
                  │                       │
                  ▼                       ▼
         ┌────────────────┐      ┌────────────────┐
         │ Upstash Vector │      │  Groq API      │
         │ (Vector Search)│      │  (LLM)         │
         └────────────────┘      └────────────────┘
                  │
                  ▼
         ┌──────────────────────────────────────┐
         │     Profile Data Preparation         │
         │  (Structured JSON, Chunked Content)  │
         │ - Your experience, skills, metrics   │
         │ - Stored in Upstash Vector DB        │
         └──────────────────────────────────────┘
```

---

## Prerequisites

### 1. Software Requirements

✅ **VS Code Insiders** (Required for Agent Mode)
   - Download: https://code.visualstudio.com/insiders/
   - Agent Mode is currently only available in VS Code Insiders

✅ **GitHub Copilot Chat Extension**
   - Install from VS Code Marketplace
   - Requires active GitHub Copilot subscription

✅ **MCP Extension** (if not automatically installed)
   - Should be automatically available with GitHub Copilot Chat

### 2. Account Requirements

✅ **GitHub Account** with Copilot access
   - Verify at: https://github.com/settings/copilot

✅ **Vercel Deployment** (Already Done)
   - Your MCP server: `https://digital-twin-project-team2-1.vercel.app`
   - Status: ✅ Running (based on terminal history)

### 3. Environment Verification

✅ **Upstash Vector Database** populated with your profile data
   - Run to verify: `python scripts/verify_setup.py`
   - Expected: 40-50 vectors loaded

✅ **Groq API Key** configured in Vercel environment variables
   - Verify in: https://vercel.com/[your-username]/digital-twin-project-team2-1/settings/environment-variables

---

## Setup Instructions

### Step 1: Configure MCP Server in VS Code

Your `.vscode/mcp.json` file is already configured:

```json
{
  "servers": {
    "digital-twin-mcp": {
      "type": "http",
      "url": "https://digital-twin-project-team2-1.vercel.app/api/mcp"
    }
  }
}
```

**Verification:**
1. Open VS Code Insiders
2. Navigate to your project: `c:\Users\hemak\OneDrive\Documents\Project\digital-twin-project-team2`
3. Check that `.vscode/mcp.json` exists and matches above

### Step 2: Enable Agent Mode

1. **Open Command Palette**: `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
2. Type: `GitHub Copilot: Open Agent Mode`
3. Or click the **Agent icon** in the Activity Bar (left sidebar)

### Step 3: Verify MCP Server Connection

1. Open **Copilot Chat** panel (`Ctrl+Alt+I` or `Cmd+Alt+I`)
2. Type: `@workspace check mcp connection`
3. Expected response: Should show `digital-twin-mcp` server connected

---

## Testing Procedures

### Test 1: Basic MCP Connection Test

**Objective**: Verify MCP server is accessible from VS Code

**Steps**:
1. Open Copilot Chat
2. Run command:
   ```
   @workspace Can you check if the digital-twin-mcp server is available?
   ```

**Expected Result**:
- ✅ Copilot confirms MCP server is connected
- ✅ Shows available tools: `query_digital_twin`

**Troubleshooting**:
- If not detected: Reload VS Code window (`Ctrl+R`)
- Check `.vscode/mcp.json` syntax
- Verify Vercel deployment is running: https://digital-twin-project-team2-1.vercel.app/api/mcp

---

### Test 2: Simple Query Test

**Objective**: Test basic RAG query functionality

**Steps**:
1. In Copilot Chat, type:
   ```
   @workspace Use the query_digital_twin tool to ask: "What are your technical skills?"
   ```

**Expected Result**:
- ✅ Copilot invokes the MCP tool
- ✅ Returns professional skills from your profile
- ✅ Response includes specific technologies (AWS, Python, SQL, etc.)
- ✅ Response time < 5 seconds

**Example Response**:
```
I have strong technical skills in:
- Cloud Platforms: AWS (RDS, CloudWatch, EC2, S3)
- Databases: Oracle, PostgreSQL, MySQL, SQL Server
- Programming: Python, SQL, PL/SQL
- Data Analytics: Power BI, Excel, data profiling
- Certifications: AWS Cloud Practitioner, CompTIA Data+
```

---

### Test 3: Experience Query Test

**Objective**: Verify vector search retrieves work experience

**Steps**:
1. In Copilot Chat, ask:
   ```
   @workspace Query my digital twin: "Tell me about your work experience at AWS"
   ```

**Expected Result**:
- ✅ Returns specific details about AWS Cloud Support Engineer role
- ✅ Includes quantified achievements (metrics, percentages)
- ✅ Mentions specific technologies and projects
- ✅ Uses first-person narrative (speaking as you)

**Example Response**:
```
I worked as a Cloud Support Engineer at AWS where I specialized in RDS database support.
My key achievements include:
- Resolved 100+ RDS performance issues with 95% customer satisfaction
- Reduced average resolution time by 30% through automation
- Managed CloudWatch monitoring for database fleet optimization
```

---

### Test 4: Career Transition Query

**Objective**: Test contextual understanding and narrative consistency

**Steps**:
1. Ask:
   ```
   @workspace Ask my digital twin: "Why are you transitioning into data analytics?"
   ```

**Expected Result**:
- ✅ Coherent narrative about career transition
- ✅ References relevant experience and skills
- ✅ Shows progression from cloud support to data analytics
- ✅ Mentions certifications (CompTIA Data+)

---

### Test 5: Interview Simulation (Basic)

**Objective**: Test autonomous interview agent behavior

**Steps**:
1. In Copilot Chat, provide this prompt:
   ```
   @workspace Act as an interviewer for a Data Analyst role. 
   Use the query_digital_twin tool to learn about my background, 
   then ask me 3 relevant interview questions based on my experience.
   
   For each question I answer, use the tool again to verify my response 
   against my actual profile and provide feedback.
   ```

**Expected Behavior**:
- ✅ Agent reads your profile using `query_digital_twin`
- ✅ Generates relevant questions based on your background
- ✅ Conducts multi-turn interview conversation
- ✅ Validates answers against your profile data
- ✅ Provides constructive feedback

**Example Flow**:
```
Agent: I'll review your background first...
[Uses query_digital_twin tool]

Agent: Based on your profile, I see you have AWS RDS experience 
and are transitioning to data analytics. Let me ask you:

Q1: Tell me about a time you used data to solve a performance problem.

You: [Provide answer]

Agent: [Uses tool to verify] That aligns well with your CloudWatch 
monitoring experience. Here's how to strengthen that answer...
```

---

### Test 6: Job-Specific Interview Simulation

**Objective**: Test with real job posting from your repository

**Steps**:
1. Select a job posting file (e.g., `job-postings/job1.md`)
2. Use this prompt:
   ```
   @workspace I'm interviewing for the role described in job-postings/job1.md.
   
   Using my digital twin:
   1. Analyze the job requirements
   2. Query my relevant experience with query_digital_twin
   3. Conduct a 5-question behavioral interview
   4. After each answer, verify against my profile
   5. Provide a final assessment report with gaps and recommendations
   ```

**Expected Result**:
- ✅ Agent reads job posting file
- ✅ Identifies key requirements
- ✅ Queries your profile for relevant experience
- ✅ Asks targeted interview questions
- ✅ Provides assessment with scores (1-10)
- ✅ Identifies skills gaps
- ✅ Gives specific improvement recommendations

**Example Assessment**:
```
📊 Interview Assessment Report

Role: Data Analyst Position
Candidate: [Your Digital Twin]

Technical Fit: 8/10
- Strong SQL and database background
- Some analytics experience via RDS performance tuning
- Gap: Limited Snowflake/modern data warehouse experience

Behavioral Fit: 9/10
- Clear examples of problem-solving
- Good communication of technical concepts
- Data-driven decision making demonstrated

Recommendations:
1. Emphasize data profiling experience from AWS role
2. Take Snowflake certification course
3. Build portfolio project using modern analytics stack
4. Practice STAR format for behavioral questions
```

---

### Test 7: Multi-Persona Interview

**Objective**: Test complex interview scenarios with multiple interviewers

**Steps**:
1. Use this advanced prompt:
   ```
   @workspace Simulate a panel interview with 3 personas:
   
   1. HR Recruiter: Screen for culture fit and career motivations
   2. Technical Lead: Assess technical skills and problem-solving
   3. Hiring Manager: Evaluate leadership and growth potential
   
   For each persona:
   - Use query_digital_twin to gather relevant profile information
   - Ask 2 questions specific to that persona's concerns
   - Adapt questions based on my answers
   
   Then provide a consensus assessment report.
   ```

**Expected Behavior**:
- ✅ Agent switches between personas
- ✅ Each persona asks relevant questions
- ✅ Questions adapt based on your answers
- ✅ Uses MCP tool strategically (not for every question)
- ✅ Final report synthesizes all perspectives
- ✅ Identifies consensus strengths and concerns

---

### Test 8: Performance and Error Handling

**Objective**: Test system reliability and edge cases

**Test 8a - Invalid Query**:
```
@workspace Query my digital twin: "What's your favorite pizza topping?"
```
**Expected**: Graceful response indicating topic isn't in professional profile

**Test 8b - Rapid Fire Queries**:
Ask 5 questions rapidly:
```
@workspace Query my digital twin:
1. Technical skills
2. Work experience
3. Education
4. Career goals
5. Recent projects
```
**Expected**: All queries complete successfully within reasonable time

**Test 8c - Connection Resilience**:
- Temporarily disable internet
- Attempt query
- Re-enable internet
- Retry query

**Expected**: Appropriate error message, then successful recovery

---

## Verification Checklist

After completing tests, verify:

- [ ] MCP server connection established in VS Code
- [ ] `query_digital_twin` tool accessible to Copilot Agent
- [ ] Basic queries return relevant profile information
- [ ] Response times acceptable (< 5 seconds typical)
- [ ] Agent mode conducts autonomous interviews
- [ ] Multi-turn conversations maintain context
- [ ] Tool usage is strategic and appropriate
- [ ] Error handling is graceful
- [ ] Assessment reports are detailed and actionable

---

## Comparing Web UI vs Agent Mode

| Feature | Web UI Variant | VS Code Agent Mode (Current) |
|---------|---------------|------------------------------|
| **Interface** | Browser-based React UI | VS Code Copilot Chat |
| **Interaction** | Click buttons, forms | Natural language conversation |
| **Interview Control** | User-driven Q&A | AI agent conducts interview autonomously |
| **MCP Integration** | Backend service hosts MCP | Direct MCP-to-VS Code connection |
| **State Management** | Server-side session | Agent maintains context |
| **Job Analysis** | Upload job posting via UI | Reference file directly: `job-postings/job1.md` |
| **Report Generation** | UI displays structured report | Agent generates markdown report |
| **Use Case** | Public demo, portfolio | Personal development, testing |

**Key Advantage of Agent Mode**:
- More **autonomous** - AI agent decides when to query your profile
- More **conversational** - Natural back-and-forth dialogue
- More **adaptive** - Questions evolve based on your answers
- More **integrated** - Works within your existing VS Code workflow

---

## Advanced Testing Scenarios

### Scenario 1: Technical Deep Dive

```
@workspace You're a senior technical interviewer for a Cloud Data Engineer role.

Use my digital twin to:
1. Assess my hands-on AWS RDS experience
2. Evaluate my SQL optimization skills
3. Test my understanding of database monitoring
4. Probe my data analytics transition reasoning

Ask follow-up questions to go deeper on any weak areas.
Provide a technical competency matrix at the end.
```

### Scenario 2: Behavioral Excellence

```
@workspace Conduct a behavioral interview focused on:
- Leadership and influence
- Problem-solving under pressure
- Handling difficult stakeholders
- Learning from failure

Query my profile for relevant STAR examples.
Push me to provide more specifics if answers are vague.
Rate each answer on clarity, relevance, and impact.
```

### Scenario 3: Executive Interview

```
@workspace You're the VP of Engineering interviewing me for a senior IC role.

Focus on:
- Strategic thinking and business impact
- Technical vision and innovation
- Cross-functional collaboration
- Handling ambiguity

Use my digital twin to prepare, then conduct a 30-minute interview.
Assess executive presence and strategic communication.
```

---

## Troubleshooting Guide

### Issue: MCP Server Not Detected

**Symptoms**: Copilot doesn't recognize `digital-twin-mcp` server

**Solutions**:
1. **Verify `.vscode/mcp.json` exists and is valid**:
   ```bash
   cat .vscode/mcp.json
   ```
   
2. **Reload VS Code window**: `Ctrl+R`

3. **Check MCP server is running**:
   Open browser: https://digital-twin-project-team2-1.vercel.app/api/mcp
   Expected: JSON response with server status

4. **Check VS Code Insiders version**:
   Help → About → Should be latest version

5. **Enable verbose MCP logging**:
   - VS Code Settings → Search "MCP"
   - Enable "MCP: Verbose Logging"
   - Check Output panel → "MCP" channel

---

### Issue: Query Returns Empty or Irrelevant Results

**Symptoms**: Tool responds but content doesn't match your profile

**Solutions**:
1. **Verify vector database has data**:
   ```bash
   python scripts/verify_setup.py
   ```
   Should show 40+ vectors

2. **Check environment variables in Vercel**:
   - Go to: https://vercel.com/[username]/digital-twin-project-team2-1/settings/environment-variables
   - Verify: `UPSTASH_VECTOR_REST_URL`, `UPSTASH_VECTOR_REST_TOKEN`, `GROQ_API_KEY`

3. **Test MCP endpoint manually**:
   ```bash
   curl -X POST https://digital-twin-project-team2-1.vercel.app/api/mcp \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "method": "tools/call",
       "params": {
         "name": "query_digital_twin",
         "arguments": {"question": "What are your skills?"}
       },
       "id": 1
     }'
   ```

4. **Re-embed profile data** (if recently updated):
   ```bash
   python scripts/embed_digitaltwin.py
   ```

---

### Issue: Slow Response Times

**Symptoms**: Queries take > 10 seconds

**Solutions**:
1. **Check Vercel deployment logs**:
   - Vercel dashboard → Deployments → Select latest → Logs
   - Look for timeout errors or cold starts

2. **Monitor Groq API rate limits**:
   - Check: https://console.groq.com/usage
   - Consider upgrading if hitting limits

3. **Reduce query complexity**:
   - Use more specific questions
   - Avoid compound queries

4. **Optimize vector search** (in `lib/digital-twin.ts`):
   ```typescript
   const results = await index.query({
     data: queryText,
     topK: 2,  // Reduce from 3 to 2
     includeMetadata: true,
   })
   ```

---

### Issue: Agent Doesn't Use Tool Appropriately

**Symptoms**: Agent answers without querying your profile, or over-queries

**Solutions**:
1. **Be explicit in prompt**:
   ```
   @workspace Use the query_digital_twin tool to check my profile before answering
   ```

2. **Provide context about tool purpose**:
   ```
   @workspace The query_digital_twin tool accesses my professional profile.
   Use it to answer: [your question]
   ```

3. **Set clear expectations**:
   ```
   @workspace For this interview simulation:
   - Query my profile once at the start to understand my background
   - Use it again when you need specific details
   - Don't query for general interview advice
   ```

---

### Issue: Connection Timeout Errors

**Symptoms**: "Request timeout" or "Failed to connect to MCP server"

**Solutions**:
1. **Check internet connection**

2. **Verify Vercel deployment status**:
   - Go to: https://vercel.com/[username]/digital-twin-project-team2-1
   - Check deployment status (should be "Ready")

3. **Test endpoint directly**:
   ```bash
   curl https://digital-twin-project-team2-1.vercel.app/api/mcp
   ```

4. **Check firewall/VPN**:
   - Temporarily disable to test
   - Add Vercel domains to allowlist

5. **Increase timeout in `.vscode/mcp.json`**:
   ```json
   {
     "servers": {
       "digital-twin-mcp": {
         "type": "http",
         "url": "https://digital-twin-project-team2-1.vercel.app/api/mcp",
         "timeout": 30000
       }
     }
   }
   ```

---

## Monitoring and Debugging

### View MCP Server Logs

**Vercel Logs**:
1. Go to: https://vercel.com/[username]/digital-twin-project-team2-1
2. Click "Logs" tab
3. Filter by `/api/mcp` requests
4. Look for errors or slow queries

**VS Code MCP Logs**:
1. View → Output
2. Select "MCP" from dropdown
3. Enable verbose logging in settings

### Test MCP Endpoint Manually

**PowerShell**:
```powershell
$body = @{
    jsonrpc = "2.0"
    method = "tools/call"
    params = @{
        name = "query_digital_twin"
        arguments = @{
            question = "What are your skills?"
        }
    }
    id = 1
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://digital-twin-project-team2-1.vercel.app/api/mcp" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"
```

**Expected Response**:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "I have strong technical skills in cloud computing, databases, and data analytics..."
      }
    ]
  }
}
```

---

## Best Practices for Testing

### 1. Start Simple, Build Complexity
- ✅ First: Test basic connection and single queries
- ✅ Then: Test multi-turn conversations
- ✅ Finally: Test autonomous interview simulations

### 2. Use Realistic Scenarios
- Use actual job postings from your `job-postings/` folder
- Ask questions that real interviewers would ask
- Provide authentic answers to test feedback quality

### 3. Iterate on Profile Data
- Note any gaps revealed during testing
- Update `data/digitaltwin.json` with missing information
- Re-run `python scripts/embed_digitaltwin.py`
- Retest to verify improvements

### 4. Document Edge Cases
- Keep a log of unusual queries or errors
- Share findings with team for system improvements
- Use insights to refine prompts and system design

### 5. Monitor Performance
- Track query response times
- Note any slow or failed requests
- Check Vercel and Groq dashboards for usage patterns

---

## Next Steps After Testing

### 1. Expand Profile Data
- Add more STAR examples from your experience
- Include more technical project details
- Add behavioral interview Q&A patterns
- Document career transition narrative

### 2. Optimize System
- Adjust `topK` parameter for better search results
- Experiment with different Groq models
- Implement caching for common queries
- Add retry logic for resilience

### 3. Enhance Agent Instructions
- Create specialized prompts for different interview types
- Add persona definitions (HR, technical, executive)
- Define assessment criteria and scoring rubrics
- Create templates for different job roles

### 4. Integrate with Interview Workflow
- Use for preparation before real interviews
- Generate customized Q&A for specific job postings
- Track improvement over time
- Build confidence through practice

---

## References

### Documentation
- [README.md](../README.md) - Project overview
- [design.md](design.md) - System architecture
- [prd.md](prd.md) - Product requirements
- [VECTOR_SETUP_GUIDE.md](VECTOR_SETUP_GUIDE.md) - Vector database setup

### External Resources
- **Model Context Protocol**: https://modelcontextprotocol.io
- **GitHub Copilot Docs**: https://docs.github.com/en/copilot
- **Upstash Vector**: https://upstash.com/docs/vector
- **Groq API**: https://console.groq.com/docs
- **Vercel Deployment**: https://vercel.com/docs

### Course Reference
- **Digital Twin I Curriculum**: https://www.ausbizconsulting.com.au/courses/digitaltwin-I/curriculum/69327dc19f84753fe956eb31

---

## Support

### Getting Help

1. **Check Documentation**: Review docs in `/docs` folder
2. **Verify Setup**: Run `python scripts/verify_setup.py`
3. **Check Logs**: Review Vercel deployment logs
4. **Test Manually**: Use curl/PowerShell to test MCP endpoint directly
5. **GitHub Issues**: Document any bugs or improvements needed

### Common Questions

**Q: Can I test locally instead of using Vercel?**
A: Yes, run `pnpm dev` in `mcp-server/` folder, then update `.vscode/mcp.json` to `http://localhost:3000/api/mcp`

**Q: How do I update my profile data?**
A: Edit `data/digitaltwin.json`, then run `python scripts/embed_digitaltwin.py` to re-embed

**Q: Can I use Claude Desktop instead of VS Code?**
A: Yes, see [VECTOR_SETUP_GUIDE.md](VECTOR_SETUP_GUIDE.md) for Claude Desktop configuration

**Q: How much do the API calls cost?**
A: Very minimal - Groq has generous free tier, Upstash Vector free plan supports 10k queries/day

**Q: Can I customize interview questions?**
A: Yes, through your prompts to the agent. The agent adapts questions based on your profile and the specific job role.

---

## Success Metrics

Track your testing progress:

- [ ] MCP server successfully connected in VS Code
- [ ] Basic profile queries return accurate information
- [ ] Interview simulations run autonomously
- [ ] Agent uses tool strategically (not too much/too little)
- [ ] Responses sound natural and personalized
- [ ] Assessment reports provide actionable feedback
- [ ] System performs reliably across multiple tests
- [ ] Response times acceptable (< 5 seconds)
- [ ] Ready to use for real interview preparation

---

**Document Version**: 1.0  
**Last Updated**: February 15, 2026  
**Status**: Ready for Testing ✅

---

**Happy Testing! 🚀**

Remember: The goal is to use your digital twin as a **personal interview preparation assistant**. The more you test and iterate, the better it becomes at representing your professional background and helping you succeed in interviews.
