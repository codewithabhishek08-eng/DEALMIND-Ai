"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/lib/api";
import { Task } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Calendar, Clock, User, Link as LinkIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

type ColumnType = 'Todo' | 'In Progress' | 'Completed';
const COLUMNS: { id: ColumnType, title: string }[] = [
  { id: 'Todo', title: 'To Do' },
  { id: 'In Progress', title: 'In Progress' },
  { id: 'Completed', title: 'Completed' },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [newTaskOpen, setNewTaskOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getTasks();
      setTasks(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  // HTML5 Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // necessary to allow dropping
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetStatus: ColumnType) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId) {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: targetStatus } : t));
    }
  };

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) || 
    t.assignedUser.toLowerCase().includes(search.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'Medium': return 'text-accent bg-accent/10 border-accent/20';
      case 'Low': return 'text-muted-foreground bg-muted border-border';
      default: return '';
    }
  };

  if (isLoading) {
    return <div className="p-8 flex justify-center items-center h-full text-muted-foreground">Loading tasks...</div>;
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col pb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-primary" /> Tasks Board
          </h1>
          <p className="text-muted-foreground mt-1">Drag and drop tasks across stages.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search tasks..." 
              className="pl-9 bg-card"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <Dialog open={newTaskOpen} onOpenChange={setNewTaskOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" /> Create Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input placeholder="Task title..." />
                <div className="grid grid-cols-2 gap-4">
                  <Input type="date" />
                  <Input placeholder="Assign to..." />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setNewTaskOpen(false)}>Cancel</Button>
                  <Button onClick={() => setNewTaskOpen(false)}>Create</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0">
        {COLUMNS.map(col => {
          const colTasks = filteredTasks.filter(t => t.status === col.id);
          return (
            <div 
              key={col.id}
              className="flex flex-col bg-muted/30 rounded-xl border p-4 h-full overflow-hidden"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
            >
              <div className="flex items-center justify-between mb-4 shrink-0">
                <h3 className="font-semibold">{col.title}</h3>
                <Badge variant="secondary">{colTasks.length}</Badge>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 pb-8">
                {colTasks.map(task => (
                  <Card 
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    className="cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors shadow-sm"
                  >
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <p className={`font-medium text-sm leading-tight ${task.status === 'Completed' ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </p>
                        <Badge variant="outline" className={`shrink-0 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0 ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 pt-1">
                        {task.linkedDeal && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 p-1.5 rounded border border-border/50">
                            <LinkIcon className="w-3 h-3 shrink-0" /> 
                            <span className="truncate">{task.linkedDeal}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className={task.deadline === 'Today' || task.deadline === 'Yesterday' ? 'text-destructive font-medium' : ''}>
                              {task.deadline}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            <span>{task.assignedUser}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {colTasks.length === 0 && (
                  <div className="h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-sm text-muted-foreground">
                    Drop tasks here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
