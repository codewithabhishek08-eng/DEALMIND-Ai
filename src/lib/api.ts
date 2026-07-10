import { 
  mockDeals, mockConversations, mockInsights, addDeal as addDealToMock,
  mockMonthlyRevenue, mockFunnelData, mockSalesPerformance,
  mockActivities, mockMeetings, mockTasks, mockRecommendations, Deal,
  mockDealDetails, DealDetailsData,
  mockGlobalAIAnalysis, GlobalAIAnalysis,
  mockAnalyzedMeetings, AnalyzedMeeting,
  Task, Customer, mockCustomers,
  mockAIFeatures, DealAIFeatures,
  Email, mockEmails, Notification, mockNotifications,
  User, mockUsers
} from './mock-data';

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getDeals = async (): Promise<Deal[]> => {
  await delay(500);
  return mockDeals;
};

export const getDealById = async (id: string): Promise<Deal | undefined> => {
  await delay(300);
  return mockDeals.find(deal => deal.id === id);
};

export const getAIFeatures = async (dealId?: string): Promise<DealAIFeatures | Record<string, DealAIFeatures>> => {
  await delay(300);
  if (dealId) {
    return mockAIFeatures[dealId];
  }
  return mockAIFeatures;
};

export const createDeal = async (
  dealData: Omit<Deal, 'id' | 'lastActivity' | 'dealName' | 'owner' | 'priority' | 'nextMeeting' | 'status'> 
    & Partial<Pick<Deal, 'dealName' | 'owner' | 'priority' | 'nextMeeting' | 'status'>>
): Promise<Deal> => {
  await delay(800);
  const newDeal: Deal = {
    dealName: `${dealData.companyName} Expansion`,
    owner: 'Unassigned',
    priority: 'Medium',
    nextMeeting: 'Not Scheduled',
    status: 'Active',
    ...dealData,
    id: `d-${Math.floor(Math.random() * 10000)}`,
    lastActivity: new Date().toISOString(),
  };
  addDealToMock(newDeal);
  return newDeal;
};

export const getConversations = async () => {
  await delay(600);
  return mockConversations;
};

export const getInsights = async () => {
  await delay(400);
  return mockInsights;
};

export const getTasks = async (): Promise<Task[]> => {
  await delay(400);
  return mockTasks;
};

export const getCustomers = async (): Promise<Customer[]> => {
  await delay(500);
  return mockCustomers;
};

export const getDashboardData = async () => {
  await delay(700);
  return {
    insights: mockInsights,
    monthlyRevenue: mockMonthlyRevenue,
    funnelData: mockFunnelData,
    salesPerformance: mockSalesPerformance,
    activities: mockActivities,
    meetings: mockMeetings,
    tasks: mockTasks,
    recommendations: mockRecommendations,
  };
};

export const getDealDetails = async (id: string) => {
  await delay(600);
  // Return the specific mock deal details, or a default fallback populated with the deal's name
  const deal = mockDeals.find(d => d.id === id);
  if (!deal) throw new Error("Deal not found");
  
  const details = mockDealDetails[id] || {
    dealId: id,
    dealHealthScore: mockAIFeatures[id]?.dealHealthScore || 75,
    competitorMentions: mockAIFeatures[id]?.competitorMentions || ['Unknown'],
    urgency: mockAIFeatures[id]?.urgency || 'Medium',
    buyingIntent: mockAIFeatures[id]?.buyingIntent || 'Medium',
    budget: 'Under Review',
    decisionMaker: mockAIFeatures[id]?.decisionMaker || deal.contactName,
    painPoints: ['Efficiency', 'Cost'],
    recommendedNextAction: mockAIFeatures[id]?.nextBestAction || 'Schedule follow up call',
    attachments: [],
    timeline: [],
    notes: [],
    emails: [],
    tasks: []
  };
  
  return { deal, details };
};

export const getGlobalAnalysis = async (dealId?: string): Promise<GlobalAIAnalysis> => {
  await delay(600);
  if (dealId && mockAIFeatures[dealId]) {
    const aiData = mockAIFeatures[dealId];
    return {
      executiveSummary: `Focus on ${aiData.decisionMaker}. Next step: ${aiData.nextBestAction}`,
      customerIntent: aiData.buyingIntent,
      sentimentAnalysis: `${aiData.customerSentiment > 50 ? 'Positive' : 'Negative'} (${aiData.customerSentiment}%)`,
      riskFactors: [`Risk Level: ${aiData.riskPrediction}`],
      positiveSignals: aiData.customerSentiment > 70 ? ["High sentiment score", "Active engagement"] : [],
      negativeSignals: aiData.objectionDetection,
      buyingStage: "Evaluation",
      nextBestAction: aiData.nextBestAction,
      objectionsDetected: aiData.objectionDetection,
      competitorMentions: aiData.competitorMentions,
      decisionMakers: [aiData.decisionMaker],
      budgetSignals: "Under Review",
      confidenceScore: aiData.dealHealthScore
    };
  }
  return mockGlobalAIAnalysis;
};

export const getAnalyzedMeetings = async (): Promise<AnalyzedMeeting[]> => {
  await delay(700);
  return mockAnalyzedMeetings;
};

export const getEmails = async (): Promise<Email[]> => {
  await delay(400);
  return mockEmails;
};

export const getNotifications = async (): Promise<Notification[]> => {
  await delay(300);
  return mockNotifications;
};

export const getUsers = async (): Promise<User[]> => {
  await delay(200);
  return mockUsers;
};

