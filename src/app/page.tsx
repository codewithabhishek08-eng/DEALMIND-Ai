"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { ArrowRight, BarChart3, BrainCircuit, Target, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Subtle Aurora/Gradient Orbs Background
const AuroraBackground = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#0B1120]">
      {/* Orb 1: Primary Blue */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] mix-blend-screen"
        animate={shouldReduceMotion ? {} : {
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* Orb 2: Accent Teal */}
      <motion.div 
        className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/10 blur-[150px] mix-blend-screen"
        animate={shouldReduceMotion ? {} : {
          x: [0, -40, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* Orb 3: Deep Purple/Indigo (using primary as base for now) */}
      <motion.div 
        className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] rounded-full bg-indigo-500/10 blur-[150px] mix-blend-screen"
        animate={shouldReduceMotion ? {} : {
          x: [0, 30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default function LandingPage() {
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Nav bar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPreview = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("dashboard-preview");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  
  // Animation variants
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fadeUp: any = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockupReveal: any = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      
      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-xl border-border/40 shadow-sm' 
          : 'bg-transparent border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
              <BrainCircuit className="w-5 h-5" />
            </div>
            DEALMIND <span className="text-primary">AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="rounded-full px-5 hover:bg-muted/50 transition-colors font-medium">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="rounded-full px-5 hover:scale-105 transition-transform duration-200">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section (100vh) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6">
        <AuroraBackground />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center z-10"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Introducing Dealmind 2.0
          </motion.div>
          
          <motion.h1 
            variants={fadeUp}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
          >
            AI That <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Closes Deals</span> <br className="hidden md:block" /> For You.
          </motion.h1>
          
          <motion.p 
            variants={fadeUp}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light"
          >
            Automatically analyze your pipeline, predict risks with 94% accuracy, and execute data-driven actions to maximize revenue.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="h-14 px-8 text-base rounded-full hover:scale-105 hover:brightness-110 transition-all duration-200 shadow-lg shadow-primary/25">
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Mockup Preview */}
        <motion.div
          id="dashboard-preview"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={mockupReveal}
          className="w-full max-w-5xl mx-auto mt-20 relative z-10"
        >
          <Link href="/dashboard" className="block relative rounded-xl border border-[#2A3142] bg-[#0B1120] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden text-[#F8FAFC] hover:border-primary/50 transition-colors cursor-pointer group">
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors z-20 pointer-events-none" />
            
            {/* Browser Chrome */}
            <div className="h-10 border-b border-[#2A3142] bg-[#131922] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-warning/80" />
              <div className="w-3 h-3 rounded-full bg-success/80" />
            </div>
            
            {/* Dashboard Mockup Content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Header Mock */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  DEALMIND AI
                </div>
                <div className="hidden md:flex gap-3">
                  <div className="h-9 px-4 bg-primary text-white text-sm font-medium flex items-center justify-center rounded-full">
                    + New Deal
                  </div>
                </div>
              </div>

              {/* KPI Cards Mock */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card 1 */}
                <div className="bg-[#1A1F2B] rounded-lg border border-[#2A3142] p-4 flex flex-col justify-between">
                  <div className="flex items-center text-sm font-medium text-[#94A3B8] mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Pipeline Value
                  </div>
                  <div className="text-3xl font-bold mb-1">$2.4M</div>
                  <div className="text-xs text-[#22C55E] font-medium">↑ 12% from last month</div>
                </div>
                {/* Card 2 */}
                <div className="bg-[#1A1F2B] rounded-lg border border-[#2A3142] p-4 flex flex-col justify-between">
                  <div className="flex items-center text-sm font-medium text-[#94A3B8] mb-2">
                    <Target className="w-4 h-4 mr-2" />
                    Win Rate
                  </div>
                  <div className="text-3xl font-bold mb-1">78%</div>
                  <div className="text-xs text-[#22C55E] font-medium">↑ 5% from last month</div>
                </div>
                {/* Card 3 */}
                <div className="bg-[#1A1F2B] rounded-lg border border-[#2A3142] p-4 flex flex-col justify-between">
                  <div className="flex items-center text-sm font-medium text-[#94A3B8] mb-2">
                    <BrainCircuit className="w-4 h-4 mr-2" />
                    AI Confidence
                  </div>
                  <div className="text-3xl font-bold mb-1">94%</div>
                  <div className="text-xs text-[#22C55E] font-medium">↑ 2% from last month</div>
                </div>
              </div>

              {/* Chart & Insights Mock */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="md:col-span-2 h-64 bg-[#1A1F2B] rounded-lg border border-[#2A3142] p-6 flex flex-col relative overflow-hidden">
                  <div className="text-sm font-medium mb-4">Revenue Trajectory</div>
                  {/* CSS Chart Bars */}
                  <div className="flex items-end gap-3 h-full mt-auto">
                    {[40, 55, 45, 70, 65, 80, 90].map((h, i) => (
                      <motion.div 
                        key={i} 
                        className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm transition-colors" 
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Insights */}
                <div className="h-64 bg-[#1A1F2B] rounded-lg border border-[#2A3142] p-6 flex flex-col gap-4">
                  <div className="text-sm font-medium flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-primary" />
                    AI Insights
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/20">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                    <div className="text-xs leading-tight">Deal likely to close this week.</div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20">
                    <svg className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <div className="text-xs leading-tight">Needs follow-up with decision maker.</div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    <div className="text-xs leading-tight">Suggested action: Send technical case study.</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* Features Section (Below Fold) */}
      <section className="py-32 px-6 bg-background relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Enterprise-Grade Intelligence</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for high-performing sales teams. Experience unparalleled visibility into your revenue pipeline.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <BarChart3 className="w-8 h-8 text-primary" />,
                title: "Real-Time Revenue Forecasting",
                desc: "AI accurately predicts your end-of-quarter revenue by analyzing historical win rates and engagement signals."
              },
              {
                icon: <Target className="w-8 h-8 text-accent" />,
                title: "Risk Detection Engine",
                desc: "Identify stalling deals and hidden risks before they drop out of your pipeline."
              },
              {
                icon: <CheckCircle2 className="w-8 h-8 text-success" />,
                title: "Prescriptive Actions",
                desc: "Don't just stare at data. Our AI tells your reps exactly what to do next to push deals forward."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/30 transition-colors duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-6 bg-background text-center">
        <p className="text-muted-foreground">© 2026 Dealmind AI. Built for the future of sales.</p>
      </footer>
    </div>
  );
}
