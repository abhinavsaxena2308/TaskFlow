import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ToastProvider from './components/ui/toast/ToastProvider';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
                path="/dashboard" 
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route 
                path="*" 
                element={<Navigate to={user ? "/dashboard" : "/"} />}
            />
        </Routes>
    );
}

// We need to wrap the App in the Router and AuthProvider
export default function AppWrapper() {
    return (
        <Router>
            <ThemeProvider>
                <AuthProvider>
                    <ToastProvider>
                        <App />
                    </ToastProvider>
                </AuthProvider>
            </ThemeProvider>
        </Router>
    );
}
