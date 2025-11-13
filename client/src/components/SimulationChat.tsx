import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, User, Bot } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

interface SimulationChatProps {
  difficulty: "beginner" | "intermediate" | "advanced";
  scenario: string;
  onSendMessage: (message: string) => void;
}

export default function SimulationChat({ 
  difficulty, 
  scenario,
  onSendMessage 
}: SimulationChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello, I need help resetting my password. I forgot it completely!',
      timestamp: '10:00 AM'
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    onSendMessage(input);
    setInput("");
    
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Thank you for your help. Can you guide me through the process?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const difficultyColors = {
    beginner: "bg-success text-success-foreground",
    intermediate: "bg-warning text-warning-foreground",
    advanced: "bg-destructive text-destructive-foreground",
  };

  return (
    <Card className="flex flex-col h-[600px]" data-testid="card-simulation-chat">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle>Live Simulation</CardTitle>
          <Badge className={difficultyColors[difficulty]} data-testid="badge-difficulty">
            {difficulty}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{scenario}</p>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
            data-testid={`message-${message.sender}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.sender === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground'
            }`}>
              {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`flex-1 max-w-[80%] ${message.sender === 'user' ? 'text-right' : ''}`}>
              <div className={`inline-block p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}>
                {message.text}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
      </CardContent>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your response..."
            className="resize-none"
            rows={2}
            data-testid="input-message"
          />
          <Button 
            onClick={handleSend}
            size="icon"
            className="h-auto"
            data-testid="button-send"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
