# 🚀 Quick Deploy to Vercel

## Current Status ✅

- ✅ Changes committed to local repository
- ✅ Pushed to origin: `Himani1201/digital-twin-project-team2`
- ✅ Pushed to fork: `archana-mukunthamani/digital-twin-project-team2-1`
- ✅ Deployment documentation created

---

## Deploy Now (Choose One Method)

### Method 1: Vercel Dashboard (Recommended for First Time)

1. **Go to**: [https://vercel.com/dashboard](https://vercel.com/dashboard)

2. **Import Repository**:
   - Click "Add New..." → "Project"
   - Select `archana-mukunthamani/digital-twin-project-team2-1`
   - Click "Import"

3. **Configure Project**:
   ```
   Framework Preset: Next.js
   Root Directory: mcp-server
   Build Command: pnpm install && pnpm build
   Output Directory: .next
   Install Command: pnpm install
   ```

4. **Add Environment Variables** (IMPORTANT!):
   - Click "Environment Variables"
   - Add these three variables:
     ```
     UPSTASH_VECTOR_REST_URL = your_upstash_url
     UPSTASH_VECTOR_REST_TOKEN = your_upstash_token
     GROQ_API_KEY = your_groq_api_key
     ```

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live! 🎉

---

### Method 2: Vercel CLI (Quick)

```bash
# Navigate to MCP server directory
cd mcp-server

# Login to Vercel (first time only)
vercel login

# Deploy to production
vercel --prod
```

Follow the prompts and add environment variables when asked.

---

## After Deployment

### 1. Get Your Deployment URL

Your MCP server will be deployed at: `https://your-project-name.vercel.app`

### 2. Test the MCP Endpoint

```bash
curl -X POST https://your-project-name.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }'
```

### 3. Update VS Code Configuration

Update `.vscode/mcp.json`:

```json
{
  "mcpServers": {
    "digital-twin": {
      "url": "https://your-project-name.vercel.app/api/mcp",
      "transport": {
        "type": "http"
      }
    }
  }
}
```

---

## Environment Variables Required

Make sure you have these ready:

| Variable | Where to Get It |
|----------|----------------|
| `UPSTASH_VECTOR_REST_URL` | Upstash Console → Your Database → REST API section |
| `UPSTASH_VECTOR_REST_TOKEN` | Upstash Console → Your Database → REST API section |
| `GROQ_API_KEY` | Groq Console → API Keys |

---

## Need Help?

See the full deployment guide: [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)

---

**Ready to deploy? Choose Method 1 or Method 2 above! 🚀**
