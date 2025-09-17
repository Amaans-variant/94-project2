import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, User, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  onMenuToggle: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated, onMenuToggle, onLogout }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/colleges', label: 'Colleges' },
    { path: '/quiz', label: 'Quiz' },
    { path: '/timeline', label: 'Timeline' }
  ];

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl group-hover:shadow-lg transition-shadow">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduPath Advisor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </button>
                <div className="flex items-center space-x-2">
                  <Link 
                    to="/dashboard" 
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden md:inline">Dashboard</span>
                  </Link>
                  {onLogout && (
                    <button
                      onClick={onLogout}
                      className="px-3 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                >
                  Sign Up
                </Link>
              </div>
            )}
            
            {/* Mobile menu button */}
            <button 
              onClick={onMenuToggle}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};