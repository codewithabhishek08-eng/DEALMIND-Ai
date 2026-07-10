import { DealStage, RiskLevel } from './users';
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
