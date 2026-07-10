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
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Log in
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
            <a href="#dashboard-preview" onClick={scrollToPreview}>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full bg-background/50 hover:bg-muted hover:scale-105 transition-all duration-200 border-border/50">
                See Live Demo
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Floating Mockup Preview */}
        <motion.div
          id="dashboard-preview"
          initial="hidden"
          animate="visible"
          variants={mockupReveal}
          className="w-full max-w-5xl mx-auto mt-20 relative z-10"
        >
          <div className="relative rounded-xl border border-border/50 bg-[#131922] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Browser Chrome */}
            <div className="h-10 border-b border-border/50 bg-[#0B1120] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-warning/80" />
              <div className="w-3 h-3 rounded-full bg-success/80" />
            </div>
            
            {/* Dashboard Mockup Content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Header Mock */}
              <div className="flex justify-between items-end">
                <div className="space-y-3">
                  <div className="h-8 w-64 bg-foreground/10 rounded-md" />
                  <div className="h-4 w-40 bg-foreground/5 rounded-md" />
                </div>
                <div className="hidden md:flex gap-3">
                  <div className="h-10 w-32 bg-foreground/5 rounded-full" />
                  <div className="h-10 w-32 bg-primary/20 border border-primary/30 rounded-full" />
                </div>
              </div>

              {/* KPI Cards Mock */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-28 bg-[#1A1F2B] rounded-lg border border-border/40 p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <div className="h-3 w-16 bg-foreground/10 rounded" />
                      <div className="h-4 w-4 rounded-full bg-foreground/10" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-6 w-24 bg-foreground/20 rounded" />
                      <div className="h-2 w-12 bg-success/40 rounded" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart Mock */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 h-64 bg-[#1A1F2B] rounded-lg border border-border/40 p-6 flex flex-col justify-end gap-2 relative overflow-hidden">
                  <div className="absolute top-6 left-6 h-4 w-32 bg-foreground/10 rounded" />
                  {/* CSS Chart Bars */}
                  <div className="flex items-end gap-3 h-3/4 mt-auto">
                    {[40, 55, 45, 70, 65, 80, 90].map((h, i) => (
                      <motion.div 
                        key={i} 
                        className="flex-1 bg-primary/20 rounded-t-sm" 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 1 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                      />
                    ))}
                  </div>
                </div>
                <div className="h-64 bg-[#1A1F2B] rounded-lg border border-border/40 p-6 space-y-4">
                  <div className="h-4 w-24 bg-foreground/10 rounded mb-4" />
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 bg-foreground/5 rounded-md w-full flex items-center px-3 gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary/50" />
                      <div className="h-2 w-full bg-foreground/10 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
