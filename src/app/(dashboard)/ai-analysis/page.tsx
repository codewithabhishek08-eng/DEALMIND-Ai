"use client";

import { useEffect, useState } from "react";
import { getGlobalAnalysis, getDeals } from "@/lib/api";
import { GlobalAIAnalysis, Deal } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, Download, TrendingUp, AlertTriangle, CheckCircle2, 
  XCircle, Activity, Target, ShieldAlert, Users, DollarSign, Sparkles
} from "lucide-react";

export default function AIAnalysisPage() {
  const [analysis, setAnalysis] = useState<GlobalAIAnalysis | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState<string>("all");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const [analysisData, dealsData] = await Promise.all([
        getGlobalAnalysis(selectedDeal === 'all' ? undefined : selectedDeal),
        getDeals(),
      ]);
      setAnalysis(analysisData);
      setDeals(dealsData);
      setIsLoading(false);
    }
    fetchData();
  }, [selectedDeal]);

  const handleGeneratePDF = () => {
    setIsGeneratingPDF(true);
    setTimeout(() => {
      setIsGeneratingPDF(false);
      // In a real app, this would trigger a download.
      alert("Executive Summary PDF generated and downloaded!");
    }, 2000);
  };

  if (isLoading || !analysis) {
    return <div className="p-8 flex justify-center items-center h-full text-muted-foreground">Loading AI insights...</div>;
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-accent" /> AI Analysis
          </h1>
          <p className="text-muted-foreground mt-1">Aggregated intelligence across your pipeline.</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedDeal} onValueChange={(v) => setSelectedDeal(v || 'all')}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select scope" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Portfolio (All Deals)</SelectItem>
              {deals.map(deal => (
                <SelectItem key={deal.id} value={deal.id}>{deal.dealName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          <Button 
            onClick={handleGeneratePDF} 
            disabled={isGeneratingPDF}
            className="gap-2"
          >
            <FileText className="w-4 h-4" /> 
            {isGeneratingPDF ? "Generating PDF..." : "Generate Report"}
          </Button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Executive Summary (Full Width) */}
        <Card className="md:col-span-3 border-accent/40 bg-accent/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <CardHeader>
            <CardTitle className="text-xl text-accent">Executive Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium leading-relaxed">{analysis.executiveSummary}</p>
          </CardContent>
        </Card>

        {/* Top Meta KPIs */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase">Confidence Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-success">{analysis.confidenceScore}</span>
              <span className="text-sm text-muted-foreground mb-1">/ 100</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-success h-full" style={{ width: `${analysis.confidenceScore}%` }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase">Overall Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-primary" />
              <div>
                <p className="text-xl font-bold">{analysis.sentimentAnalysis.split('(')[0]}</p>
                <p className="text-sm text-muted-foreground">{analysis.sentimentAnalysis.split('(')[1]?.replace(')', '') || 'Trending up'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase">Avg. Buying Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-accent" />
              <p className="text-xl font-bold">{analysis.buyingStage.split(' ')[0]}</p>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{analysis.buyingStage}</p>
          </CardContent>
        </Card>

        {/* The "Next Best Action" Highlight */}
        <Card className="md:col-span-3 border-primary/50 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-primary uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Recommended Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">{analysis.nextBestAction}</p>
          </CardContent>
        </Card>

        {/* Signals Lists */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-destructive" /> Risk Factors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.riskFactors.map((risk, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" /> 
                  <span className="text-muted-foreground">{risk}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" /> Positive Signals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.positiveSignals.map((signal, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> 
                  <span className="text-muted-foreground">{signal}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <XCircle className="w-4 h-4 text-destructive" /> Negative Signals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.negativeSignals.map((signal, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" /> 
                  <span className="text-muted-foreground">{signal}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-4 h-4 text-accent" /> Competitor Mentions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {analysis.competitorMentions.map((comp, i) => (
              <Badge key={i} variant="secondary" className="bg-muted/80">{comp}</Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" /> Active Decision Makers
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {analysis.decisionMakers.map((dm, i) => (
              <Badge key={i} variant="outline" className="bg-background">{dm}</Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-success" /> Budget Signals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">{analysis.budgetSignals}</p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
