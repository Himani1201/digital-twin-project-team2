/**
 * Dynamic Job Posting Loader Server Action
 * 
 * Reads all job posting markdown files from job-postings/ directory
 * Returns structured data for dynamic button generation
 */

'use server'

import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

export interface JobPosting {
  id: string
  filename: string
  title: string
  company: string
  content: string
  shortDescription: string
}

/**
 * Load all job postings from the job-postings directory
 */
export async function loadAllJobPostings(): Promise<JobPosting[]> {
  try {
    // Path to job-postings directory (one level up from mcp-server)
    const jobPostingsPath = join(process.cwd(), '..', 'job-postings')
    
    // Read all files in the directory
    const files = await readdir(jobPostingsPath)
    
    // Filter for .md files
    const mdFiles = files.filter(file => file.endsWith('.md'))
    
    // Read and parse each file
    const jobPostings: JobPosting[] = await Promise.all(
      mdFiles.map(async (filename) => {
        const filePath = join(jobPostingsPath, filename)
        const content = await readFile(filePath, 'utf-8')
        
        // Extract metadata from markdown content
        const { title, company } = extractMetadata(content)
        
        // Generate short description from content
        const shortDescription = generateShortDescription(content)
        
        // Generate ID from filename (e.g., 'job1.md' -> 'job1')
        const id = filename.replace('.md', '')
        
        return {
          id,
          filename,
          title,
          company,
          content,
          shortDescription,
        }
      })
    )
    
    // Sort by ID for consistent ordering (job1, job2, job3, etc.)
    jobPostings.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
    
    return jobPostings
  } catch (error) {
    console.error('Error loading job postings:', error)
    // Return empty array if directory doesn't exist or other error
    return []
  }
}

/**
 * Extract title and company from markdown content
 */
function extractMetadata(content: string): { title: string; company: string } {
  let title = 'Untitled Position'
  let company = 'Unknown Company'
  
  // Extract title (first # heading)
  const titleMatch = content.match(/^#\s+(.+)$/m)
  if (titleMatch) {
    title = titleMatch[1].trim()
  }
  
  // Extract company (line starting with **Company:**)
  const companyMatch = content.match(/\*\*Company:\*\*\s+(.+)$/m)
  if (companyMatch) {
    company = companyMatch[1].trim()
  }
  
  return { title, company }
}

/**
 * Generate a short description highlighting key requirements
 */
function generateShortDescription(content: string): string {
  const lower = content.toLowerCase()
  const keywords: string[] = []
  
  // Detect key technologies/skills
  if (lower.includes('sql')) keywords.push('SQL')
  if (lower.includes('python')) keywords.push('Python')
  if (lower.includes('snowflake')) keywords.push('Snowflake')
  if (lower.includes('oracle')) keywords.push('Oracle')
  if (lower.includes('pl/sql') || lower.includes('pl-sql')) keywords.push('PL/SQL')
  if (lower.includes('azure')) keywords.push('Azure')
  if (lower.includes('aws')) keywords.push('AWS')
  if (lower.includes('cloud')) keywords.push('Cloud')
  if (lower.includes('datadog')) keywords.push('Datadog')
  if (lower.includes('bash')) keywords.push('Bash')
  if (lower.includes('powershell')) keywords.push('PowerShell')
  if (lower.includes('agile')) keywords.push('Agile')
  if (lower.includes('data analyst') || lower.includes('data analysis')) keywords.push('Data Analysis')
  if (lower.includes('support engineer') || lower.includes('application support')) keywords.push('Technical Support')
  
  // Extract location
  const locationMatch = content.match(/\*\*Location:\*\*\s+([^*\n]+)/i)
  const location = locationMatch ? locationMatch[1].trim() : 'Location TBD'
  
  // Build short description
  const skillsText = keywords.length > 0 ? keywords.slice(0, 5).join(' • ') : 'See full description'
  return `${location} | ${skillsText}`
}
