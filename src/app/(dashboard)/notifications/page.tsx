"use client";

import { useUiStore } from "@/store/uiStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Trash2, CheckCircle2, MessageSquare, AlertTriangle, CheckSquare, Sparkles } from "lucide-react";

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useUiStore();

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch(type) {
      case 'Meeting': return <MessageSquare className="w-5 h-5 text-primary" />;
      case 'Risk': return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'Task': return <CheckSquare className="w-5 h-5 text-accent" />;
      case 'Customer': return <MessageSquare className="w-5 h-5 text-primary" />;
      case 'AI': return <Sparkles className="w-5 h-5 text-accent" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" /> Notifications
          </h1>
          <p className="text-muted-foreground mt-1">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0} className="gap-2">
            <CheckCircle2 className="w-4 h-4" /> Mark all as read
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {notifications.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Bell className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>You&apos;re all caught up!</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 flex gap-4 transition-colors hover:bg-muted/50 ${!notification.read ? 'bg-primary/5' : ''}`}
                >
                  <div className="mt-1 shrink-0">
                    <div className="w-10 h-10 rounded-full bg-background border flex items-center justify-center">
                      {getIcon(notification.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        {!notification.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                        <h4 className={`text-sm font-semibold truncate ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notification.title}
                        </h4>
                        <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0 h-4">
                          {notification.type}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{notification.time}</span>
                    </div>
                    <p className={`text-sm ${!notification.read ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                      {notification.description}
                    </p>
                    
                    <div className="flex gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notification.read && (
                        <button onClick={() => markAsRead(notification.id)} className="text-xs text-primary font-medium hover:underline">
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 flex items-start">
                    <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
