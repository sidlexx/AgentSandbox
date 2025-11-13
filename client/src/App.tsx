import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/Dashboard";
import Training from "@/pages/Training";
import Simulation from "@/pages/Simulation";
import Analytics from "@/pages/Analytics";
import Knowledge from "@/pages/Knowledge";
import Onboarding from "@/pages/Onboarding";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/training" component={Training} />
      <Route path="/simulation" component={Simulation} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/knowledge" component={Knowledge} />
      <Route path="/onboarding" component={Onboarding} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
