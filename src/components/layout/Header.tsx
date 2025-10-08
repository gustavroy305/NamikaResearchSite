import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Menu, X, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function Header({ darkMode, toggleDarkMode }: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const getDashboardPath = () => {
    return user?.type === 'researcher' ? '/researcher/dashboard' : '/participant/dashboard';
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Namika</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  to={getDashboardPath()}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                >
                  Dashboard
                </Link>
                {user.type === 'participant' && (
                  <Link
                    to="/participant/browse"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                  >
                    Browse Studies
                  </Link>
                )}
                {user.type === 'researcher' && (
                  <Link
                    to="/researcher/create-study"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Create Study
                  </Link>
                )}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div className="flex items-center space-x-3">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <User size={18} />
                    <span className="font-medium">
                      {user.type === 'researcher' 
                        ? (user.profile as any).firstName 
                        : (user.profile as any).firstName
                      }
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4">
            {user ? (
              <div className="space-y-3">
                <Link
                  to={getDashboardPath()}
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {user.type === 'participant' && (
                  <Link
                    to="/participant/browse"
                    className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Browse Studies
                  </Link>
                )}
                {user.type === 'researcher' && (
                  <Link
                    to="/researcher/create-study"
                    className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Create Study
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-red-600 font-medium py-2"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}