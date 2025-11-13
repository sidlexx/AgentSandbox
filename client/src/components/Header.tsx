import { Link, useLocation } from "wouter";
import { Brain, BookOpen, MessageSquare, BarChart3, Library, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { path: "/", label: "Dashboard", icon: Brain },
  { path: "/training", label: "Training Modules", icon: BookOpen },
  { path: "/simulation", label: "Live Simulation", icon: MessageSquare },
  { path: "/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/knowledge", label: "Knowledge Base", icon: Library },
];

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">AgentTrainAI</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant="ghost"
                    data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`gap-2 ${isActive ? 'text-primary' : ''}`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-secondary/20 px-4 py-1.5 rounded-full">
            <span className="text-sm font-medium">1,250 XP</span>
          </div>
          <Avatar data-testid="avatar-user">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
