"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from "recharts";
import { LineChart as LineChartIcon, Download, FileText, TrendingUp, Users, Target } from "lucide-react";
import { getDashboardData } from "@/lib/api";

const winRateData = [
  { name: 'Won', value: 65, color: 'hsl(var(--success))' },
  { name: 'Lost', value: 35, color: 'hsl(var(--destructive))' },
];

const lostReasonsData = [
  { reason: 'Price', count: 45 },
  { reason: 'Feature Missing', count: 30 },
  { reason: 'Competitor', count: 15 },
  { reason: 'Timing', count: 10 },
];

const topCustomers = [
  { name: 'Stark Industries', revenue: '$5B', logo: 'S' },
  { name: 'Wayne Enterprises', revenue: '$10B', logo: 'W' },
  { name: 'Acme Corp', revenue: '$50M', logo: 'A' },
  { name: 'Global Tech', revenue: '$120M', logo: 'G' },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-3 rounded-lg shadow-lg text-sm">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export default function ReportsPage() {
  const [timeFilter, setTimeFilter] = useState<'Weekly'|'Monthly'|'Quarterly'|'Yearly'>('Monthly');
  const [isExporting, setIsExporting] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getDashboardData().then(res => setData(res));
  }, []);

  const handleExport = (format: string) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`Report exported as ${format}!`);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <LineChartIcon className="w-6 h-6 text-primary" /> Reports & Analytics
          </h1>
          <p className="text-muted-foreground mt-1">Deep dive into your sales performance.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-muted rounded-md p-1 mr-4">
            {['Weekly', 'Monthly', 'Quarterly', 'Yearly'].map(filter => (
              <button
                key={filter}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => setTimeFilter(filter as any)}
                className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors ${timeFilter === filter ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {filter}
              </button>
            ))}
          </div>
          <Button variant="outline" className="gap-2" onClick={() => handleExport("CSV")} disabled={isExporting}>
            <Download className="w-4 h-4" /> CSV
          </Button>
          <Button className="gap-2" onClick={() => handleExport("PDF")} disabled={isExporting}>
            <FileText className="w-4 h-4" /> {isExporting ? "Generating..." : "Export PDF"}
          </Button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "$420,000", trend: "+12%", up: true, icon: TrendingUp },
          { label: "Avg Sales Cycle", value: "32 Days", trend: "-5%", up: true, icon: Target },
          { label: "Win Rate", value: "65%", trend: "+2%", up: true, icon: Users },
          { label: "Pipeline Value", value: "$1.2M", trend: "+8%", up: true, icon: LineChartIcon }
        ].map((kpi, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
                  <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${kpi.up ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                  <kpi.icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className={`font-medium ${kpi.up ? 'text-success' : 'text-destructive'}`}>{kpi.trend}</span>
                <span className="text-muted-foreground ml-1">vs last {timeFilter.toLowerCase()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue vs Target */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Revenue</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {data ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.monthlyRevenue}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={value => `$${value}`} />
                <Tooltip content={<ChartTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="revenue" name="Current Revenue" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorCurrent)" />
              </AreaChart>
            </ResponsiveContainer>
            ) : <div className="flex h-full items-center justify-center text-muted-foreground">Loading...</div>}
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            {data ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.funnelData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" hide />
                <YAxis dataKey="stage" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="count" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
            ) : <div className="flex h-full items-center justify-center text-muted-foreground">Loading...</div>}
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Team Performance (Revenue vs Quota)</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            {data ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.salesPerformance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" hide />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" name="Quota" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            ) : <div className="flex h-full items-center justify-center text-muted-foreground">Loading...</div>}
          </CardContent>
        </Card>

        {/* Win Rate & Lost Reasons */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Win Rate</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={winRateData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                    {winRateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-4">
                <span className="text-3xl font-bold">65%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Lost Reasons</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lostReasonsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="reason" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="count" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
