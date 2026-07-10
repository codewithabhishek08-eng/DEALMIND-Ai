"use client";
/* eslint-disable react/no-unescaped-entities */

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDealDetails } from "@/lib/api";
import { Deal, DealDetailsData } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft, Building, Mail, Phone, Calendar, Sparkles, CheckSquare,
  Activity, MessageSquare, Clock, FileText, Download, AlertTriangle, Target,
  DollarSign, BarChart3, TrendingUp, Users, Presentation, Send
} from "lucide-react";

export default function DealDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();

  const [deal, setDeal] = useState<Deal | null>(null);
  const [details, setDetails] = useState<DealDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [emailOpen, setEmailOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [meetingOpen, setMeetingOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await getDealDetails(id);
        setDeal(data.deal);
        setDetails(data.details);
      } catch (err) {
        setError("Deal not found or failed to load.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (isLoading) {
    return <div className="p-8 flex justify-center items-center h-full text-muted-foreground">Loading deal insights...</div>;
  }
  if (error || !deal || !details) {
    return <div className="p-8 text-destructive">{error}</div>;
  }

  const getHealthColor = (score: number) => score >= 80 ? "text-success" : score >= 50 ? "text-accent" : "text-destructive";

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <Button variant="ghost" size="sm" className="mb-2 -ml-3 text-muted-foreground" onClick={() => router.push('/deals')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Pipeline
          </Button>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight">{deal.dealName}</h1>
            <Badge variant="outline" className="text-sm bg-muted/50">{deal.stage}</Badge>
            <Badge variant={deal.status === 'Active' ? 'default' : 'secondary'} className="text-sm">{deal.status}</Badge>
          </div>
          <p className="text-muted-foreground flex items-center gap-4 text-sm mt-2">
            <span className="flex items-center gap-1"><Building className="w-4 h-4" /> {deal.companyName}</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {deal.contactName}</span>
            <span className="flex items-center gap-1 font-medium text-foreground"><DollarSign className="w-4 h-4" /> {deal.amount.toLocaleString()}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Generate Email Modal */}
          <Dialog open={emailOpen} onOpenChange={setEmailOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" className="gap-2">
                <Sparkles className="w-4 h-4 text-accent" /> Draft Email
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>AI Email Assistant</DialogTitle>
                <DialogDescription>Drafting a context-aware email for {deal.contactName} at {deal.companyName}.</DialogDescription>
              </DialogHeader>
              <div className="p-4 bg-muted/50 border rounded-md text-sm mt-4 font-mono whitespace-pre-wrap">
                Hi {deal.contactName.split(' ')[0]},{"\n\n"}
                I hope you're having a great week! I'm following up on our recent {deal.stage} conversation regarding the {deal.dealName}. {"\n\n"}
                Based on our discussion, I've attached the latest resources for your team. Let me know if you have any questions.{"\n\n"}
                Best,{"\n"}
                {deal.owner}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setEmailOpen(false)}>Cancel</Button>
                <Button onClick={() => setEmailOpen(false)}><Send className="w-4 h-4 mr-2"/> Send via Gmail</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Schedule Meeting Modal */}
          <Dialog open={meetingOpen} onOpenChange={setMeetingOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" /> Schedule
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule Follow-up</DialogTitle>
                <DialogDescription>Book a meeting with {deal.contactName}.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Meeting Title</label>
                  <Input defaultValue={`${deal.companyName} / DealMind Sync`} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date & Time</label>
                  <Input type="datetime-local" />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setMeetingOpen(false)}>Cancel</Button>
                  <Button onClick={() => setMeetingOpen(false)}>Send Invite</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Create Task Modal */}
          <Dialog open={taskOpen} onOpenChange={setTaskOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CheckSquare className="w-4 h-4" /> Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Task for {deal.companyName}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input placeholder="e.g. Send updated pricing sheet..." />
                <Input type="date" />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setTaskOpen(false)}>Cancel</Button>
                  <Button onClick={() => setTaskOpen(false)}>Save Task</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Main content & Tabs */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-12 p-0 overflow-x-auto flex-nowrap">
              <TabsTrigger value="timeline" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12">Timeline</TabsTrigger>
              <TabsTrigger value="info" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12">Customer Info</TabsTrigger>
              <TabsTrigger value="notes" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12">Notes</TabsTrigger>
              <TabsTrigger value="emails" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12">Emails</TabsTrigger>
              <TabsTrigger value="meetings" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12">Meetings</TabsTrigger>
              <TabsTrigger value="tasks" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12">Tasks</TabsTrigger>
            </TabsList>
            
            {/* Timeline Tab */}
            <TabsContent value="timeline" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative border-l border-muted ml-4 space-y-8 pb-4">
                    {details.timeline.map((item) => (
                      <div key={item.id} className="pl-6 relative">
                        <span className="absolute -left-2.5 top-1 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                          {item.type === 'meeting' ? <Presentation className="w-2.5 h-2.5 text-primary" /> : 
                           item.type === 'email' ? <Mail className="w-2.5 h-2.5 text-primary" /> :
                           item.type === 'status_change' ? <TrendingUp className="w-2.5 h-2.5 text-primary" /> :
                           <FileText className="w-2.5 h-2.5 text-primary" />}
                        </span>
                        <div>
                          <p className="text-sm font-semibold">{item.title}</p>
                          <p className="text-xs text-muted-foreground mb-1">{new Date(item.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                          <p className="text-sm bg-muted/30 p-3 rounded-md mt-2 border border-border/50">{item.description}</p>
                        </div>
                      </div>
                    ))}
                    {details.timeline.length === 0 && <p className="pl-6 text-sm text-muted-foreground">No recent activity.</p>}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Customer Info Tab */}
            <TabsContent value="info" className="pt-6">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Decision Maker</p>
                      <p className="font-medium">{details.decisionMaker}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Budget Status</p>
                      <p className="font-medium">{details.budget}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contact Email</p>
                      <p className="font-medium flex items-center gap-2"><Mail className="w-3 h-3 text-muted-foreground"/> {deal.contactName.split(' ')[0].toLowerCase()}@{deal.companyName.toLowerCase().replace(/\s/g, '')}.com</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contact Phone</p>
                      <p className="font-medium flex items-center gap-2"><Phone className="w-3 h-3 text-muted-foreground"/> +1 (555) 123-4567</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="pt-6">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex gap-2">
                    <Input placeholder="Add a note..." className="flex-1" />
                    <Button>Post Note</Button>
                  </div>
                  <div className="space-y-4 mt-6">
                    {details.notes.map(note => (
                      <div key={note.id} className="bg-muted/40 p-4 rounded-lg border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-semibold">{note.author}</span>
                          <span className="text-xs text-muted-foreground">{new Date(note.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm">{note.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Emails Tab */}
            <TabsContent value="emails" className="pt-6">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {details.emails.map(email => (
                    <div key={email.id} className="border p-4 rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {email.direction === 'inbound' ? <ArrowLeft className="w-4 h-4 text-accent" /> : <ArrowLeft className="w-4 h-4 text-muted-foreground rotate-180" />}
                          <span className="font-medium text-sm">{email.subject}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{new Date(email.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{email.snippet}</p>
                    </div>
                  ))}
                  {details.emails.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No emails synced.</p>}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Meetings Tab */}
            <TabsContent value="meetings" className="pt-6">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {details.timeline.filter(t => t.type === 'meeting').map(meeting => (
                    <div key={meeting.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/30">
                      <div>
                        <p className="font-medium text-sm">{meeting.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" /> {new Date(meeting.date).toLocaleString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => router.push('/meetings')}>View AI Insights</Button>
                    </div>
                  ))}
                  {details.timeline.filter(t => t.type === 'meeting').length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No meetings recorded.</p>}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tasks Tab */}
            <TabsContent value="tasks" className="pt-6">
              <Card>
                <CardContent className="pt-6 space-y-3">
                  {details.tasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${task.status === 'Completed' ? 'bg-success border-success' : 'border-muted-foreground'}`}>
                          {task.status === 'Completed' && <CheckSquare className="w-3 h-3 text-white" />}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${task.status === 'Completed' ? 'line-through text-muted-foreground' : ''}`}>{task.title}</p>
                          <p className="text-xs text-muted-foreground">{task.dueDate}</p>
                        </div>
                      </div>
                      <Badge variant={task.status === 'Completed' ? 'outline' : 'secondary'}>{task.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* RIGHT COLUMN: AI Analysis & Files */}
        <div className="space-y-6">
          
          {/* AI Analysis Card */}
          <Card className="border-accent/40 shadow-[0_0_20px_rgba(34,211,238,0.1)] relative overflow-hidden bg-card/60 backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="w-5 h-5 text-accent" /> Deal Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Gauges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Win Probability</span>
                    <span className="font-bold">{deal.probability}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: `${deal.probability}%` }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Health Score</span>
                    <span className={`font-bold ${getHealthColor(details.dealHealthScore)}`}>{details.dealHealthScore}/100</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${details.dealHealthScore >= 80 ? 'bg-success' : details.dealHealthScore >= 50 ? 'bg-accent' : 'bg-destructive'}`} style={{ width: `${details.dealHealthScore}%` }} />
                  </div>
                </div>
              </div>

              {/* Signals */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI Signals</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-background/50 flex gap-1.5 py-1">
                    <Activity className="w-3 h-3 text-accent" /> Intent: {details.buyingIntent}
                  </Badge>
                  <Badge variant="outline" className="bg-background/50 flex gap-1.5 py-1">
                    <MessageSquare className="w-3 h-3 text-success" /> Sentiment: {deal.sentimentScore > 70 ? 'Positive' : deal.sentimentScore > 40 ? 'Neutral' : 'Negative'}
                  </Badge>
                  <Badge variant="outline" className="bg-background/50 flex gap-1.5 py-1">
                    <Clock className="w-3 h-3 text-destructive" /> Urgency: {details.urgency}
                  </Badge>
                </div>
              </div>

              {/* Text Insights */}
              <div className="space-y-4 pt-2">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2"><Target className="w-3 h-3" /> Competitors Mentioned</h4>
                  <div className="flex gap-2">
                    {details.competitorMentions.map((comp, i) => (
                      <Badge key={i} variant="secondary" className="bg-muted/80">{comp}</Badge>
                    ))}
                    {details.competitorMentions.length === 0 && <span className="text-sm text-muted-foreground">None detected</span>}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2"><AlertTriangle className="w-3 h-3" /> Pain Points Detected</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                    {details.painPoints.map((pp, i) => <li key={i}>{pp}</li>)}
                  </ul>
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Recommended Next Action</h4>
                  <p className="text-sm font-medium">{details.recommendedNextAction}</p>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Attachments Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Attachments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {details.attachments.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md group cursor-pointer transition-colors border border-transparent hover:border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-md text-primary">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{file.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{file.size} • {new Date(file.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 h-8 w-8">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {details.attachments.length === 0 && <p className="text-sm text-muted-foreground text-center py-2">No attachments.</p>}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
