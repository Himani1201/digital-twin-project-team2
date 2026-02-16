# Digital Twin MCP - Quick Test Checklist

**Use this as a rapid testing guide. For detailed instructions, see [VSCODE_AGENT_TESTING_GUIDE.md](VSCODE_AGENT_TESTING_GUIDE.md)**

---

## Pre-Test Verification (5 minutes)

### ✅ Environment Check
```bash
# Check vector database has data
python scripts/verify_setup.py
```
**Expected**: 40+ vectors loaded

### ✅ MCP Server Status
Open: https://digital-twin-project-team2-1.vercel.app/api/mcp

**Expected**: JSON response showing server status

### ✅ VS Code Setup
- [ ] VS Code Insiders installed
- [ ] GitHub Copilot extension active
- [ ] `.vscode/mcp.json` file exists

---

## Quick Test Suite (10 minutes)

### Test 1: Connection ✅
**Command**:
```
@workspace Check if digital-twin-mcp server is available
```
**Expected**: Server detected, tool `query_digital_twin` available

---

### Test 2: Basic Query ✅
**Command**:
```
@workspace Use query_digital_twin to ask: "What are your technical skills?"
```
**Expected**: Lists AWS, databases, Python, analytics skills

---

### Test 3: Experience Query ✅
**Command**:
```
@workspace Query my digital twin: "Tell me about your AWS experience"
```
**Expected**: Cloud Support Engineer role, RDS, specific metrics

---

### Test 4: Simple Interview ✅
**Command**:
```
@workspace Act as interviewer. Use query_digital_twin to learn about me, 
then ask 2 relevant questions for a Data Analyst role.
```
**Expected**: Agent queries profile, asks contextual questions

---

### Test 5: Job-Based Interview ✅
**Command**:
```
@workspace Interview me for the role in job-postings/job1.md. 
Query my profile, ask 3 questions, provide assessment.
```
**Expected**: Reads job file, conducts targeted interview, gives scores

---

## Quick Troubleshooting

| Issue | Quick Fix |
|-------|-----------|
| MCP not detected | Reload VS Code: `Ctrl+R` |
| Empty responses | Run: `python scripts/embed_digitaltwin.py` |
| Slow queries | Check Vercel logs for errors |
| Connection timeout | Test endpoint: curl the URL |

---

## Manual API Test (Optional)

**PowerShell**:
```powershell
$body = @{
    jsonrpc = "2.0"
    method = "tools/call"
    params = @{
        name = "query_digital_twin"
        arguments = @{ question = "What are your skills?" }
    }
    id = 1
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "https://digital-twin-project-team2-1.vercel.app/api/mcp" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"
```

---

## Success Criteria

- [ ] All 5 tests pass
- [ ] Responses < 5 seconds
- [ ] Profile data accurate
- [ ] Agent uses tool strategically
- [ ] Interview flows naturally

---

**Status**: ✅ Ready for Testing  
**See Full Guide**: [VSCODE_AGENT_TESTING_GUIDE.md](VSCODE_AGENT_TESTING_GUIDE.md)
