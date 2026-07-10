"use client";

import { useState, useRef, useEffect } from "react";
import { useUiStore } from "@/store/uiStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Sparkles, X, Send, Bot, User, RefreshCw, Maximize2, Minimize2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function AIAssistant() {
  const { isChatOpen, toggleChat, chatHistory, addChatMessage, clearChat } = useUiStore();
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping, isChatOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    addChatMessage({ role: 'user', text: inputValue });
    const userText = inputValue.toLowerCase();
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let response = "I'm not sure about that. Try asking about a deal's status, generating an email, or summarizing a report.";
      
      if (userText.includes("revenue")) {
        response = "Total pipeline revenue currently stands at $1.2M. Q3 targets are on track, but you should focus on closing 'Stark Industries'.";
      } else if (userText.includes("email")) {
        response = "I can help with that. I've drafted a follow-up email. Click here to open the Email Assistant.";
        // In a real app we might inject a clickable component or use a specialized chat structure, 
        // for now we just provide the text, but let's navigate them there as an action demonstration
        setTimeout(() => router.push('/email'), 2000);
      } else if (userText.includes("stark")) {
        response = "Stark Industries is a $5B revenue account in the Defense sector. They currently have 3 open deals with us. The main risk factor is executive sponsor churn.";
      } else if (userText.includes("report")) {
        response = "Your monthly win rate is up 2% to 65%. The primary loss reason this quarter has been Price. Check the Reports page for full details.";
      }

      addChatMessage({ role: 'ai', text: response });
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isChatOpen && (
        <Button 
          onClick={toggleChat}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl p-0 bg-accent hover:bg-accent/90 border-4 border-background z-50 group transition-transform hover:scale-105"
        >
          <Sparkles className="w-6 h-6 text-accent-foreground group-hover:animate-pulse" />
        </Button>
      )}

      {/* Chat Panel */}
      {isChatOpen && (
        <Card className={`fixed right-6 bottom-6 shadow-2xl z-50 flex flex-col transition-all duration-300 ease-in-out border-accent/20 bg-background/95 backdrop-blur-xl ${isExpanded ? 'w-[600px] h-[80vh]' : 'w-[380px] h-[600px]'}`}>
          <CardHeader className="p-4 border-b bg-accent/5 flex flex-row items-center justify-between rounded-t-xl shrink-0">
            <CardTitle className="text-base flex items-center gap-2 text-accent">
              <div className="bg-accent/20 p-1.5 rounded-md">
                <Sparkles className="w-4 h-4" />
              </div>
              Dealmind AI
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={clearChat} title="Reset Chat">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={toggleChat}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-4 flex-1 overflow-y-auto space-y-4" ref={scrollRef}>
            {chatHistory.map((msg) => (
              <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-accent/20 text-accent'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 px-1">{msg.time}</span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-muted p-4 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="p-3 border-t bg-muted/30 shrink-0">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex w-full items-center space-x-2 relative"
            >
              <Input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about deals, reports, or emails..."
                className="pr-10 bg-background"
                disabled={isTyping}
              />
              <Button type="submit" size="icon" className="absolute right-1 top-1 h-7 w-7" disabled={!inputValue.trim() || isTyping}>
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
