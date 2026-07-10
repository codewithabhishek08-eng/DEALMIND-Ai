export interface Email {
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
  { id: 'e-1', dealId: 'd-101', subject: 'Re: Revised Proposal', snippet: 'The new numbers look good. We will run this by our legal team...', body: 'Hi Rajesh,\n\nThe new numbers look good. We will run this by our legal team to ensure all clauses meet our corporate compliance standards. Expect an update by Thursday.\n\nRegards,\nAnil', date: new Date().toISOString(), direction: 'inbound', sender: 'anil@relianceretail.com', recipient: 'rajesh.k@dealmind.ai', tone: 'Professional' },
  { id: 'e-2', dealId: 'd-101', subject: 'Revised Proposal attached', snippet: 'Hi Anil, attached is the updated proposal reflecting...', body: 'Hi Anil,\n\nAttached is the updated proposal reflecting the 10% volume discount we discussed yesterday. Let me know if you need any clarification.\n\nBest,\nRajesh', date: new Date(Date.now() - 86400000).toISOString(), direction: 'outbound', sender: 'rajesh.k@dealmind.ai', recipient: 'anil@relianceretail.com', tone: 'Friendly' },
  { id: 'e-3', dealId: 'd-107', subject: 'Compliance Documents Request', snippet: 'Can you please provide the SOC2 Type II report for our review?', body: 'Hello Amit,\n\nBefore we proceed with the signature, our InfoSec team requires the latest SOC2 Type II report and the penetration test summary. Please send these over ASAP.\n\nThanks,\nUday', date: new Date(Date.now() - 4000000).toISOString(), direction: 'inbound', sender: 'uday.k@kotak.com', recipient: 'amit.p@dealmind.ai', tone: 'Urgent' },
  { id: 'e-4', dealId: 'd-107', subject: 'Re: Compliance Documents Request', snippet: 'Absolutely, I have attached the requested SOC2 report and...', body: 'Hi Uday,\n\nAbsolutely, I have attached the requested SOC2 report and pen-test summary. Please note these are under NDA.\n\nRegards,\nAmit', date: new Date().toISOString(), direction: 'outbound', sender: 'amit.p@dealmind.ai', recipient: 'uday.k@kotak.com', tone: 'Professional' }
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
