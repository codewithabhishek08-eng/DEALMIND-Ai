export interface Task {
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
