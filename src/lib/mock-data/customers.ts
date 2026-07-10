export interface Customer {
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
