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

export default function InterviewPage() {
  const [jobDescription, setJobDescription] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isInterviewing, setIsInterviewing] = useState(false)
  const [result, setResult] = useState<InterviewResult | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          AI-Powered Interview System
        </h1>

        {/* Job Description Input */}
        {!isInterviewing && messages.length === 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Enter Job Description
            </h2>
            <textarea
              className="w-full h-32 border border-gray-300 rounded p-3 mb-4 text-gray-900"
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <button
              onClick={startInterview}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Start Interview
            </button>
          </div>
        )}

        {/* Interview Progress */}
        {isInterviewing && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Interview in Progress...
              </h2>
              <span className="text-sm text-gray-600">
                Question {currentQuestion} of 5
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentQuestion / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Interview Transcript */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Interview Transcript
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No interview started yet
              </p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg ${
                    msg.role === 'interviewer'
                      ? 'bg-blue-50 border-l-4 border-blue-500'
                      : 'bg-green-50 border-l-4 border-green-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-900">
                      {msg.role === 'interviewer' ? '💼 Interviewer' : '🤖 Digital Twin'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{msg.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Interview Result */}
        {result && (
          <div
            className={`rounded-lg shadow p-6 ${
              result.decision === 'pass'
                ? 'bg-green-50 border-2 border-green-500'
                : 'bg-red-50 border-2 border-red-500'
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              {result.decision === 'pass' ? '✅ PASS' : '❌ FAIL'}
            </h2>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-800">Overall Score:</span>
                <span className="font-bold text-gray-900">{result.score}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    result.decision === 'pass' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>
            <div className="bg-white p-4 rounded border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-800">Recommendation:</h3>
              <p className="text-gray-700">{result.recommendation}</p>
            </div>
            <button
              onClick={() => {
                setMessages([])
                setResult(null)
                setJobDescription('')
              }}
              className="mt-4 bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
            >
              Start New Interview
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
