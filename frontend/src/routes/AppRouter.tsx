import SignupPage from "@/pages/SignupPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/pages/Dashboard";


const AnalyticsPage = () => <div className="space-y-2"><h1 className="text-2xl font-bold">Analytics Dashboard</h1><p className="text-muted-foreground">Welcome back! Here is your latest system traffic.</p></div>;
const TablesPage = () => <div className="space-y-2"><h1 className="text-2xl font-bold">Data Tables</h1><p className="text-muted-foreground">Manage client entity tracking models here.</p></div>;
const FormsPage = () => <div className="space-y-2"><h1 className="text-2xl font-bold">System Forms</h1><p className="text-muted-foreground">Manage profile form entries.</p></div>;

export default function AppRouter() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth routes */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* fallback */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<AnalyticsPage />} />
        <Route path="/tables" element={<TablesPage />} />
        <Route path="/forms" element={<FormsPage />} />
    </Routes>
  );
}