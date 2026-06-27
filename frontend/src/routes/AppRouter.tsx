import SignupPage from "@/pages/SignupPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "@/pages/LoginPage";
import DashboardLayout from "@/layouts/DashboardLayout"; // Import your updated layout
import InterviewsPage from "@/pages/Interviews"; // Your interviews table page

const AnalyticsPage = () => <div className="space-y-2"><h1 className="text-2xl font-bold">Analytics Dashboard</h1><p className="text-muted-foreground">Welcome back!</p></div>;
const TablesPage = () => <div className="space-y-2"><h1 className="text-2xl font-bold">Data Tables</h1></div>;
const FormsPage = () => <div className="space-y-2"><h1 className="text-2xl font-bold">System Forms</h1></div>;

export default function AppRouter() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public Auth routes */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Dashboard Panel Layout */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* All paths below will be cleanly rendered inside your layout's <Outlet /> */}
        <Route path="/dashboard" element={<AnalyticsPage />} />
        <Route path="/interviews" element={<InterviewsPage />} />
        <Route path="/tables" element={<TablesPage />} />
        <Route path="/forms" element={<FormsPage />} />
      </Route>
    </Routes>
  );
}