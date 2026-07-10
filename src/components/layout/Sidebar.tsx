"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Briefcase, MessageSquare, LineChart, Target, LogOut,
  Bot, Users, CheckSquare, FileText, Bell, Settings, ChevronLeft, ChevronRight, Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/deals", label: "Deals", icon: Briefcase },
  { path: "/ai-analysis", label: "AI Analysis", icon: Bot },
  { path: "/meetings", label: "Meeting Intelligence", icon: MessageSquare },
  { path: "/email", label: "Email Assistant", icon: FileText },
  { path: "/customers", label: "Customers", icon: Users },
  { path: "/tasks", label: "Tasks", icon: CheckSquare },
  { path: "/reports", label: "Reports", icon: LineChart },
  { path: "/notifications", label: "Notifications", icon: Bell },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuthStore();
  const { sidebarCollapsed, toggleSidebar } = useUiStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by waiting for mount
  if (!mounted) {
    return <aside className="w-64 bg-background border-r h-screen sticky top-0" />;
  }

  return (
    <aside className={cn(
      "bg-background/95 backdrop-blur-md border-r flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out z-20",
      sidebarCollapsed ? "w-[72px]" : "w-64"
    )}>
      <div className={cn(
        "p-4 flex items-center h-16",
        sidebarCollapsed ? "justify-center" : "justify-between gap-3"
      )}>
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <Target className="text-primary w-7 h-7 flex-shrink-0" />
          {!sidebarCollapsed && <span className="font-bold text-xl tracking-tight text-foreground">DEALMIND</span>}
        </div>
        
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-accent text-muted-foreground hidden md:flex"
        >
          {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {!sidebarCollapsed && (
        <div className="px-4 pb-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
            <Input placeholder="Quick jump..." className="pl-9 h-9 bg-muted/50 border-transparent focus-visible:ring-1" />
          </div>
        </div>
      )}

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
          
          const LinkContent = (
            <Link
              href={item.path}
              className={cn(
                "flex items-center rounded-md text-sm font-medium transition-all group relative",
                sidebarCollapsed ? "justify-center h-10 w-10 p-0 mx-auto" : "px-3 py-2 gap-3",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className={cn("flex-shrink-0", sidebarCollapsed ? "w-5 h-5" : "w-[18px] h-[18px]")} />
              
              {!sidebarCollapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </Link>
          );

          if (sidebarCollapsed) {
            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  {LinkContent}
                </TooltipTrigger>
                <TooltipContent side="right" className="font-semibold">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return <div key={item.path}>{LinkContent}</div>;
        })}
      </nav>

      <div className="p-3 border-t">
        <div className={cn(
          "flex items-center gap-3 mb-2 rounded-md transition-all",
          sidebarCollapsed ? "justify-center" : "px-2 py-2"
        )}>
          <Avatar className="w-9 h-9 border flex-shrink-0">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-foreground">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate capitalize">{user?.role?.replace('_', ' ') || 'Sales Rep'}</p>
            </div>
          )}
        </div>

        {sidebarCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={logout}
                className="flex items-center justify-center h-10 w-10 mx-auto rounded-md text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-semibold text-destructive">
              Log out
            </TooltipContent>
          </Tooltip>
        ) : (
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-[18px] h-[18px]" />
            <span>Log out</span>
          </button>
        )}
      </div>
    </aside>
  );
}
