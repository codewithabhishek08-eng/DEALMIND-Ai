export interface AnalyzedMeeting {
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
