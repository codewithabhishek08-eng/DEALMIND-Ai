"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, BarChart3, BrainCircuit, Target, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Subtle Particle Background Component
const ParticleBackground = () => {
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#0B1120]">
      <div 
        className="absolute inset-0 opacity-[0.15] dark:opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #3B82F6 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: shouldReduceMotion 
            ? 'none' 
            : `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />
      {/* Soft glowing orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen opacity-50" />
    </div>
  );
};

export default function LandingPage() {
  const shouldReduceMotion = useReducedMotion();
  
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

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
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
        <ParticleBackground />
        
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
              <Button size="lg" className="h-14 px-8 text-base rounded-full hover:scale-105 transition-transform duration-200 shadow-lg shadow-primary/20">
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full bg-background/50 hover:bg-muted hover:scale-105 transition-transform duration-200 border-border/50">
              <Play className="mr-2 w-5 h-5" /> Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Mockup Preview */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-5xl mx-auto mt-16 relative z-10 perspective-[2000px]"
        >
          <div className="relative rounded-xl border border-border/50 bg-card/40 backdrop-blur-xl shadow-2xl overflow-hidden"
               style={{ transform: shouldReduceMotion ? 'none' : 'rotateX(5deg) scale(0.95)', transformOrigin: 'top center' }}>
            <div className="h-8 border-b border-border/50 bg-muted/30 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-warning/60" />
              <div className="w-3 h-3 rounded-full bg-success/60" />
            </div>
            <div className="p-6 grid grid-cols-3 gap-4 opacity-50 pointer-events-none">
              {/* Fake dashboard structure for visual effect */}
              <div className="col-span-3 flex justify-between">
                <div className="h-8 w-48 bg-muted rounded" />
                <div className="h-8 w-24 bg-primary/20 rounded" />
              </div>
              <div className="h-24 bg-muted/40 rounded-lg" />
              <div className="h-24 bg-muted/40 rounded-lg" />
              <div className="h-24 bg-muted/40 rounded-lg" />
              <div className="col-span-2 h-64 bg-muted/30 rounded-lg" />
              <div className="h-64 bg-muted/30 rounded-lg" />
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
