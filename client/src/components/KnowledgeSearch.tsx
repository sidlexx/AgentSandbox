import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, FileText } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  category: string;
}

interface KnowledgeSearchProps {
  onSearch: (query: string) => void;
}

export default function KnowledgeSearch({ onSearch }: KnowledgeSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
    
    if (value.length > 2) {
      setResults([
        {
          id: '1',
          title: 'How to handle angry customers',
          excerpt: 'Learn proven de-escalation techniques to calm frustrated customers...',
          category: 'Conflict Resolution'
        },
        {
          id: '2',
          title: 'Password reset procedures',
          excerpt: 'Step-by-step guide to help customers reset their account passwords...',
          category: 'Technical Support'
        },
        {
          id: '3',
          title: 'Refund policy guidelines',
          excerpt: 'Complete overview of refund policies and how to process them...',
          category: 'Policies'
        }
      ]);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="space-y-4" data-testid="knowledge-search">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Ask anything about customer service..."
          className="pl-12 pr-12 h-14 text-lg"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          data-testid="input-search"
        />
        <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary" />
      </div>

      {results.length > 0 && (
        <Card>
          <CardContent className="p-4 space-y-2">
            {results.map((result) => (
              <button
                key={result.id}
                className="w-full text-left p-4 rounded-lg hover-elevate border"
                onClick={() => console.log('Selected:', result.title)}
                data-testid={`result-${result.id}`}
              >
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium">{result.title}</div>
                    <p className="text-sm text-muted-foreground mt-1">{result.excerpt}</p>
                    <span className="inline-block mt-2 text-xs text-secondary font-medium">
                      {result.category}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
