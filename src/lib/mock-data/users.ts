export type DealStage = 'Discovery' | 'Demo' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
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
