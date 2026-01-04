// src/App.tsx

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { PostProvider } from '@/context/PostContext';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Lazy load main page components
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PostProvider>
          <BrowserRouter>
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900"><LoadingSpinner size={80} /></div>}>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/profile/:userId" element={<ProfilePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  {/* Future routes like /watch, /marketplace etc. go here */}
                </Route>

                {/* Catch all - 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              className: 'dark:bg-gray-700 dark:text-white bg-white text-gray-900 shadow-lg border border-gray-200 dark:border-gray-600',
            }}
          />
        </PostProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;