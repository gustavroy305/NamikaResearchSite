import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { StudyProvider } from './contexts/StudyContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ResearcherDashboard } from './pages/researcher/ResearcherDashboard';
import { CreateStudyPage } from './pages/researcher/CreateStudyPage';
import { ParticipantDashboard } from './pages/participant/ParticipantDashboard';
import { BrowseStudies } from './pages/participant/BrowseStudies';
import { StudyDetailPage } from './pages/participant/StudyDetailPage';

// Protected Route component
function ProtectedRoute({ children, userType }: { children: React.ReactNode; userType?: 'researcher' | 'participant' }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (userType && user.type !== userType) {
    const dashboardPath = user.type === 'researcher' ? '/researcher/dashboard' : '/participant/dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Researcher Routes */}
            <Route 
              path="/researcher/dashboard" 
              element={
                <ProtectedRoute userType="researcher">
                  <ResearcherDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/researcher/create-study" 
              element={
                <ProtectedRoute userType="researcher">
                  <CreateStudyPage />
                </ProtectedRoute>
              } 
            />

            {/* Participant Routes */}
            <Route 
              path="/participant/dashboard" 
              element={
                <ProtectedRoute userType="participant">
                  <ParticipantDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/participant/browse" 
              element={
                <BrowseStudies />
              } 
            />
            <Route 
              path="/participant/study/:studyId" 
              element={
                <StudyDetailPage />
              } 
            />

            {/* Default redirects */}
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <StudyProvider>
          <AppContent />
        </StudyProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;