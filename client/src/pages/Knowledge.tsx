import Header from "@/components/Header";
import KnowledgeSearch from "@/components/KnowledgeSearch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, BookOpen, TrendingUp } from "lucide-react";

export default function Knowledge() {
  const categories = [
    { name: 'Technical Support', count: 24, icon: '🔧' },
    { name: 'Billing', count: 18, icon: '💳' },
    { name: 'Product Info', count: 32, icon: '📦' },
    { name: 'Policies', count: 15, icon: '📋' },
  ];

  const faqs = [
    {
      id: '1',
      question: 'How do I help a customer reset their password?',
      answer: 'Guide the customer to the login page, click "Forgot Password", enter their email, and follow the reset link sent to their inbox. Verify their identity before proceeding.',
      category: 'Technical Support',
      views: 1247
    },
    {
      id: '2',
      question: 'What is our refund policy?',
      answer: 'Customers can request refunds within 30 days of purchase. Process refunds through the admin panel and provide a confirmation email within 24 hours.',
      category: 'Policies',
      views: 892
    },
    {
      id: '3',
      question: 'How to escalate a complaint?',
      answer: 'If unable to resolve within 10 minutes or customer requests a supervisor, use the escalation button in the CRM. Document all conversation details before transferring.',
      category: 'Policies',
      views: 756
    },
    {
      id: '4',
      question: 'What are the billing cycle dates?',
      answer: 'Billing cycles run from the 1st to the last day of each month. Charges are processed on the 1st. Pro-rated charges apply for mid-month sign-ups.',
      category: 'Billing',
      views: 634
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Knowledge Base</h1>
          <p className="text-muted-foreground">Find answers and resources instantly</p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <KnowledgeSearch onSearch={(query) => console.log('Searching:', query)} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => (
            <Card 
              key={category.name} 
              className="hover-elevate cursor-pointer"
              data-testid={`card-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-2">{category.icon}</div>
                <div className="font-medium">{category.name}</div>
                <div className="text-sm text-muted-foreground">{category.count} articles</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2" data-testid="card-faq">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left" data-testid={`faq-${faq.id}`}>
                      <div className="flex items-start justify-between gap-4 flex-1 pr-4">
                        <span>{faq.question}</span>
                        <Badge variant="secondary" className="text-xs">{faq.category}</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                        <TrendingUp className="w-3 h-3" />
                        <span>{faq.views} views</span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card data-testid="card-ai-assistant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                      AI
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        Hi! I'm your AI assistant. Ask me anything about customer service procedures, policies, or troubleshooting steps.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Suggested questions:</p>
                  <div className="space-y-2">
                    {[
                      'How do I handle an angry customer?',
                      'What are the shipping timeframes?',
                      'How to process a return?'
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full text-left text-sm p-3 rounded-lg border hover-elevate"
                        onClick={() => console.log('Asked:', suggestion)}
                        data-testid={`suggestion-${index}`}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
