"use client";

import { useState } from "react";
import { Search, Bell, Settings, Sun, Moon, HelpCircle, Sparkles, User, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import { useTheme } from "next-themes";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { mockDeals, mockCustomers, mockMeetings } from "@/lib/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function Header() {
  const { user, logout } = useAuthStore();
  const { setTheme, theme } = useTheme();
  const { notifications, toggleChat } = useUiStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  
  return (
    <>
      <header className="h-16 bg-background/80 backdrop-blur-md border-b flex items-center justify-between px-6 sticky top-0 z-10 transition-colors">
        
        {/* Global Search */}
        <div className="flex-1 flex items-center">
          <Button 
            variant="outline" 
            className="w-full max-w-sm justify-start text-muted-foreground bg-muted/50 border-none shadow-none h-9"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            Search deals, contacts, or command...
            <kbd className="pointer-events-none absolute right-2 top-[6px] hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          
          {/* AI Assistant Button */}
          <Button 
            variant="secondary" 
            size="sm" 
            className="hidden md:flex gap-2 text-accent-foreground bg-accent/10 hover:bg-accent/20 border border-accent/20"
            onClick={toggleChat}
          >
            <Sparkles className="w-4 h-4 text-accent" />
            AI Assistant
          </Button>

          {/* Help Icon */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full">
                <HelpCircle className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Help & Support</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Keyboard Shortcuts</DropdownMenuItem>
                <DropdownMenuItem>Contact Support</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive border-2 border-background" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex justify-between items-center">
                Notifications
                {unreadCount > 0 && <Badge variant="secondary" className="text-xs font-normal">{unreadCount} Unread</Badge>}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                <div className="p-3 hover:bg-muted cursor-pointer transition-colors border-b">
                  <p className="text-sm font-medium">Acme Corp signed the contract</p>
                  <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
                </div>
                <div className="p-3 hover:bg-muted cursor-pointer transition-colors bg-muted/30">
                  <p className="text-sm font-medium">Risk alert: Global Tech</p>
                  <p className="text-xs text-muted-foreground mt-1 text-destructive">Budget concerns detected in last call</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <Button variant="ghost" className="w-full text-xs h-8">View all</Button>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <div className="w-px h-6 bg-border mx-1" />

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full ml-1">
                <Avatar className="h-8 w-8 shadow-sm">
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </header>

      {/* Command Palette Overlay */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search deals, customers, meetings..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Deals">
            {mockDeals.slice(0, 5).map(deal => (
              <CommandItem 
                key={deal.id} 
                onSelect={() => { setSearchOpen(false); router.push(`/deals/${deal.id}`); }}
              >
                <span className="font-medium mr-2">{deal.dealName}</span>
                <span className="text-muted-foreground text-xs">{deal.companyName}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Customers">
            {mockCustomers?.slice(0, 5).map(customer => (
              <CommandItem 
                key={customer.id}
                onSelect={() => { setSearchOpen(false); router.push(`/customers`); }}
              >
                <span className="font-medium mr-2">{customer.name}</span>
                <span className="text-muted-foreground text-xs">{customer.company}</span>
              </CommandItem>
            )) || (
              <CommandItem onSelect={() => { setSearchOpen(false); router.push(`/customers`); }}>
                <span>Stark Industries</span>
              </CommandItem>
            )}
          </CommandGroup>

          <CommandGroup heading="Meetings">
            {mockMeetings.slice(0, 5).map(meeting => (
              <CommandItem 
                key={meeting.id}
                onSelect={() => { setSearchOpen(false); router.push(`/meetings`); }}
              >
                <span className="font-medium mr-2">{meeting.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={() => { setSearchOpen(false); router.push(`/reports`); }}>
              Generate Report
            </CommandItem>
            <CommandItem onSelect={() => { setSearchOpen(false); router.push(`/settings`); }}>
              Settings
            </CommandItem>
          </CommandGroup>

        </CommandList>
      </CommandDialog>
    </>
  );
}
