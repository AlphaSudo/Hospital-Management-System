import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/lib/ThemeContext";
import Dashboard from "@/pages/dashboard";
import AppointmentsPage from "@/pages/appointments";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/appointments" component={AppointmentsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
