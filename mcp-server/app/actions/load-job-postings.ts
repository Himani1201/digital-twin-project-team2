'use server'

import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

export interface JobPosting {
  id: string
  title: string
  company: string
  shortDescription: string
  content: string
}

export async function loadAllJobPostings(): Promise<JobPosting[]> {
  try {
    // Path to job-postings directory (one level up from mcp-server)
    const jobPostingsPath = join(process.cwd(), '..', 'job-postings')
    
    // Read all markdown files from the directory
    const files = await readdir(jobPostingsPath)
    const markdownFiles = files.filter(file => file.endsWith('.md'))
    
    // Load and parse each job posting
    const jobPostings: JobPosting[] = []
    
    for (const file of markdownFiles) {
      const filePath = join(jobPostingsPath, file)
      const content = await readFile(filePath, 'utf-8')
      
      // Extract title (first # heading)
      const titleMatch = content.match(/^#\s+(.+)$/m)
      const title = titleMatch ? titleMatch[1].trim() : file.replace('.md', '')
      
      // Extract company (look for company field or second heading)
      const companyMatch = content.match(/(?:company|organization):\s*(.+)/i) || 
                          content.match(/^##\s+(.+)$/m)
      const company = companyMatch ? companyMatch[1].trim() : 'Unknown Company'
      
      // Create short description from first paragraph
      const paragraphMatch = content.match(/^(?!#)(.{50,200})/m)
      const shortDescription = paragraphMatch 
        ? paragraphMatch[1].trim().substring(0, 100) + '...'
        : 'Job description available'
      
      jobPostings.push({
        id: file.replace('.md', ''),
        title,
        company,
        shortDescription,
        content
      })
    }
    
    return jobPostings.sort((a, b) => a.id.localeCompare(b.id))
  } catch (error) {
    console.error('Error loading job postings:', error)
    return []
  }
}
