"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Target, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { login } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterValues) {
    setIsLoading(true);
    // Simulate API delay for registration
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Immediately login with the new email
    await login(values.email);
    setIsLoading(false);
    router.push("/");
  }

  // Calculate password strength
  const pwd = form.watch("password") || "";
  const hasLength = pwd.length >= 8;
  const hasUpper = /[A-Z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);
  const strengthScore = [hasLength, hasUpper, hasNumber].filter(Boolean).length;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4 py-10">
      <Card className="w-full max-w-lg shadow-xl border-accent/20">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="flex justify-center mb-2">
            <div className="bg-primary/10 p-3 rounded-2xl">
              <Target className="w-10 h-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription>
            Join Dealmind to accelerate your sales pipeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Full Name</label>
                <Input placeholder="John Doe" {...form.register("name")} className="bg-background" />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Company</label>
                <Input placeholder="Acme Corp" {...form.register("company")} className="bg-background" />
                {form.formState.errors.company && (
                  <p className="text-xs text-destructive">{form.formState.errors.company.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Work Email</label>
              <Input type="email" placeholder="john@acme.com" {...form.register("email")} className="bg-background" />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium leading-none">Password</label>
              <Input type="password" {...form.register("password")} className="bg-background" />
              {form.formState.errors.password && (
                <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
              )}
              
              {/* Password Strength Indicator */}
              {pwd.length > 0 && (
                <div className="mt-2 space-y-2">
                  <div className="flex gap-1 h-1.5">
                    <div className={`flex-1 rounded-full ${strengthScore >= 1 ? 'bg-destructive' : 'bg-muted'} ${strengthScore >= 2 && 'bg-warning'} ${strengthScore >= 3 && 'bg-success'}`} />
                    <div className={`flex-1 rounded-full ${strengthScore >= 2 ? 'bg-warning' : 'bg-muted'} ${strengthScore >= 3 && 'bg-success'}`} />
                    <div className={`flex-1 rounded-full ${strengthScore >= 3 ? 'bg-success' : 'bg-muted'}`} />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span className={`flex items-center gap-1 ${hasLength ? 'text-success' : ''}`}>
                      <CheckCircle2 className="w-3 h-3" /> 8+ chars
                    </span>
                    <span className={`flex items-center gap-1 ${hasUpper ? 'text-success' : ''}`}>
                      <CheckCircle2 className="w-3 h-3" /> Uppercase
                    </span>
                    <span className={`flex items-center gap-1 ${hasNumber ? 'text-success' : ''}`}>
                      <CheckCircle2 className="w-3 h-3" /> Number
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Confirm Password</label>
              <Input type="password" {...form.register("confirmPassword")} className="bg-background" />
              {form.formState.errors.confirmPassword && (
                <p className="text-xs text-destructive">{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full font-semibold mt-6" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center bg-muted/20 border-t p-4 rounded-b-xl">
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
