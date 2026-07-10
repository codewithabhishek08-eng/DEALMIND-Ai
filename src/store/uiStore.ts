import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  type: 'Meeting' | 'Risk' | 'Task' | 'AI' | 'Customer';
  time: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  time: string;
}

interface UiState {
  // Layout
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Notifications
  notifications: AppNotification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  
  // AI Chat
  isChatOpen: boolean;
  toggleChat: () => void;
  chatHistory: ChatMessage[];
  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'time'>) => void;
  clearChat: () => void;
}

const initialNotifications: AppNotification[] = [
  { id: 'n1', title: 'Upcoming Meeting', description: 'Acme Final Review starts in 10 minutes.', type: 'Meeting', time: '10m ago', read: false },
  { id: 'n2', title: 'High Risk Deal', description: 'Global Tech deal health score dropped to 45.', type: 'Risk', time: '1h ago', read: false },
  { id: 'n3', title: 'Task Due', description: 'Draft proposal for Stark Ind. is due today.', type: 'Task', time: '2h ago', read: false },
  { id: 'n4', title: 'Customer Reply', description: 'Jane Doe replied to your email.', type: 'Customer', time: '5h ago', read: true },
  { id: 'n5', title: 'AI Alert', description: 'Identified upsell opportunity for Wayne Ent.', type: 'AI', time: '1d ago', read: true },
];

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      
      notifications: initialNotifications,
      markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
      })),
      markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true }))
      })),
      deleteNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),

      isChatOpen: false,
      toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
      chatHistory: [
        { id: 'init', role: 'ai', text: 'Hi! I am your Dealmind AI assistant. How can I help you close deals today?', time: new Date().toLocaleTimeString() }
      ],
      addChatMessage: (msg) => set((state) => ({
        chatHistory: [...state.chatHistory, { ...msg, id: Math.random().toString(36).substr(2, 9), time: new Date().toLocaleTimeString() }]
      })),
      clearChat: () => set(() => ({
        chatHistory: [{ id: 'init', role: 'ai', text: 'Hi! I am your Dealmind AI assistant. How can I help you close deals today?', time: new Date().toLocaleTimeString() }]
      }))
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ 
        sidebarCollapsed: state.sidebarCollapsed,
        notifications: state.notifications,
        chatHistory: state.chatHistory
      }), // Don't persist isChatOpen, so it starts closed on refresh
    }
  )
);
