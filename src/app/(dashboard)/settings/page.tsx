"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, Shield, Info, Palette, Bell, Bot, Key, Smartphone } from "lucide-react";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// --- Validation Schemas ---
const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
type PasswordFormValues = z.infer<typeof passwordSchema>;

const notificationsSchema = z.object({
  emailNotif: z.boolean(),
  pushNotif: z.boolean(),
  slackNotif: z.boolean(),
});
type NotificationsFormValues = z.infer<typeof notificationsSchema>;

const aiSchema = z.object({
  proactiveSuggestions: z.boolean(),
  automatedSummaries: z.boolean(),
});
type AiFormValues = z.infer<typeof aiSchema>;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'General' | 'Security' | 'About'>('General');
  const { theme, setTheme } = useTheme();

  // Forms
  const { register: registerPwd, handleSubmit: handlePwdSubmit, formState: { errors: pwdErrors, isSubmitting: isPwdSubmitting }, reset: resetPwd } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema)
  });

  const { register: registerNotif, handleSubmit: handleNotifSubmit, watch: watchNotif, setValue: setNotifValue, formState: { isSubmitting: isNotifSubmitting } } = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: { emailNotif: true, pushNotif: true, slackNotif: false }
  });

  const { register: registerAi, handleSubmit: handleAiSubmit, watch: watchAi, setValue: setAiValue, formState: { isSubmitting: isAiSubmitting } } = useForm<AiFormValues>({
    resolver: zodResolver(aiSchema),
    defaultValues: { proactiveSuggestions: true, automatedSummaries: true }
  });

  // Save Handlers
  const onSavePassword = async (data: PasswordFormValues) => {
    await new Promise(r => setTimeout(r, 1000)); // mock api call
    alert("Password updated successfully!");
    resetPwd();
  };

  const onSaveNotif = async (data: NotificationsFormValues) => {
    await new Promise(r => setTimeout(r, 1000));
    alert("Notification preferences saved!");
  };

  const onSaveAi = async (data: AiFormValues) => {
    await new Promise(r => setTimeout(r, 1000));
    alert("AI settings saved!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your application preferences and security.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 space-y-1 shrink-0">
          <Button variant={activeTab === 'General' ? 'secondary' : 'ghost'} className="w-full justify-start gap-2" onClick={() => setActiveTab('General')}>
            <Settings className="w-4 h-4" /> General
          </Button>
          <Button variant={activeTab === 'Security' ? 'secondary' : 'ghost'} className="w-full justify-start gap-2" onClick={() => setActiveTab('Security')}>
            <Shield className="w-4 h-4" /> Security
          </Button>
          <Button variant={activeTab === 'About' ? 'secondary' : 'ghost'} className="w-full justify-start gap-2" onClick={() => setActiveTab('About')}>
            <Info className="w-4 h-4" /> About
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          
          {activeTab === 'General' && (
            <>
              {/* Appearance */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2"><Palette className="w-5 h-5 text-primary"/> Appearance</CardTitle>
                  <CardDescription>Customize the look and feel of Dealmind.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')} className="flex-1">Light Mode</Button>
                    <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')} className="flex-1">Dark Mode</Button>
                    <Button variant={theme === 'system' ? 'default' : 'outline'} onClick={() => setTheme('system')} className="flex-1">System</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <form onSubmit={handleNotifSubmit(onSaveNotif)}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Bell className="w-5 h-5 text-primary"/> Notifications</CardTitle>
                    <CardDescription>Configure how you receive alerts.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-notif" checked={watchNotif('emailNotif')} onCheckedChange={(c) => setNotifValue('emailNotif', !!c)} />
                      <label htmlFor="email-notif" className="text-sm font-medium leading-none">Email Notifications</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="push-notif" checked={watchNotif('pushNotif')} onCheckedChange={(c) => setNotifValue('pushNotif', !!c)} />
                      <label htmlFor="push-notif" className="text-sm font-medium leading-none">Push Notifications</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="slack-notif" checked={watchNotif('slackNotif')} onCheckedChange={(c) => setNotifValue('slackNotif', !!c)} />
                      <label htmlFor="slack-notif" className="text-sm font-medium leading-none">Slack Integration Alerts</label>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/30 pt-4 rounded-b-xl border-t">
                    <Button type="submit" disabled={isNotifSubmitting}>{isNotifSubmitting ? "Saving..." : "Save Preferences"}</Button>
                  </CardFooter>
                </form>
              </Card>

              {/* AI Settings */}
              <Card>
                <form onSubmit={handleAiSubmit(onSaveAi)}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Bot className="w-5 h-5 text-primary"/> AI Preferences</CardTitle>
                    <CardDescription>Adjust how the AI Assistant behaves.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Proactive Suggestions</p>
                        <p className="text-sm text-muted-foreground">AI will suggest actions based on your activity.</p>
                      </div>
                      <Checkbox checked={watchAi('proactiveSuggestions')} onCheckedChange={(c) => setAiValue('proactiveSuggestions', !!c)} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Automated Meeting Summaries</p>
                        <p className="text-sm text-muted-foreground">Automatically process meeting transcripts.</p>
                      </div>
                      <Checkbox checked={watchAi('automatedSummaries')} onCheckedChange={(c) => setAiValue('automatedSummaries', !!c)} />
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/30 pt-4 rounded-b-xl border-t">
                    <Button type="submit" disabled={isAiSubmitting}>{isAiSubmitting ? "Saving..." : "Save AI Settings"}</Button>
                  </CardFooter>
                </form>
              </Card>
            </>
          )}

          {activeTab === 'Security' && (
            <>
              {/* Change Password */}
              <Card>
                <form onSubmit={handlePwdSubmit(onSavePassword)}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Key className="w-5 h-5 text-primary"/> Change Password</CardTitle>
                    <CardDescription>Update your password to keep your account secure.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Password</label>
                      <Input type="password" {...registerPwd("currentPassword")} />
                      {pwdErrors.currentPassword && <p className="text-xs text-destructive">{pwdErrors.currentPassword.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">New Password</label>
                      <Input type="password" {...registerPwd("newPassword")} />
                      {pwdErrors.newPassword && <p className="text-xs text-destructive">{pwdErrors.newPassword.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Confirm New Password</label>
                      <Input type="password" {...registerPwd("confirmPassword")} />
                      {pwdErrors.confirmPassword && <p className="text-xs text-destructive">{pwdErrors.confirmPassword.message}</p>}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/30 pt-4 rounded-b-xl border-t">
                    <Button type="submit" disabled={isPwdSubmitting}>{isPwdSubmitting ? "Updating..." : "Update Password"}</Button>
                  </CardFooter>
                </form>
              </Card>

              {/* 2FA */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2"><Smartphone className="w-5 h-5 text-primary"/> Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Two-factor authentication is currently disabled.</p>
                  <Button variant="outline" onClick={() => alert("Setting up 2FA...")}>Enable 2FA</Button>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-destructive/30">
                <CardHeader>
                  <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
                  <CardDescription>Irreversible account actions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" onClick={() => confirm("Are you absolutely sure you want to delete your account?")}>Delete Account</Button>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'About' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><Info className="w-5 h-5 text-primary"/> About Dealmind</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Version</span>
                  <span className="text-muted-foreground">v2.4.0 (Build 1084)</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">License</span>
                  <span className="text-muted-foreground">Enterprise Edition</span>
                </div>
                <div className="pt-4">
                  <p className="text-muted-foreground mb-2">Dealmind is the premier AI-powered sales intelligence platform, designed to help account executives close deals faster.</p>
                  <div className="flex gap-4 mt-4">
                    <a href="#" className="text-primary hover:underline">Terms of Service</a>
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                    <a href="#" className="text-primary hover:underline">Documentation</a>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
