import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ShellLayout from './components/layout/ShellLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NewRequestPage from './pages/NewRequestPage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              element={
                <ProtectedRoute>
                  <ShellLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="/requests" element={<div>Requests coming soon</div>} />
              <Route path="/approvals" element={<div>Approvals coming soon</div>} />
              <Route path="/materials" element={<div>Materials coming soon</div>} />
              <Route path="/vendors" element={<div>Vendors coming soon</div>} />
              <Route path="/receiving" element={<div>Receiving coming soon</div>} />
              <Route path="/new-request" element={<NewRequestPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
