"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, Video, DollarSign, Target, AlertTriangle, BrainCircuit,
  TrendingUp, TrendingDown, CheckCircle2, Lightbulb
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

// Simple count up hook for the KPIs
function useCountUp(end: number, duration: number = 1500) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  
  return count;
}

// Formatters
const formatCurrency = (val: number) => `$${(val / 1000000).toFixed(1)}M`;
const formatCompactCurrency = (val: number) => `$${(val / 1000)}k`;

// Hardcoded Demo Data
const REVENUE_DATA = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 59000 },
  { month: "Jun", revenue: 75000 },
  { month: "Jul", revenue: 82000 },
];

const RECENT_DEALS = [
  { id: 1, deal: "Enterprise License", company: "Microsoft", value: 120000, stage: "Negotiation", aiScore: 92 },
  { id: 2, deal: "Cloud Migration", company: "Amazon", value: 85000, stage: "Proposal", aiScore: 78 },
  { id: 3, deal: "Security Audit", company: "ABC Corp", value: 45000, stage: "At Risk", aiScore: 42 },
  { id: 4, deal: "Data Platform", company: "Netflix", value: 150000, stage: "Won", aiScore: 98 },
  { id: 5, deal: "API Integration", company: "Stripe", value: 35000, stage: "Discovery", aiScore: 65 },
];

const TODAY_TASKS = [
  { id: 1, text: "Review Microsoft contract redlines", time: "10:00 AM", completed: false },
  { id: 2, text: "Send follow-up to ABC Corp", time: "1:30 PM", completed: false },
  { id: 3, text: "Prep for Amazon presentation", time: "3:00 PM", completed: false },
  { id: 4, text: "Sync with pre-sales engineer", time: "9:00 AM", completed: true },
];

export default function Dashboard() {
  const { user } = useAuthStore();
  const [tasks, setTasks] = useState(TODAY_TASKS);
  
  // KPI Countups
  const pipelineValue = useCountUp(2400000);
  const winRate = useCountUp(78);
  const highRisk = useCountUp(5);
  const aiConfidence = useCountUp(94);
  
  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const getStageColor = (stage: string) => {
    switch(stage) {
      case 'Negotiation': return 'bg-primary/20 text-primary border-primary/30';
      case 'Won': return 'bg-success/20 text-success border-success/30';
      case 'At Risk': return 'bg-warning/20 text-warning border-warning/30';
      case 'Lost': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out">
      
      {/* 1. Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">👋 Welcome Back, {user?.name || "Abhishek"}</h1>
          <p className="text-muted-foreground mt-1">AI analyzed <strong className="text-foreground font-medium">18 deals</strong> today and <strong className="text-warning font-medium">3 deals</strong> need immediate attention.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Video className="w-4 h-4" /> Analyze Meeting
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> New Deal
          </Button>
        </div>
      </div>

      {/* 2. KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-out border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground opacity-50" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tabular-nums">{formatCurrency(pipelineValue)}</div>
            <div className="flex items-center text-xs mt-1 text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" /> 12% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-out border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground opacity-50" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tabular-nums">{winRate}%</div>
            <div className="flex items-center text-xs mt-1 text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" /> 4% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-out border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">High Risk Deals</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning opacity-50" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tabular-nums">{highRisk}</div>
            <div className="flex items-center text-xs mt-1 text-destructive font-medium">
              <TrendingDown className="w-3 h-3 mr-1" /> 2 more than yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-out border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Confidence</CardTitle>
            <BrainCircuit className="h-4 w-4 text-primary opacity-50" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tabular-nums">{aiConfidence}%</div>
            <div className="flex items-center text-xs mt-1 text-muted-foreground">
              Based on historical win patterns
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Middle Row (Chart & Insights) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <Card className="lg:col-span-7 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Revenue Trajectory</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-border stroke-border opacity-20" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} />
                <YAxis tickFormatter={formatCompactCurrency} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} />
                <Tooltip 
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Revenue']}
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px', color: 'var(--color-foreground)' }}
                  itemStyle={{ color: 'var(--color-foreground)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 6, fill: 'var(--color-primary)' }}
                  isAnimationActive={true}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-border/50 flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" /> AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between gap-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/10">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/90"><strong className="font-semibold text-foreground">Microsoft</strong> deal has a 92% chance to close this week.</p>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/5 border border-warning/10">
              <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/90"><strong className="font-semibold text-foreground">ABC Corp</strong> hasn&apos;t replied in 5 days. Risk of stalling.</p>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/90">Send a targeted case study to <strong className="font-semibold text-foreground">Amazon</strong> to address technical concerns.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. Bottom Row (Deals Table & Tasks) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Recent Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Deal</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead className="text-right">AI Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECENT_DEALS.map((deal) => (
                  <TableRow key={deal.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <p className="font-medium">{deal.deal}</p>
                      <p className="text-xs text-muted-foreground">{deal.company}</p>
                    </TableCell>
                    <TableCell className="font-medium tabular-nums">${deal.value.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-medium ${getStageColor(deal.stage)}`}>
                        {deal.stage}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className={`font-bold tabular-nums ${getScoreColor(deal.aiScore)}`}>{deal.aiScore}</span>
                        <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getScoreColor(deal.aiScore).replace('text-', 'bg-')}`} 
                            style={{ width: `${deal.aiScore}%` }} 
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-muted-foreground" /> Today&apos;s Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="flex items-start gap-3 group">
                <Checkbox 
                  id={`task-${task.id}`} 
                  checked={task.completed} 
                  onCheckedChange={() => toggleTask(task.id)}
                  className="mt-0.5"
                />
                <label 
                  htmlFor={`task-${task.id}`}
                  className={`text-sm cursor-pointer select-none flex-1 transition-all ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground font-medium'}`}
                >
                  {task.text}
                </label>
                <Badge variant="secondary" className="text-[10px] whitespace-nowrap opacity-70">
                  {task.time}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
