"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getAnalyzedMeetings } from "@/lib/api";
import { AnalyzedMeeting } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { 
  UploadCloud, FileAudio, Play, CheckCircle2, MessageSquare, AlertTriangle, 
  Sparkles, Download, ArrowRight, User, Hash, Target, Activity
} from "lucide-react";

export default function MeetingsPage() {
  const router = useRouter();
  const [meetings, setMeetings] = useState<AnalyzedMeeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<AnalyzedMeeting | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const meetingsData = await getAnalyzedMeetings();
      setMeetings(meetingsData);
      if (meetingsData.length > 0) {
        setSelectedMeeting(meetingsData[0]);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      simulateUpload(e.target.files[0].name);
    }
  };

  const simulateUpload = (fileName: string) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
          alert(`Successfully uploaded and analyzed ${fileName}`);
        }, 800);
      }
      setUploadProgress(Math.min(progress, 100));
    }, 300);
  };

  if (isLoading) {
    return <div className="p-8 flex justify-center items-center h-full text-muted-foreground">Loading Meeting Intelligence...</div>;
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileAudio className="w-6 h-6 text-primary" /> Meeting Intelligence
          </h1>
          <p className="text-muted-foreground mt-1">Upload call recordings for instant AI analysis.</p>
        </div>
      </div>

      {/* Upload Zone */}
      <Card className="border-dashed border-2 border-muted-foreground/20 bg-muted/10">
        <CardContent className="flex flex-col items-center justify-center py-12">
          {isUploading ? (
            <div className="w-full max-w-md text-center space-y-4">
              <Sparkles className="w-8 h-8 text-accent animate-pulse mx-auto" />
              <h3 className="text-lg font-medium">Analyzing Audio...</h3>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-accent h-full transition-all duration-300 ease-out" 
                  style={{ width: `${uploadProgress}%` }} 
                />
              </div>
              <p className="text-sm text-muted-foreground">{Math.floor(uploadProgress)}% Complete</p>
            </div>
          ) : (
            <div className="text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <UploadCloud className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-1">Click or drag audio to analyze</h3>
              <p className="text-sm text-muted-foreground mb-4">Supports MP3, MP4, WAV (Max 50MB)</p>
              <Button variant="secondary">Select File</Button>
              <Input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept="audio/*,video/mp4" 
                onChange={handleFileUpload} 
              />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-4">
        {/* Left Column: Meeting List */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">Recent Meetings</h3>
          {meetings.map((meeting) => (
            <div 
              key={meeting.id}
              onClick={() => setSelectedMeeting(meeting)}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedMeeting?.id === meeting.id ? 'bg-muted/50 border-primary' : 'bg-card hover:bg-muted/20'}`}
            >
              <h4 className="font-medium text-sm mb-1 line-clamp-1">{meeting.title}</h4>
              <p className="text-xs text-muted-foreground">{meeting.companyName} • {new Date(meeting.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>

        {/* Right Columns: Analyzed Details */}
        {selectedMeeting ? (
          <div className="lg:col-span-3 space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
              <div>
                <h2 className="text-2xl font-bold">{selectedMeeting.title}</h2>
                <p className="text-muted-foreground">{selectedMeeting.companyName} • {selectedMeeting.duration}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" /> Transcript
                </Button>
                <Button 
                  size="sm" 
                  className="gap-2"
                  onClick={() => router.push(`/email?context=${selectedMeeting.id}`)}
                >
                  <ArrowRight className="w-4 h-4" /> Generate Follow-up
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" /> AI Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{selectedMeeting.summary}</p>
                </CardContent>
              </Card>

              {/* Sentiment Timeline */}
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" /> Sentiment Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[250px] pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedMeeting.sentimentTimeline}>
                      <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
                      <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" /> Action Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedMeeting.actionItems.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm items-start">
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> 
                        <span>
                          <span className="font-medium">{item.task}</span>
                          <span className="text-xs text-muted-foreground block mt-0.5">Owner: {item.owner}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" /> Objections & Concerns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    {selectedMeeting.objections.map((obj, i) => <li key={i}>{obj}</li>)}
                    {selectedMeeting.customerConcerns.map((conc, i) => <li key={i + 10}>{conc}</li>)}
                  </ul>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 border-accent/40 bg-accent/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2 text-accent">
                    <Target className="w-4 h-4" /> AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedMeeting.aiRecommendations.map((rec, i) => (
                      <li key={i} className="flex gap-2 text-sm font-medium">
                        <ArrowRight className="w-4 h-4 text-accent shrink-0 mt-0.5" /> 
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Transcript */}
              <Card className="md:col-span-2">
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" /> Transcript snippet
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {selectedMeeting.transcript.map((turn, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{turn.speaker}</span>
                          <span className="text-xs text-muted-foreground">{turn.time}</span>
                        </div>
                        <p className="text-sm">{turn.text}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
            </div>
          </div>
        ) : (
          <div className="lg:col-span-3 flex items-center justify-center text-muted-foreground">
            Select a meeting to view intelligence.
          </div>
        )}
      </div>
    </div>
  );
}
