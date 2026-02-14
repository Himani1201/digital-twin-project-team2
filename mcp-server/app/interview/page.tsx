'use client'

import { useState } from 'react'

interface Message {
  role: 'interviewer' | 'candidate'
  content: string
  timestamp: Date
}

interface InterviewResult {
  decision: 'pass' | 'fail'
  recommendation: string
  score: number
}

// Job posting data
const JOB_POSTINGS = {
  job1: `# Data Analyst

**Company:** Australian Broadcasting Corporation (ABC)
**Location:** Sydney, New South Wales, Australia (Hybrid)
**Salary:** Not specified

About the job
Apply now Job no: 505190

Work type: Contract Full Time, Ongoing Full Time

Location: Various

Categories: IT/Technology

12 Month Fixed Term Contract

Hybrid Working - Work From Any State. 

About The ABC

The ABC is the nation's most trusted and independent source of Australian conversations, culture, and stories. With over 4,000 employees from diverse backgrounds across over 50 locations around Australia and overseas, we are proud to create, curate and deliver high-quality content that informs, educates and entertains Australian communities.

About The Role

This is a fantastic opportunity to work at the intersection of business and data, translating complex needs into impactful analytics solutions and shaping enterprise-scale data products that directly influence decision-making across projects and BAU operations.

Key Accountabilities

Work with data in cloud platforms to query and analyse information from multiple sources, bringing it together to create clear, useful business views.
With broad guidance, explore data in depth by profiling sources, understanding lineage and mapping source-to-target flows to uncover data quality, gaps and dependencies.
Partner with project and delivery teams to shape high-level solution designs and develop clear recommendations that meet business needs.
Collaborate closely with business stakeholders to gather, analyse and document business, data and analytics requirements, making sure everyone stays aligned. Clearly document analysis and reporting processes.
Lead and facilitate workshops and conversations that turn business needs into clear, practical specifications ready for delivery.
Stay involved during implementation to ensure solutions align with agreed requirements, scope, design and standards, and help assess the impact of any changes.
Create test strategies and test cases to check data accuracy and confirm solutions meet business needs, supporting validation and issue resolution along the way.
Help maintain trusted, high-quality data for analysis by following data governance practices and supporting compliance with internal policies and external requirements.

About You

Have a relevant tertiary qualification or strong hands-on experience, skills, and knowledge in data analysis and defining data requirements.
Deep understanding of complex business processes, with the ability to translate business needs into clear data and analytics requirements, user stories, and acceptance criteria.
Highly skilled at analysing and solving complex technical problems, including investigating, diagnosing, and resolving issues. Comfortable with data profiling, source-to-target analysis, and understanding data flows and lineage.
Experienced with modern data stacks and familiar with technologies across data acquisition, transformation, warehousing, and visualisation.
Well-developed SQL skills, with proven experience writing queries in cloud data warehouses like Snowflake.
Solid experience delivering data projects in both agile and hybrid environments. Experience with workforce data projects is especially valued.
Excellent technical documentation skills, ensuring all documents are accurate, clear, and up to date.
Strong communication and facilitation skills, able to confidently work with both technical teams and business stakeholders.
Able to prioritise and manage work across both project and BAU responsibilities efficiently.`,
  
  job2: `# Application Support Engineer

**Company:** Plenti 
**Location:** Sydney, New South Wales, Australia (Hybrid)
**Salary:** Not specified

Who is Plenti?

Plenti is a fintech lender, providing faster, fairer loans by leveraging its smart technology. Plenti is a dynamic and innovative business that is growing strongly. By continuing to deliver better customer experiences, Plenti is taking market share from incumbent players in the personal lending, renewable energy, and automotive finance markets.
 
We are a fast moving and ambitious business that seeks to recruit smart and capable people, who can take ownership of their role to help the business thrive. With over 250 people based in Australia, Plenti is of a size where everyone can make a difference in their role and help us realise our very big ambitions as a team, as we go about building Australia's best lender.

Role Summary:
The Application Support Engineer will be responsible for assisting with our internal support processes. This role will own complex technical problems from diagnosis to resolution, acting as the crucial link between our customer facing staff and our engineering teams. If you thrive on deep-dive troubleshooting and driving issues to a final solution, this role is for you.

Key responsibilities:
• Issue resolution: Respond to internal support tickets, provide troubleshooting advice and apply standard resolution tactics
• Triage and backlog management: Determine business impact and triage unresolvable tickets to appropriate engineering teams
• Advanced Troubleshooting: Investigate and resolve complex technical issues involving applications, APIs, databases, and integrations
• Root Cause Analysis: Analyze application logs, query databases (SQL), and replicate customer environments
• Knowledge Creation: Create and maintain internal knowledge base articles, runbooks, and troubleshooting guides

Key Qualifications:
• 3+ years of experience in relevant support roles with proven technical problem-solving skills
• Bachelors Degree in a technical field such as Computer Science
• Proven experience working with large Engineering teams
• Strong proficiency with SQL for data analysis and investigation
• Scripting skills for automation (e.g., Python, Bash, PowerShell)
• Familiarity with .Net/C# and ability to read code and execute simple code changes
• Experience with log analysis tools such as Datadog`,

  job3: `# Oracle Application Support Engineer

**Company:** PeopleScout 
**Location:** Sydney, New South Wales, Australia 
**Salary:** Not specified

Full job description
Peoplescout is one of Australia's leading RPO Solution Providers that hosts a cloud-based global e-recruitment platform used by a diverse portfolio of clients throughout Australia and New Zealand, US and UK.

We seek a Oracle Application Support Engineer(Level 2/3) to join our Application Support team, which specialises in supporting our customers and implementing solutions within our Springboard application.

Key Duties and Responsibilities:

Getting amongst it! Hunting down customer problems and challenges, digging through the data, identifying trends, identifying solutions and coding them through to customer success.
Software testing & some development of our web based application, primarily focussed on the database, SQL and PL/SQL aspects of the solution
Modifying and troubleshooting applications.
Turbo-charge our application support team to enable faster problem resolution and drive customer satisfaction
Collaborate with other teams and departments within PeopleScout
Creating software specification and training documents.

Here's what we'd like you to have:

Solid experience in relational databases, SQL and developing Oracle PL/SQL stored procedures with a strong understanding of database objects and structures
Experience working with data, identifying trends and patterns that can lead to problem identification and solution implementation
A genuine appetite for customer success and innovation
Strong understanding of database structures, identifying performance bottlenecks and introducing improvements
The ability to work independently, but also as part of a broader team
Strong analytical thinking and creative problem solving skills
Web application, Saas experience`,

  job4: `# Application Support Specialist

**Company:** Orbus Software 
**Location:** Sydney, New South Wales, Australia (Hybrid)
**Salary:** $75,000 - $85,000 a year

Full job description
We believe transformation doesn't happen in a vacuum. It happens through partnership, insight, and the ability to turn complexity into confidence.

At Orbus Software, we help some of the world's most sophisticated organizations understand their business inside and out. Our platform, OrbusInfinity, connects strategy to execution, IT to the business, and transformation goals to measurable results.

Application Support at Orbus plays a critical role in how customers experience our platform every day. We support OrbusInfinity, our flagship SaaS platform built on Microsoft Azure and Microsoft 365.

The Opportunity

As an Application Support Specialist at Orbus, you will be responsible for providing high-quality support to both customers and internal stakeholders using our OrbusInfinity platform. You will troubleshoot technical issues, manage support tickets end to end, and ensure customers receive timely, clear, and effective resolution.

What You Will Do

Customer and Application Support

Provide timely, accurate support to customers via Zendesk, managing tickets through their full lifecycle
Diagnose and resolve application and platform issues across a range of technical scenarios
Communicate clearly with customers, keeping them informed of progress and outcomes

Technical Troubleshooting and Escalation

Investigate issues related to Azure-hosted SaaS applications and supporting services
Troubleshoot integrations and incidents involving RESTful APIs
Work with Engineering and Product teams to escalate, reproduce, and resolve complex issues

What You Will Bring

At least 2 years of experience in an application or technical support role
Strong problem-solving and analytical skills
Hands-on experience supporting cloud-based applications, particularly in Microsoft Azure environments
Working knowledge of Microsoft 365, SharePoint, and Entra ID (Azure AD) administration
Experience investigating and troubleshooting application support incidents involving RESTful APIs
Solid understanding of Windows Server, SQL Server, and IIS`
}

