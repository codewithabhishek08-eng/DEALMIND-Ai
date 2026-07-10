"use client";
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, Sparkles, Send, Copy, Clock, Wand2, Type, 
  MessageSquare, User, CornerUpLeft, Search
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockThreads = [
  { id: 't1', contact: 'Jane Doe (Acme)', subject: 'Re: Revised Proposal', date: '10:30 AM', snippet: 'The new numbers look good. We will run this by our legal team...', unread: true },
  { id: 't2', contact: 'John Smith (Global)', subject: 'Pricing Questions', date: 'Yesterday', snippet: 'Is there flexibility on the per-seat pricing?', unread: false },
  { id: 't3', contact: 'Tony Stark', subject: 'Next Steps', date: 'Oct 24', snippet: 'Let us schedule a kickoff call next week.', unread: false },
  { id: 't4', contact: 'Bruce Wayne', subject: 'Security Review', date: 'Oct 22', snippet: 'Our CISO approved the architecture.', unread: false },
];

const templates = {
  "Meeting Follow-up": "Hi [Name],\n\nGreat speaking with you today! I've attached the materials we discussed.\n\nLet me know if you have any questions before our next sync.\n\nBest,\n[My Name]",
  "Proposal": "Hi [Name],\n\nPlease find our finalized proposal attached. This reflects the custom pricing and SLAs we agreed upon.\n\nLooking forward to your feedback.\n\nBest,\n[My Name]",
  "Reminder": "Hi [Name],\n\nJust floating this to the top of your inbox. Let me know if you need any additional info to move forward.\n\nBest,\n[My Name]",
};

export default function EmailAssistantPage() {
  const [selectedThread, setSelectedThread] = useState(mockThreads[0]);
  const [subject, setSubject] = useState(mockThreads[0].subject);
  const [body, setBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTemplate = (templateName: keyof typeof templates) => {
    const contactName = selectedThread.contact.split(' ')[0];
    setBody(templates[templateName].replace('[Name]', contactName).replace('[My Name]', 'Alex'));
  };

  const simulateAIAction = (actionName: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setBody((prev) => `[AI Applied: ${actionName}]\n\n${prev || "This is a generated response based on the thread context."}`);
    }, 1000);
  };

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      alert("Email sent and logged to CRM!");
      setBody("");
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="w-6 h-6 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Email Assistant</h1>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 min-h-0">
        
        {/* Left Pane: Threads */}
        <Card className="md:col-span-3 flex flex-col h-full overflow-hidden">
          <CardHeader className="p-4 border-b">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input placeholder="Search emails..." className="pl-9 bg-muted/50" />
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto flex-1">
            {mockThreads.map(thread => (
              <div 
                key={thread.id} 
                onClick={() => { setSelectedThread(thread); setSubject(thread.subject); }}
                className={`p-4 border-b cursor-pointer transition-colors ${selectedThread.id === thread.id ? 'bg-muted/50 border-l-2 border-l-primary' : 'hover:bg-muted/20 border-l-2 border-l-transparent'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-sm font-medium ${thread.unread ? 'text-foreground' : 'text-muted-foreground'}`}>{thread.contact}</span>
                  <span className="text-xs text-muted-foreground">{thread.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  {thread.unread && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                  <span className="text-sm font-semibold truncate">{thread.subject}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{thread.snippet}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Middle Pane: Composer */}
        <Card className="md:col-span-6 flex flex-col h-full overflow-hidden">
          <CardHeader className="p-4 border-b bg-muted/10 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <User className="w-4 h-4 text-accent" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">{selectedThread.contact}</CardTitle>
                <p className="text-xs text-muted-foreground">Replying to thread</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => handleTemplate("Meeting Follow-up")}>Follow-up</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => handleTemplate("Proposal")}>Proposal</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => handleTemplate("Reminder")}>Reminder</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col">
            <div className="p-4 border-b">
              <Input 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                className="font-semibold text-lg border-none shadow-none focus-visible:ring-0 px-0 h-auto" 
                placeholder="Subject line"
              />
            </div>
            <Textarea 
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="flex-1 border-none shadow-none focus-visible:ring-0 p-4 resize-none"
              placeholder="Type your message, or use AI suggestions on the right..."
            />
            
            {/* Toolbar */}
            <div className="p-4 border-t flex justify-between items-center bg-muted/10">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => alert("Copied!")}><Copy className="w-4 h-4" /></Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2"><Clock className="w-4 h-4" /> Schedule</Button>
                <Button onClick={handleSend} disabled={isSending} className="gap-2">
                  <Send className="w-4 h-4" /> {isSending ? "Sending..." : "Send"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Pane: AI Suggestions */}
        <Card className="md:col-span-3 flex flex-col h-full overflow-hidden border-accent/30 bg-accent/5">
          <CardHeader className="p-4 border-b border-accent/20">
            <CardTitle className="text-sm flex items-center gap-2 text-accent">
              <Sparkles className="w-4 h-4" /> AI Co-Pilot
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 overflow-y-auto space-y-6">
            
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Drafting</h4>
              <Button variant="secondary" className="w-full justify-start gap-2 bg-background/50 hover:bg-background" onClick={() => simulateAIAction("Generate Reply")} disabled={isGenerating}>
                <CornerUpLeft className="w-4 h-4" /> Generate Reply
              </Button>
              <Button variant="secondary" className="w-full justify-start gap-2 bg-background/50 hover:bg-background" onClick={() => simulateAIAction("Rewrite Completely")} disabled={isGenerating}>
                <Wand2 className="w-4 h-4" /> Rewrite
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Tone Adjustments</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="bg-background/50 text-xs h-8" onClick={() => simulateAIAction("Professional Tone")} disabled={isGenerating}>Professional</Button>
                <Button variant="outline" className="bg-background/50 text-xs h-8" onClick={() => simulateAIAction("Friendly Tone")} disabled={isGenerating}>Friendly</Button>
                <Button variant="outline" className="bg-background/50 text-xs h-8" onClick={() => simulateAIAction("Confident Tone")} disabled={isGenerating}>Confident</Button>
                <Button variant="outline" className="bg-background/50 text-xs h-8" onClick={() => simulateAIAction("Urgent Tone")} disabled={isGenerating}>Urgent</Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Refinements</h4>
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm h-8" onClick={() => simulateAIAction("Shorten")} disabled={isGenerating}>
                <MessageSquare className="w-4 h-4" /> Make it shorter
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm h-8" onClick={() => simulateAIAction("Expand")} disabled={isGenerating}>
                <Type className="w-4 h-4" /> Expand on details
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm h-8" onClick={() => simulateAIAction("Fix Grammar")} disabled={isGenerating}>
                <Sparkles className="w-4 h-4" /> Fix grammar & spelling
              </Button>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}
