import os

files = {
    'users.ts': """export type DealStage = 'Discovery' | 'Demo' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  timezone: string;
  avatarUrl?: string;
}

export const mockUsers: User[] = [
  { id: 'u-1', name: 'Rajesh Kumar', role: 'Account Executive', department: 'Sales', email: 'rajesh.k@dealmind.ai', phone: '+91 98765 43210', timezone: 'IST' },
  { id: 'u-2', name: 'Priya Sharma', role: 'Sales Director', department: 'Sales', email: 'priya.s@dealmind.ai', phone: '+91 98765 43211', timezone: 'IST' },
  { id: 'u-3', name: 'Amit Patel', role: 'Solutions Engineer', department: 'Technical Sales', email: 'amit.p@dealmind.ai', phone: '+91 98765 43212', timezone: 'IST' },
  { id: 'u-4', name: 'Neha Gupta', role: 'Account Executive', department: 'Sales', email: 'neha.g@dealmind.ai', phone: '+91 98765 43213', timezone: 'IST' },
  { id: 'u-5', name: 'Vikram Singh', role: 'VP of Sales', department: 'Sales', email: 'vikram.s@dealmind.ai', phone: '+91 98765 43214', timezone: 'IST' },
];
""",
    'customers.ts': """export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  revenue: string;
  openDealsCount: number;
  healthScore: number;
  recentActivity: string;
  avatarUrl?: string;
}

export const mockCustomers: Customer[] = [
  { id: 'c-1', name: 'Anil Ambani', company: 'Reliance Retail', email: 'anil@relianceretail.com', phone: '+91 80000 11111', industry: 'Retail', revenue: '$25B', openDealsCount: 2, healthScore: 92, recentActivity: 'Attended Technical Discovery Call' },
  { id: 'c-2', name: 'N. R. Narayana Murthy', company: 'Infosys Tech', email: 'nmurthy@infosys.com', phone: '+91 80000 22222', industry: 'Software', revenue: '$18B', openDealsCount: 1, healthScore: 85, recentActivity: 'Requested pricing discount' },
  { id: 'c-3', name: 'Ratan Tata', company: 'Tata Motors', email: 'ratan.tata@tatamotors.com', phone: '+91 80000 33333', industry: 'Automotive', revenue: '$35B', openDealsCount: 3, healthScore: 88, recentActivity: 'Signed Phase 1 Contract' },
  { id: 'c-4', name: 'Kiran Mazumdar-Shaw', company: 'Biocon', email: 'kiran.m@biocon.com', phone: '+91 80000 44444', industry: 'Biotech', revenue: '$1B', openDealsCount: 0, healthScore: 95, recentActivity: 'Closed deal for R&D software' },
  { id: 'c-5', name: 'Shiv Nadar', company: 'HCL Technologies', email: 'shiv.n@hcl.com', phone: '+91 80000 55555', industry: 'IT Services', revenue: '$11B', openDealsCount: 1, healthScore: 65, recentActivity: 'Paused implementation' },
  { id: 'c-6', name: 'Sunil Mittal', company: 'Bharti Airtel', email: 'sunil.m@airtel.in', phone: '+91 80000 66666', industry: 'Telecommunications', revenue: '$14B', openDealsCount: 2, healthScore: 72, recentActivity: 'Security review pending' },
  { id: 'c-7', name: 'Uday Kotak', company: 'Kotak Mahindra', email: 'uday.k@kotak.com', phone: '+91 80000 77777', industry: 'Banking', revenue: '$6B', openDealsCount: 1, healthScore: 89, recentActivity: 'Requested compliance docs' },
  { id: 'c-8', name: 'Gautam Adani', company: 'Adani Ports', email: 'gautam.a@adani.com', phone: '+91 80000 88888', industry: 'Logistics', revenue: '$12B', openDealsCount: 4, healthScore: 78, recentActivity: 'Negotiating SLAs' },
  { id: 'c-9', name: 'Falguni Nayar', company: 'Nykaa', email: 'falguni.n@nykaa.com', phone: '+91 80000 99999', industry: 'E-commerce', revenue: '$500M', openDealsCount: 2, healthScore: 94, recentActivity: 'Requested API access' },
  { id: 'c-10', name: 'Vijay Shekhar', company: 'Paytm', email: 'vijay.s@paytm.com', phone: '+91 80000 00000', industry: 'FinTech', revenue: '$1B', openDealsCount: 1, healthScore: 50, recentActivity: 'Complained about latency' }
];
""",
    'tasks.ts': """export interface Task {
  id: string;
  title: string;
  deadline: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'In Progress' | 'Completed';
  assignedUser: string;
  linkedDeal?: string;
}

export const mockTasks: Task[] = [
  { id: 't-1', title: 'Draft proposal for Tata Motors', deadline: 'Today', priority: 'High', status: 'Todo', assignedUser: 'Amit Patel', linkedDeal: 'Tata Motors AI Fleet' },
  { id: 't-2', title: 'Follow up on MSA with Legal for Reliance', deadline: 'Tomorrow', priority: 'Medium', status: 'In Progress', assignedUser: 'Rajesh Kumar', linkedDeal: 'Reliance Q3 Retail Expansion' },
  { id: 't-3', title: 'Send pricing sheet to Infosys', deadline: 'Tomorrow', priority: 'High', status: 'Todo', assignedUser: 'Priya Sharma', linkedDeal: 'Infosys Core Banking Upgrade' },
  { id: 't-4', title: 'Security questionnaire for Airtel', deadline: 'Yesterday', priority: 'High', status: 'Completed', assignedUser: 'Priya Sharma', linkedDeal: 'Airtel API Gateway' },
  { id: 't-5', title: 'Schedule product demo for Paytm', deadline: 'Next Week', priority: 'Low', status: 'In Progress', assignedUser: 'Amit Patel', linkedDeal: 'Paytm Payment Gateway Redo' },
  { id: 't-6', title: 'Quarterly review prep', deadline: 'Next Week', priority: 'Medium', status: 'Completed', assignedUser: 'Rajesh Kumar' },
  { id: 't-7', title: 'Review compliance for Kotak', deadline: 'Today', priority: 'High', status: 'In Progress', assignedUser: 'Amit Patel', linkedDeal: 'Kotak Compliance Engine' },
  { id: 't-8', title: 'Adjust discount for Adani Ports', deadline: 'Tomorrow', priority: 'High', status: 'Todo', assignedUser: 'Neha Gupta', linkedDeal: 'Adani Logistics Hub' },
  { id: 't-9', title: 'Finalize onboarding doc for Biocon', deadline: 'Yesterday', priority: 'Medium', status: 'Completed', assignedUser: 'Neha Gupta', linkedDeal: 'Biocon R&D Cloud Migration' },
  { id: 't-10', title: 'Update whitepaper for HCL', deadline: 'Next Week', priority: 'Low', status: 'Todo', assignedUser: 'Rajesh Kumar', linkedDeal: 'HCL Support Software' },
  { id: 't-11', title: 'Finalize rollout schedule for Nykaa', deadline: 'Today', priority: 'High', status: 'In Progress', assignedUser: 'Priya Sharma', linkedDeal: 'Nykaa E-comm Analytics' },
  { id: 't-12', title: 'Prepare EV dashboard demo for Tata', deadline: 'Tomorrow', priority: 'Medium', status: 'Todo', assignedUser: 'Amit Patel', linkedDeal: 'Tata EV Infrastructure' },
  { id: 't-13', title: 'Call Sunil regarding Airtel Tower', deadline: 'Next Tuesday', priority: 'Medium', status: 'Todo', assignedUser: 'Priya Sharma', linkedDeal: 'Airtel Tower Tracking' },
  { id: 't-14', title: 'Draft case study for Adani', deadline: 'Friday', priority: 'Low', status: 'In Progress', assignedUser: 'Neha Gupta', linkedDeal: 'Adani Warehousing Software' },
  { id: 't-15', title: 'Sign contract with Nykaa Beauty', deadline: 'Today', priority: 'High', status: 'Todo', assignedUser: 'Priya Sharma', linkedDeal: 'Nykaa Beauty Marketplace' }
];
""",
    'emails.ts': """export interface Email {
  id: string;
  dealId: string;
  subject: string;
  snippet: string;
  body: string;
  date: string;
  direction: 'inbound' | 'outbound';
  sender: string;
  recipient: string;
  tone: 'Professional' | 'Friendly' | 'Urgent' | 'Neutral';
}

export const mockEmails: Email[] = [
  { id: 'e-1', dealId: 'd-101', subject: 'Re: Revised Proposal', snippet: 'The new numbers look good. We will run this by our legal team...', body: 'Hi Rajesh,\\n\\nThe new numbers look good. We will run this by our legal team to ensure all clauses meet our corporate compliance standards. Expect an update by Thursday.\\n\\nRegards,\\nAnil', date: new Date().toISOString(), direction: 'inbound', sender: 'anil@relianceretail.com', recipient: 'rajesh.k@dealmind.ai', tone: 'Professional' },
  { id: 'e-2', dealId: 'd-101', subject: 'Revised Proposal attached', snippet: 'Hi Anil, attached is the updated proposal reflecting...', body: 'Hi Anil,\\n\\nAttached is the updated proposal reflecting the 10% volume discount we discussed yesterday. Let me know if you need any clarification.\\n\\nBest,\\nRajesh', date: new Date(Date.now() - 86400000).toISOString(), direction: 'outbound', sender: 'rajesh.k@dealmind.ai', recipient: 'anil@relianceretail.com', tone: 'Friendly' },
  { id: 'e-3', dealId: 'd-107', subject: 'Compliance Documents Request', snippet: 'Can you please provide the SOC2 Type II report for our review?', body: 'Hello Amit,\\n\\nBefore we proceed with the signature, our InfoSec team requires the latest SOC2 Type II report and the penetration test summary. Please send these over ASAP.\\n\\nThanks,\\nUday', date: new Date(Date.now() - 4000000).toISOString(), direction: 'inbound', sender: 'uday.k@kotak.com', recipient: 'amit.p@dealmind.ai', tone: 'Urgent' },
  { id: 'e-4', dealId: 'd-107', subject: 'Re: Compliance Documents Request', snippet: 'Absolutely, I have attached the requested SOC2 report and...', body: 'Hi Uday,\\n\\nAbsolutely, I have attached the requested SOC2 report and pen-test summary. Please note these are under NDA.\\n\\nRegards,\\nAmit', date: new Date().toISOString(), direction: 'outbound', sender: 'amit.p@dealmind.ai', recipient: 'uday.k@kotak.com', tone: 'Professional' }
];

export interface Conversation {
  id: string;
  contact: string;
  subject: string;
  date: string;
  snippet: string;
  unread: boolean;
}

export const mockConversations: Conversation[] = [
  { id: 't1', contact: 'Anil Ambani (Reliance)', subject: 'Re: Revised Proposal', date: '10:30 AM', snippet: 'The new numbers look good. We will run this by our legal team...', unread: true },
  { id: 't2', contact: 'N. R. Narayana Murthy (Infosys)', subject: 'Pricing Questions', date: 'Yesterday', snippet: 'Is there flexibility on the per-seat pricing?', unread: false },
  { id: 't3', contact: 'Ratan Tata', subject: 'Next Steps', date: 'Oct 24', snippet: 'Let us schedule a kickoff call next week.', unread: false },
  { id: 't4', contact: 'Falguni Nayar', subject: 'Security Review', date: 'Oct 22', snippet: 'Our CISO approved the architecture.', unread: false },
];
""",
    'notifications.ts': """export interface Notification {
  id: string;
  type: 'Meeting' | 'Risk' | 'Task' | 'Email' | 'Alert';
  message: string;
  read: boolean;
  timestamp: string;
}

export const mockNotifications: Notification[] = [
  { id: 'n-1', type: 'Meeting', message: 'Upcoming Meeting with Reliance Retail in 15 mins.', read: false, timestamp: new Date().toISOString() },
  { id: 'n-2', type: 'Risk', message: 'Paytm Payment Gateway deal health dropped to 40.', read: false, timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: 'n-3', type: 'Task', message: 'Task "Draft proposal for Tata Motors" is due today.', read: true, timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: 'n-4', type: 'Email', message: 'New email from Uday Kotak (Kotak Mahindra).', read: false, timestamp: new Date(Date.now() - 14400000).toISOString() },
  { id: 'n-5', type: 'Alert', message: 'Competitor "TCS" mentioned by Reliance Retail.', read: true, timestamp: new Date(Date.now() - 86400000).toISOString() },
];
""",
    'meetings.ts': """export interface AnalyzedMeeting {
  id: string;
  title: string;
  date: string;
  companyName: string;
  duration: string;
  summary: string;
  actionItems: { task: string; owner: string }[];
  questionsAsked: string[];
  objections: string[];
  keywords: string[];
  customerConcerns: string[];
  aiRecommendations: string[];
  transcript: { speaker: string; time: string; text: string }[];
  sentimentTimeline: { time: string; score: number }[];
}

export const mockAnalyzedMeetings: AnalyzedMeeting[] = [
  {
    id: "m-101",
    title: "Technical Discovery Call",
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    companyName: "Reliance Retail",
    duration: "45m",
    summary: "The technical team from Reliance walked through their current architecture. They are highly interested in our API capabilities but expressed concerns over rate limits and SLA guarantees.",
    actionItems: [
      { task: "Send API documentation and rate limit tiers", owner: "Rajesh Kumar" },
      { task: "Schedule follow-up with their security lead", owner: "Rajesh Kumar" }
    ],
    questionsAsked: ["What are the default API rate limits?", "Do you offer custom SLAs for enterprise?", "How does the webhook system handle retries?"],
    objections: ["Rate limits seem restrictive for our volume"],
    keywords: ["API", "Webhooks", "SLA", "Enterprise", "Integration"],
    customerConcerns: ["Potential throttling during peak load (Diwali sales)"],
    aiRecommendations: ["Propose the Enterprise Plus tier which includes custom rate limits.", "Draft an email looping in our Solutions Architect."],
    transcript: [
      { speaker: "Rajesh Kumar", time: "00:00", text: "Hi Anil, thanks for joining. Let's dive right into the technical requirements." },
      { speaker: "Anil (Reliance)", time: "01:15", text: "Hi, yes. Our main concern right now is the API rate limits, especially during Diwali sales." },
      { speaker: "Rajesh Kumar", time: "02:30", text: "Understood. Our standard tier allows 10k requests/min, but we can customize that." },
      { speaker: "Anil (Reliance)", time: "03:45", text: "That's good to hear. What about the SLAs?" }
    ],
    sentimentTimeline: [ { time: "0m", score: 60 }, { time: "10m", score: 45 }, { time: "20m", score: 75 }, { time: "30m", score: 85 }, { time: "45m", score: 90 } ]
  },
  {
    id: "m-102",
    title: "Pricing Negotiation",
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    companyName: "Infosys Tech",
    duration: "30m",
    summary: "Discussed the proposed pricing model. The client is pushing for a discount. Sentiment was slightly negative during the pricing reveal but recovered when discussing implementation support.",
    actionItems: [ { task: "Revise proposal with a 10% discount concession", owner: "Priya Sharma" } ],
    questionsAsked: ["Is there flexibility on the per-seat pricing?", "Can we waive the implementation fee?"],
    objections: ["Wipro offered a 20% discount", "Implementation fee is too high"],
    keywords: ["Pricing", "Discount", "Implementation", "Competitor"],
    customerConcerns: ["Budget constraints for this quarter"],
    aiRecommendations: ["Hold firm on implementation fee, but offer the 10% seat discount.", "Highlight our faster time-to-value compared to Wipro."],
    transcript: [
      { speaker: "Priya Sharma", time: "00:00", text: "Let's review the pricing proposal I sent over yesterday." },
      { speaker: "N. R. Narayana Murthy", time: "02:10", text: "To be honest, it's higher than we budgeted. Wipro is offering a 20% discount." },
      { speaker: "Priya Sharma", time: "04:30", text: "I understand. While we can't match 20%, our implementation is fully managed." },
      { speaker: "N. R. Narayana Murthy", time: "06:15", text: "That is a fair point. If you can move slightly on the seat cost, we might have a deal." }
    ],
    sentimentTimeline: [ { time: "0m", score: 70 }, { time: "5m", score: 30 }, { time: "15m", score: 40 }, { time: "25m", score: 65 }, { time: "30m", score: 75 } ]
  },
  {
    id: "m-103",
    title: "Security Compliance Review",
    date: new Date(Date.now() - 86400000 * 1).toISOString(),
    companyName: "Kotak Mahindra",
    duration: "60m",
    summary: "Deep dive into SOC2 compliance and data residency. Client requires data to remain in Mumbai region.",
    actionItems: [ { task: "Send SOC2 Type II report", owner: "Amit Patel" } ],
    questionsAsked: ["Where is the data stored?", "Do you have SOC2 Type II?"],
    objections: ["Audit logs duration is only 30 days"],
    keywords: ["Compliance", "SOC2", "Data Residency", "Mumbai"],
    customerConcerns: ["Regulatory requirements for Banking sector"],
    aiRecommendations: ["Confirm Mumbai AWS region deployment.", "Offer extended audit logs add-on."],
    transcript: [
      { speaker: "Amit Patel", time: "00:00", text: "Welcome to the compliance review." },
      { speaker: "Uday Kotak", time: "05:10", text: "Our main requirement is that all data must reside in the Mumbai region." },
      { speaker: "Amit Patel", time: "06:30", text: "Yes, we fully support the AWS ap-south-1 region." }
    ],
    sentimentTimeline: [ { time: "0m", score: 50 }, { time: "20m", score: 80 }, { time: "40m", score: 85 }, { time: "60m", score: 90 } ]
  }
];

export const mockMeetings = [
  { id: 'm1', title: 'Reliance Final Review', time: 'Today, 2:00 PM', participants: 4, platform: 'Zoom' },
  { id: 'm2', title: 'Infosys Kickoff', time: 'Tomorrow, 10:00 AM', participants: 6, platform: 'Teams' },
];
""",
    'deals.ts': """import { DealStage, RiskLevel } from './users';
import { mockEmails } from './emails';
import { mockTasks } from './tasks';

export interface DealAIFeatures {
  winProbability: number;
  dealHealthScore: number;
  riskPrediction: RiskLevel;
  customerSentiment: number;
  buyingIntent: 'Low' | 'Medium' | 'High';
  competitorMentions: string[];
  decisionMaker: string;
  nextBestAction: string;
  priorityScore: number;
  urgency: 'Low' | 'Medium' | 'High';
  objectionDetection: string[];
}

export const mockAIFeatures: Record<string, DealAIFeatures> = {
  'd-101': { winProbability: 85, dealHealthScore: 88, riskPrediction: 'Low', customerSentiment: 92, buyingIntent: 'High', competitorMentions: ['TCS'], decisionMaker: 'Anil Ambani', nextBestAction: 'Send updated MSA with the requested SLA clauses.', priorityScore: 90, urgency: 'High', objectionDetection: ['Rate limits seem restrictive'] },
  'd-102': { winProbability: 30, dealHealthScore: 45, riskPrediction: 'High', customerSentiment: 45, buyingIntent: 'Low', competitorMentions: ['Wipro'], decisionMaker: 'N. R. Narayana Murthy', nextBestAction: 'Highlight faster time-to-value.', priorityScore: 95, urgency: 'Medium', objectionDetection: ['Competitor offered a 20% discount'] },
  'd-103': { winProbability: 60, dealHealthScore: 75, riskPrediction: 'Medium', customerSentiment: 78, buyingIntent: 'Medium', competitorMentions: [], decisionMaker: 'Ratan Tata', nextBestAction: 'Draft Intro Email to Executive Sponsor', priorityScore: 80, urgency: 'High', objectionDetection: ['Data residency compliance'] },
  'd-104': { winProbability: 95, dealHealthScore: 98, riskPrediction: 'Low', customerSentiment: 95, buyingIntent: 'High', competitorMentions: [], decisionMaker: 'Kiran Mazumdar-Shaw', nextBestAction: 'Send DocuSign contract', priorityScore: 70, urgency: 'High', objectionDetection: [] },
  'd-105': { winProbability: 15, dealHealthScore: 35, riskPrediction: 'High', customerSentiment: 40, buyingIntent: 'Low', competitorMentions: ['Tech Mahindra', 'Cognizant'], decisionMaker: 'Shiv Nadar', nextBestAction: 'Re-engage technical team with updated whitepaper', priorityScore: 60, urgency: 'Low', objectionDetection: ['Missing on-prem deployment'] },
  'd-106': { winProbability: 70, dealHealthScore: 68, riskPrediction: 'Medium', customerSentiment: 65, buyingIntent: 'Medium', competitorMentions: ['Jio'], decisionMaker: 'Sunil Mittal', nextBestAction: 'Prepare for security audit', priorityScore: 85, urgency: 'High', objectionDetection: ['Security compliance'] },
  'd-107': { winProbability: 88, dealHealthScore: 85, riskPrediction: 'Low', customerSentiment: 80, buyingIntent: 'High', competitorMentions: ['HDFC'], decisionMaker: 'Uday Kotak', nextBestAction: 'Follow up on compliance review', priorityScore: 90, urgency: 'Medium', objectionDetection: ['Audit logs duration'] },
  'd-108': { winProbability: 55, dealHealthScore: 60, riskPrediction: 'Medium', customerSentiment: 65, buyingIntent: 'Medium', competitorMentions: [], decisionMaker: 'Gautam Adani', nextBestAction: 'Clarify SLA penalties', priorityScore: 85, urgency: 'High', objectionDetection: ['SLA penalty caps'] },
  'd-109': { winProbability: 92, dealHealthScore: 90, riskPrediction: 'Low', customerSentiment: 95, buyingIntent: 'High', competitorMentions: ['Myntra'], decisionMaker: 'Falguni Nayar', nextBestAction: 'Finalize implementation timeline', priorityScore: 90, urgency: 'High', objectionDetection: [] },
  'd-110': { winProbability: 25, dealHealthScore: 40, riskPrediction: 'High', customerSentiment: 35, buyingIntent: 'Low', competitorMentions: ['PhonePe', 'Razorpay'], decisionMaker: 'Vijay Shekhar', nextBestAction: 'Set up engineering meeting for latency issues', priorityScore: 95, urgency: 'High', objectionDetection: ['API latency is too high'] },
  'd-111': { winProbability: 45, dealHealthScore: 55, riskPrediction: 'Medium', customerSentiment: 60, buyingIntent: 'Medium', competitorMentions: [], decisionMaker: 'Anil Ambani', nextBestAction: 'Clarify integration scope', priorityScore: 60, urgency: 'Medium', objectionDetection: ['Integration effort'] },
  'd-112': { winProbability: 80, dealHealthScore: 82, riskPrediction: 'Low', customerSentiment: 75, buyingIntent: 'High', competitorMentions: ['Mahindra'], decisionMaker: 'Ratan Tata', nextBestAction: 'Provide custom pricing plan', priorityScore: 75, urgency: 'Low', objectionDetection: [] },
  'd-113': { winProbability: 65, dealHealthScore: 70, riskPrediction: 'Medium', customerSentiment: 70, buyingIntent: 'Medium', competitorMentions: [], decisionMaker: 'Gautam Adani', nextBestAction: 'Provide logistics case study', priorityScore: 70, urgency: 'Medium', objectionDetection: [] },
  'd-114': { winProbability: 40, dealHealthScore: 50, riskPrediction: 'Medium', customerSentiment: 55, buyingIntent: 'Low', competitorMentions: [], decisionMaker: 'Sunil Mittal', nextBestAction: 'Schedule technical deep dive', priorityScore: 65, urgency: 'Medium', objectionDetection: [] },
  'd-115': { winProbability: 85, dealHealthScore: 85, riskPrediction: 'Low', customerSentiment: 80, buyingIntent: 'High', competitorMentions: [], decisionMaker: 'Falguni Nayar', nextBestAction: 'Finalize terms', priorityScore: 85, urgency: 'Medium', objectionDetection: [] }
};

export interface Deal {
  id: string;
  dealName: string;
  companyName: string;
  contactName: string;
  owner: string;
  amount: number;
  stage: DealStage;
  closeDate: string;
  probability: number;
  priority: 'High' | 'Medium' | 'Low';
  riskLevel: RiskLevel;
  nextMeeting: string;
  status: 'Active' | 'Paused' | 'Blocked';
  nextStep: string;
  lastActivity: string;
  sentimentScore: number;
}

export let mockDeals: Deal[] = [
  { id: 'd-101', dealName: 'Reliance Q3 Retail Expansion', companyName: 'Reliance Retail', contactName: 'Anil Ambani', owner: 'Rajesh Kumar', amount: 1250000, stage: 'Negotiation', closeDate: new Date(Date.now() + 14 * 86400000).toISOString(), probability: mockAIFeatures['d-101'].winProbability, priority: 'High', riskLevel: mockAIFeatures['d-101'].riskPrediction, nextMeeting: 'Tomorrow, 2:00 PM', status: 'Active', nextStep: 'Send finalized contract', lastActivity: new Date(Date.now() - 86400000).toISOString(), sentimentScore: mockAIFeatures['d-101'].customerSentiment },
  { id: 'd-102', dealName: 'Infosys Core Banking Upgrade', companyName: 'Infosys Tech', contactName: 'N. R. Narayana Murthy', owner: 'Priya Sharma', amount: 3500000, stage: 'Discovery', closeDate: new Date(Date.now() + 45 * 86400000).toISOString(), probability: mockAIFeatures['d-102'].winProbability, priority: 'High', riskLevel: mockAIFeatures['d-102'].riskPrediction, nextMeeting: 'Next Monday, 10:00 AM', status: 'Paused', nextStep: 'Schedule technical deep dive', lastActivity: new Date(Date.now() - 3 * 86400000).toISOString(), sentimentScore: mockAIFeatures['d-102'].customerSentiment },
  { id: 'd-103', dealName: 'Tata Motors AI Fleet', companyName: 'Tata Motors', contactName: 'Ratan Tata', owner: 'Amit Patel', amount: 8500000, stage: 'Demo', closeDate: new Date(Date.now() + 30 * 86400000).toISOString(), probability: mockAIFeatures['d-103'].winProbability, priority: 'Medium', riskLevel: mockAIFeatures['d-103'].riskPrediction, nextMeeting: 'No meeting scheduled', status: 'Active', nextStep: 'Executive presentation', lastActivity: new Date(Date.now() - 5 * 86400000).toISOString(), sentimentScore: mockAIFeatures['d-103'].customerSentiment },
  { id: 'd-104', dealName: 'Biocon R&D Cloud Migration', companyName: 'Biocon', contactName: 'Kiran Mazumdar-Shaw', owner: 'Neha Gupta', amount: 220000, stage: 'Closed Won', closeDate: new Date(Date.now() - 2 * 86400000).toISOString(), probability: mockAIFeatures['d-104'].winProbability, priority: 'High', riskLevel: mockAIFeatures['d-104'].riskPrediction, nextMeeting: 'N/A', status: 'Active', nextStep: 'Onboarding', lastActivity: new Date().toISOString(), sentimentScore: mockAIFeatures['d-104'].customerSentiment },
  { id: 'd-105', dealName: 'HCL Support Software', companyName: 'HCL Technologies', contactName: 'Shiv Nadar', owner: 'Rajesh Kumar', amount: 450000, stage: 'Negotiation', closeDate: new Date(Date.now() + 60 * 86400000).toISOString(), probability: mockAIFeatures['d-105'].winProbability, priority: 'Medium', riskLevel: mockAIFeatures['d-105'].riskPrediction, nextMeeting: 'Next Friday', status: 'Blocked', nextStep: 'Wait for architecture approval', lastActivity: new Date(Date.now() - 14 * 86400000).toISOString(), sentimentScore: mockAIFeatures['d-105'].customerSentiment },
  { id: 'd-106', dealName: 'Airtel API Gateway', companyName: 'Bharti Airtel', contactName: 'Sunil Mittal', owner: 'Priya Sharma', amount: 3200000, stage: 'Demo', closeDate: new Date(Date.now() + 15 * 86400000).toISOString(), probability: mockAIFeatures['d-106'].winProbability, priority: 'High', riskLevel: mockAIFeatures['d-106'].riskPrediction, nextMeeting: 'Tomorrow, 4:00 PM', status: 'Active', nextStep: 'Prepare security presentation', lastActivity: new Date(Date.now() - 2 * 86400000).toISOString(), sentimentScore: mockAIFeatures['d-106'].customerSentiment },
  { id: 'd-107', dealName: 'Kotak Compliance Engine', companyName: 'Kotak Mahindra', contactName: 'Uday Kotak', owner: 'Amit Patel', amount: 1500000, stage: 'Negotiation', closeDate: new Date(Date.now() + 5 * 86400000).toISOString(), probability: mockAIFeatures['d-107'].winProbability, priority: 'High', riskLevel: mockAIFeatures['d-107'].riskPrediction, nextMeeting: 'Today, 5:00 PM', status: 'Active', nextStep: 'Final compliance review', lastActivity: new Date().toISOString(), sentimentScore: mockAIFeatures['d-107'].customerSentiment },
  { id: 'd-108', dealName: 'Adani Logistics Hub', companyName: 'Adani Ports', contactName: 'Gautam Adani', owner: 'Neha Gupta', amount: 5000000, stage: 'Negotiation', closeDate: new Date(Date.now() + 20 * 86400000).toISOString(), probability: mockAIFeatures['d-108'].winProbability, priority: 'High', riskLevel: mockAIFeatures['d-108'].riskPrediction, nextMeeting: 'Thursday, 11:00 AM', status: 'Active', nextStep: 'Discuss SLA penalties', lastActivity: new Date(Date.now() - 3 * 86400000).toISOString(), sentimentScore: mockAIFeatures['d-108'].customerSentiment },
  { id: 'd-109', dealName: 'Nykaa E-comm Analytics', companyName: 'Nykaa', contactName: 'Falguni Nayar', owner: 'Priya Sharma', amount: 750000, stage: 'Negotiation', closeDate: new Date(Date.now() + 7 * 86400000).toISOString(), probability: mockAIFeatures['d-109'].winProbability, priority: 'High', riskLevel: mockAIFeatures['d-109'].riskPrediction, nextMeeting: 'Tomorrow, 1:00 PM', status: 'Active', nextStep: 'Finalize rollout schedule', lastActivity: new Date(Date.now() - 86400000).toISOString(), sentimentScore: mockAIFeatures['d-109'].customerSentiment },
  { id: 'd-110', dealName: 'Paytm Payment Gateway Redo', companyName: 'Paytm', contactName: 'Vijay Shekhar', owner: 'Amit Patel', amount: 2800000, stage: 'Discovery', closeDate: new Date(Date.now() + 90 * 86400000).toISOString(), probability: mockAIFeatures['d-110'].winProbability, priority: 'High', riskLevel: mockAIFeatures['d-110'].riskPrediction, nextMeeting: 'Next Wednesday', status: 'Paused', nextStep: 'Engineering sync on latency', lastActivity: new Date(Date.now() - 7 * 86400000).toISOString(), sentimentScore: mockAIFeatures['d-110'].customerSentiment },
  { id: 'd-111', dealName: 'Reliance Jio Integrations', companyName: 'Reliance Retail', contactName: 'Anil Ambani', owner: 'Rajesh Kumar', amount: 450000, stage: 'Discovery', closeDate: new Date(Date.now() + 60 * 86400000).toISOString(), probability: mockAIFeatures['d-111'].winProbability, priority: 'Medium', riskLevel: mockAIFeatures['d-111'].riskPrediction, nextMeeting: 'Next Monday', status: 'Active', nextStep: 'Scope out integration', lastActivity: new Date(Date.now() - 4 * 86400000).toISOString(), sentimentScore: mockAIFeatures['d-111'].customerSentiment },
  { id: 'd-112', dealName: 'Tata EV Infrastructure', companyName: 'Tata Motors', contactName: 'Ratan Tata', owner: 'Amit Patel', amount: 1200000, stage: 'Demo', closeDate: new Date(Date.now() + 40 * 86400000).toISOString(), probability: mockAIFeatures['d-112'].winProbability, priority: 'High', riskLevel: mockAIFeatures['d-112'].riskPrediction, nextMeeting: 'Tomorrow, 9:00 AM', status: 'Active', nextStep: 'Demo EV dashboard', lastActivity: new Date(Date.now() - 1 * 86400000).toISOString(), sentimentScore: mockAIFeatures['d-112'].customerSentiment },
  { id: 'd-113', dealName: 'Adani Warehousing Software', companyName: 'Adani Ports', contactName: 'Gautam Adani', owner: 'Neha Gupta', amount: 650000, stage: 'Demo', closeDate: new Date(Date.now() + 50 * 86400000).toISOString(), probability: mockAIFeatures['d-113'].winProbability, priority: 'Medium', riskLevel: mockAIFeatures['d-113'].riskPrediction, nextMeeting: 'Friday, 3:00 PM', status: 'Active', nextStep: 'Present logistics features', lastActivity: new Date(Date.now() - 2 * 86400000).toISOString(), sentimentScore: mockAIFeatures['d-113'].customerSentiment },
  { id: 'd-114', dealName: 'Airtel Tower Tracking', companyName: 'Bharti Airtel', contactName: 'Sunil Mittal', owner: 'Priya Sharma', amount: 1100000, stage: 'Discovery', closeDate: new Date(Date.now() + 80 * 86400000).toISOString(), probability: mockAIFeatures['d-114'].winProbability, priority: 'Medium', riskLevel: mockAIFeatures['d-114'].riskPrediction, nextMeeting: 'Next Tuesday', status: 'Active', nextStep: 'Determine requirements', lastActivity: new Date(Date.now() - 6 * 86400000).toISOString(), sentimentScore: mockAIFeatures['d-114'].customerSentiment },
  { id: 'd-115', dealName: 'Nykaa Beauty Marketplace', companyName: 'Nykaa', contactName: 'Falguni Nayar', owner: 'Priya Sharma', amount: 850000, stage: 'Negotiation', closeDate: new Date(Date.now() + 10 * 86400000).toISOString(), probability: mockAIFeatures['d-115'].winProbability, priority: 'High', riskLevel: mockAIFeatures['d-115'].riskPrediction, nextMeeting: 'Today, 2:00 PM', status: 'Active', nextStep: 'Sign contract', lastActivity: new Date().toISOString(), sentimentScore: mockAIFeatures['d-115'].customerSentiment }
];

export const addDeal = (deal: Deal) => {
  mockDeals = [deal, ...mockDeals];
};

export interface DealDetailsData {
  dealId: string;
  dealHealthScore: number;
  competitorMentions: string[];
  urgency: 'Low' | 'Medium' | 'High';
  buyingIntent: 'Low' | 'Medium' | 'High';
  budget: string;
  decisionMaker: string;
  painPoints: string[];
  recommendedNextAction: string;
  attachments: { name: string; type: string; size: string; date: string }[];
  timeline: { id: string; type: 'email' | 'meeting' | 'note' | 'status_change'; title: string; date: string; description: string }[];
  notes: { id: string; text: string; author: string; date: string }[];
  emails: { id: string; subject: string; snippet: string; date: string; direction: 'inbound' | 'outbound' }[];
  tasks: { id: string; title: string; status: 'Pending' | 'Completed'; dueDate: string }[];
}

export const mockDealDetails: Record<string, DealDetailsData> = {};

mockDeals.forEach(deal => {
  mockDealDetails[deal.id] = {
    dealId: deal.id,
    dealHealthScore: mockAIFeatures[deal.id]?.dealHealthScore || 50,
    competitorMentions: mockAIFeatures[deal.id]?.competitorMentions || [],
    urgency: mockAIFeatures[deal.id]?.urgency || 'Medium',
    buyingIntent: mockAIFeatures[deal.id]?.buyingIntent || 'Medium',
    budget: `${deal.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 })} Approved`,
    decisionMaker: mockAIFeatures[deal.id]?.decisionMaker || deal.contactName,
    painPoints: ['Legacy system inefficiencies', 'High operational costs', 'Lack of real-time insights'],
    recommendedNextAction: mockAIFeatures[deal.id]?.nextBestAction || 'Follow up with stakeholders',
    attachments: [
      { name: `${deal.companyName}_Proposal.pdf`, type: 'pdf', size: '2.4 MB', date: new Date().toISOString() },
      { name: 'Pricing_Sheet.xlsx', type: 'excel', size: '1.1 MB', date: new Date(Date.now() - 86400000).toISOString() }
    ],
    timeline: [
      { id: `t1-${deal.id}`, type: 'status_change', title: `Moved to ${deal.stage}`, date: new Date().toISOString(), description: `Deal progressed to ${deal.stage}.` },
      { id: `t2-${deal.id}`, type: 'meeting', title: 'Technical Deep Dive', date: new Date(Date.now() - 172800000).toISOString(), description: 'Reviewed capabilities with the engineering team.' }
    ],
    notes: [
      { id: `n1-${deal.id}`, text: `${deal.contactName} seems eager to close soon. Need to align with their budget cycle.`, author: deal.owner, date: new Date().toISOString() }
    ],
    emails: mockEmails.filter(e => e.dealId === deal.id).map(e => ({ id: e.id, subject: e.subject, snippet: e.snippet, date: e.date, direction: e.direction })),
    tasks: mockTasks.filter(t => t.linkedDeal === deal.dealName).map(t => ({ id: t.id, title: t.title, status: t.status === 'Completed' ? 'Completed' : 'Pending', dueDate: t.deadline }))
  };
});

export interface GlobalAIAnalysis {
  executiveSummary: string;
  customerIntent: string;
  sentimentAnalysis: string;
  riskFactors: string[];
  positiveSignals: string[];
  negativeSignals: string[];
  buyingStage: string;
  nextBestAction: string;
  objectionsDetected: string[];
  competitorMentions: string[];
  decisionMakers: string[];
  budgetSignals: string;
  confidenceScore: number;
}

export const mockGlobalAIAnalysis: GlobalAIAnalysis = {
  executiveSummary: "Pipeline health is strong in the manufacturing and retail sectors, but IT services deals are stalling in technical reviews. Focus is needed on expediting InfoSec compliance.",
  customerIntent: "High intent across traditional enterprises, hesitation in tech sector due to budget cuts.",
  sentimentAnalysis: "Overall Positive (78%), trending up from last month.",
  riskFactors: ["Security review bottlenecks", "Competitors like TCS and Infosys offering bundled services", "Latency complaints from FinTech prospects"],
  positiveSignals: ["Budget approvals accelerating in Retail", "High engagement on EV infrastructure demos"],
  negativeSignals: ["Procurement cycle extending by 14 days", "Pricing pushback from IT prospects"],
  buyingStage: "Majority in Evaluation & Demo stages.",
  nextBestAction: "Deploy 'InfoSec Fast-Track' collateral to all enterprise deals in negotiation.",
  objectionsDetected: ["Implementation time", "Data residency in India", "Integration limitations"],
  competitorMentions: ["TCS", "Infosys", "Wipro", "Tech Mahindra"],
  decisionMakers: ["VP of Engineering", "CFO", "Director of IT", "CISO"],
  budgetSignals: "Budgets are tightening for Q4; push for Q3 closes.",
  confidenceScore: 82
};

export const mockInsights = {
  totalPipeline: 20290000,
  winRate: 42.5,
  avgDealCycle: 34,
  dealsAtRisk: 3,
  totalDeals: 156,
  openDeals: 42,
  wonDeals: 89,
  lostDeals: 25,
  revenue: 4500000,
  averageDealValue: 1250000,
  pipelineHealth: 85,
  aiConfidence: 92
};

export const mockMonthlyRevenue = [
  { month: 'Jan', revenue: 3000000 },
  { month: 'Feb', revenue: 4500000 },
  { month: 'Mar', revenue: 4200000 },
  { month: 'Apr', revenue: 6000000 },
  { month: 'May', revenue: 8000000 },
  { month: 'Jun', revenue: 7500000 },
];

export const mockFunnelData = [
  { stage: 'Discovery', count: 42, amount: 21000000 },
  { stage: 'Demo', count: 28, amount: 15000000 },
  { stage: 'Negotiation', count: 12, amount: 8000000 },
  { stage: 'Closed Won', count: 8, amount: 4500000 },
];

export const mockSalesPerformance = [
  { rep: 'Rajesh Kumar', won: 4500000, target: 5000000 },
  { rep: 'Priya Sharma', won: 6500000, target: 5000000 },
  { rep: 'Amit Patel', won: 3800000, target: 4000000 },
  { rep: 'Neha Gupta', won: 5200000, target: 4500000 },
];

export const mockActivities = [
  { id: 'a1', title: 'Email sent to Anil Ambani (Reliance)', type: 'email', date: new Date().toISOString() },
  { id: 'a2', title: 'Meeting completed with Infosys', type: 'meeting', date: new Date(Date.now() - 3600000).toISOString() },
  { id: 'a3', title: 'Contract signed by Biocon', type: 'contract', date: new Date(Date.now() - 7200000).toISOString() },
];

export const mockRecommendations = [
  { id: 'r1', type: 'High Risk', description: 'Paytm deal showing severe latency concerns', urgency: 'High', actionLabel: 'Set up engineering meeting' },
  { id: 'r2', type: 'Upsell', description: 'Reliance likely to upgrade to Enterprise Plus', urgency: 'Medium', actionLabel: 'View Playbook' },
  { id: 'r3', type: 'Priority', description: 'Tata Motors deal needs executive sponsor', urgency: 'High', actionLabel: 'Draft Intro Email' },
];
""",
    'index.ts': """export * from './users';
export * from './customers';
export * from './tasks';
export * from './emails';
export * from './notifications';
export * from './meetings';
export * from './deals';
"""
}

for name, content in files.items():
    with open(os.path.join('src/lib/mock-data', name), 'w') as f:
        f.write(content)