export default function InterviewPage() {
  const [jobDescription, setJobDescription] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isInterviewing, setIsInterviewing] = useState(false)
  const [result, setResult] = useState<InterviewResult | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const loadJobPosting = (jobKey: keyof typeof JOB_POSTINGS) => {
    setJobDescription(JOB_POSTINGS[jobKey])
  }

  const startInterview = async () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description')
      return
    }

    setIsInterviewing(true)
    setMessages([])
    setResult(null)
    setCurrentQuestion(0)

    // Start the interview process
    await conductInterview()
  }

  const conductInterview = async () => {
    // Predefined interview questions (can be made dynamic)
    const questions = [
      'Tell me about your relevant work experience.',
      'What are your key technical skills?',
      'Describe a challenging project you worked on.',
      'What are your career goals?',
      'Why are you interested in this position?',
    ]

    for (let i = 0; i < questions.length; i++) {
      setCurrentQuestion(i + 1)

      // Add interviewer question
      const question = questions[i]
      setMessages((prev) => [
        ...prev,
        { role: 'interviewer', content: question, timestamp: new Date() },
      ])

      // Simulate thinking delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get answer from Digital Twin via MCP
      try {
        const response = await fetch('/api/mcp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: i + 1,
            method: 'tools/call',
            params: {
              name: 'query_digital_twin',
              arguments: { query: question },
            },
          }),
        })

        const data = await response.json()
        const answer = data.result?.content?.[0]?.text || 'Unable to retrieve answer.'

        // Add candidate answer
        setMessages((prev) => [
          ...prev,
          { role: 'candidate', content: answer, timestamp: new Date() },
        ])

        // Delay before next question
        await new Promise((resolve) => setTimeout(resolve, 2000))
      } catch (error) {
        console.error('Error querying Digital Twin:', error)
        setMessages((prev) => [
          ...prev,
          {
            role: 'candidate',
            content: 'Error: Unable to retrieve answer.',
            timestamp: new Date(),
          },
        ])
      }
    }

    // Generate final recommendation
    await generateRecommendation()
  }

  const generateRecommendation = async () => {
    // Simulate evaluation delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real implementation, this would analyze the responses
    // For now, we'll use a simplified scoring system
    const score = Math.floor(Math.random() * 30) + 70 // 70-100 score

    const decision = score >= 75 ? 'pass' : 'fail'
    const recommendation =
      decision === 'pass'
        ? `Strong candidate with relevant experience and skills. Score: ${score}/100. Recommended for next interview round.`
        : `Candidate does not meet minimum requirements. Score: ${score}/100. Not recommended to proceed.`

    setResult({ decision, recommendation, score })
    setIsInterviewing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 text-center">
          AI-Powered Interview System
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Select a job posting or enter your own to begin the interview
        </p>

        {/* Job Description Input */}
        {!isInterviewing && messages.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Select Job Posting
            </h2>
            
            {/* Job Selection Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => loadJobPosting('job1')}
                className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg p-4 text-left transition"
              >
                <div className="font-semibold text-blue-900">Job 1</div>
                <div className="text-sm text-blue-700">Data Analyst - ABC</div>
              </button>
              <button
                onClick={() => loadJobPosting('job2')}
                className="bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-lg p-4 text-left transition"
              >
                <div className="font-semibold text-green-900">Job 2</div>
                <div className="text-sm text-green-700">App Support - Plenti</div>
              </button>
              <button
                onClick={() => loadJobPosting('job3')}
                className="bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-lg p-4 text-left transition"
              >
                <div className="font-semibold text-purple-900">Job 3</div>
                <div className="text-sm text-purple-700">Oracle Engineer - PeopleScout</div>
              </button>
              <button
                onClick={() => loadJobPosting('job4')}
                className="bg-orange-50 hover:bg-orange-100 border-2 border-orange-200 rounded-lg p-4 text-left transition"
              >
                <div className="font-semibold text-orange-900">Job 4</div>
                <div className="text-sm text-orange-700">Support Specialist - Orbus</div>
              </button>
            </div>

            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Job Description
            </h2>
            <textarea
              className="w-full h-64 border-2 border-gray-300 rounded-lg p-4 mb-4 text-gray-900 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition resize-y"
              placeholder="Click a job above or paste your own job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <button
              onClick={startInterview}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-md hover:shadow-lg"
            >
              Start Interview
            </button>
          </div>
        )}

        {/* Interview Progress */}
        {isInterviewing && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Interview in Progress...
              </h2>
              <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                Question {currentQuestion} of 5
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${(currentQuestion / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Interview Transcript */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Interview Transcript
          </h2>
          <div className="space-y-4 max-h-[32rem] overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center py-12 text-lg">
                No interview started yet
              </p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-xl ${
                    msg.role === 'interviewer'
                      ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm'
                      : 'bg-green-50 border-l-4 border-green-500 shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-900 text-lg">
                      {msg.role === 'interviewer' ? '💼 Interviewer' : '🤖 Digital Twin'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Interview Result */}
        {result && (
          <div
            className={`rounded-xl shadow-lg p-8 ${
              result.decision === 'pass'
                ? 'bg-green-50 border-2 border-green-500'
                : 'bg-red-50 border-2 border-red-500'
            }`}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
              {result.decision === 'pass' ? '✅ PASS' : '❌ FAIL'}
            </h2>
            <div className="mb-6">
              <div className="flex justify-between mb-3">
                <span className="font-bold text-gray-800 text-lg">Overall Score:</span>
                <span className="font-bold text-gray-900 text-xl">{result.score}/100</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all ${
                    result.decision === 'pass' ? 'bg-green-600' : 'bg-red-600'
                  }`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-inner">
              <h3 className="font-bold mb-3 text-gray-800 text-lg">Recommendation:</h3>
              <p className="text-gray-700 leading-relaxed">{result.recommendation}</p>
            </div>
            <button
              onClick={() => {
                setMessages([])
                setResult(null)
                setJobDescription('')
              }}
              className="mt-6 w-full bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-semibold shadow-md hover:shadow-lg"
            >
              Start New Interview
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
