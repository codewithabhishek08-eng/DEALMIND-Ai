export interface Notification {
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
