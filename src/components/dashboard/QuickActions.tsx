/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { Plus, Mic, Video, Mail, BarChart3, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createDeal } from "@/lib/api";
import { DealStage, RiskLevel } from "@/lib/mock-data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

// --- Create Deal Form Schema ---
const dealSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  stage: z.enum(["Discovery", "Demo", "Negotiation", "Closed Won", "Closed Lost"]),
  probability: z.number().min(0).max(100),
  riskLevel: z.enum(["Low", "Medium", "High"]),
  closeDate: z.string().min(1, "Close date is required"),
  nextStep: z.string(),
  sentimentScore: z.number().min(0).max(100),
});

type DealFormValues = z.infer<typeof dealSchema>;

export function QuickActions({ onActionComplete }: { onActionComplete?: () => void }) {
  const router = useRouter();
  
  // Modals state
  const [dealOpen, setDealOpen] = useState(false);
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  
  // Create Deal Form
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<DealFormValues>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      amount: 0,
      stage: "Discovery",
      probability: 50,
      riskLevel: "Low",
      closeDate: new Date().toISOString().split('T')[0],
      nextStep: "Initial discussion",
      sentimentScore: 50,
    }
  });

  const onSubmitDeal = async (data: DealFormValues) => {
    await createDeal({
      ...data,
      closeDate: new Date(data.closeDate).toISOString(),
    });
    reset();
    setDealOpen(false);
    if (onActionComplete) onActionComplete();
  };

  // Mock Email Generator
  const [generatingEmail, setGeneratingEmail] = useState(false);
  const [emailDraft, setEmailDraft] = useState("");

  const handleGenerateEmail = () => {
    setGeneratingEmail(true);
    setTimeout(() => {
      setEmailDraft("Hi Jane,\n\nThanks for the great conversation today. I've attached the proposal we discussed. Let me know if you have any questions.\n\nBest,\nSales Rep");
      setGeneratingEmail(false);
    }, 1500);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {/* Create Deal Modal */}
      <Dialog open={dealOpen} onOpenChange={setDealOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="gap-2 shadow-sm">
            <Plus className="w-4 h-4" />
            Create Deal
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Deal</DialogTitle>
            <DialogDescription>
              Enter the details for the new deal. It will be added to the pipeline immediately.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmitDeal)} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input {...register("companyName")} placeholder="Acme Corp" />
                {errors.companyName && <p className="text-xs text-destructive">{errors.companyName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Name</label>
                <Input {...register("contactName")} placeholder="Jane Doe" />
                {errors.contactName && <p className="text-xs text-destructive">{errors.contactName.message}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount ($)</label>
                <Input type="number" {...register("amount", { valueAsNumber: true })} placeholder="50000" />
                {errors.amount && <p className="text-xs text-destructive">{errors.amount.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Expected Close</label>
                <Input type="date" {...register("closeDate")} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Stage</label>
                <select 
                  {...register("stage")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="Discovery">Discovery</option>
                  <option value="Demo">Demo</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Closed Lost">Closed Lost</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Risk Level</label>
                <select 
                  {...register("riskLevel")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4 gap-2">
              <Button type="button" variant="outline" onClick={() => setDealOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Save Deal"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Analyze Meeting Modal */}
      <Dialog open={meetingOpen} onOpenChange={setMeetingOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" size="sm" className="gap-2">
            <Mic className="w-4 h-4" />
            Analyze Meeting
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Recording</DialogTitle>
            <DialogDescription>
              Upload an audio or video file to extract insights, sentiment, and action items.
            </DialogDescription>
          </DialogHeader>
          <div className="border-2 border-dashed rounded-lg p-12 mt-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
            <Video className="w-10 h-10 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg">Click or drag file to upload</h3>
            <p className="text-sm text-muted-foreground mt-1">MP4, MP3, WAV up to 500MB</p>
          </div>
          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={() => setMeetingOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Generate Email Modal */}
      <Dialog open={emailOpen} onOpenChange={(open) => { setEmailOpen(open); if(!open) setEmailDraft(""); }}>
        <DialogTrigger asChild>
          <Button variant="secondary" size="sm" className="gap-2">
            <Mail className="w-4 h-4" />
            Generate Email
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Follow-up Email</DialogTitle>
            <DialogDescription>
              Let AI draft the perfect follow-up based on your recent deal activity.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            {!emailDraft && !generatingEmail && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Context / Deal Name</label>
                <Input placeholder="e.g. Acme Corp Demo..." />
                <Button className="w-full mt-4" onClick={handleGenerateEmail}>
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  Generate Draft
                </Button>
              </div>
            )}

            {generatingEmail && (
              <div className="py-12 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground animate-pulse">Analyzing context & drafting...</p>
              </div>
            )}

            {emailDraft && (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm border">
                  {emailDraft}
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setEmailDraft("")}>Regenerate</Button>
                  <Button onClick={() => setEmailOpen(false)}>Copy to Clipboard</Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* View Reports - Routes to reports page */}
      <Button variant="outline" size="sm" className="gap-2" onClick={() => router.push('/reports')}>
        <BarChart3 className="w-4 h-4" />
        View Reports
      </Button>
    </div>
  );
}

// Sparkles icon isn't imported from lucide-react above, so I'll create a tiny wrapper or just import it.
// Wait, I will just add it directly in the SVG or fix the import at the top using multi_replace.
// Let's add the SVG inline for SparklesIcon to avoid import issues.
function SparklesIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}
