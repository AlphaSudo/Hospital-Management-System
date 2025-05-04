import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/lib/ThemeContext";
import Dashboard from "@/pages/dashboard";
import AppointmentsPage from "@/pages/appointments";
import DoctorsPage from "@/pages/doctors";
import NotFound from "@/pages/not-found";
import DepartmentsPage from "@/pages/departments";
import PatientsPage from "@/pages/patients";
import StaffPage from "@/pages/staff";
import BirthRecordsPage from "@/pages/BirthRecordsPage";
import DeathRecordsPage from "@/pages/DeathRecordsPage";
import CalendarPage from "@/pages/calendar";
import TasksPage from "@/pages/tasks";
import RoomsPage from "./pages/rooms";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/appointments" component={AppointmentsPage} />
      <Route path="/doctors" component={DoctorsPage} />
      <Route path="/departments" component={DepartmentsPage} />
      <Route path="/patients" component={PatientsPage} />
      <Route path="/staff" component={StaffPage} />
      <Route path="/records/birth" component={BirthRecordsPage} />
      <Route path="/records/death" component={DeathRecordsPage} />
      <Route path="/calendar" component={CalendarPage} />
      <Route path="/tasks" component={TasksPage} />
      <Route path="/rooms"  component={RoomsPage} />

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
