import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { Layout } from './components/layout/Layout'
import { LoadingSpinner } from './components/ui/LoadingSpinner'

// Pages
import { SignIn } from './pages/auth/SignIn'
import { SignUp } from './pages/auth/SignUp'
import { Dashboard } from './pages/Dashboard'
import { Customers } from './pages/Customers'

const queryClient = new QueryClient()

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth/signin" replace />
  }

  return <Layout>{children}</Layout>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth/signin" element={
        <PublicRoute>
          <SignIn />
        </PublicRoute>
      } />
      <Route path="/auth/signup" element={
        <PublicRoute>
          <SignUp />
        </PublicRoute>
      } />

      {/* Protected routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/customers" element={
        <ProtectedRoute>
          <Customers />
        </ProtectedRoute>
      } />
      <Route path="/visits" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Ziyaretler</h1>
            <p className="text-gray-600">Ziyaretler sayfası geliştiriliyor...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/operators" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Operatörler</h1>
            <p className="text-gray-600">Operatörler sayfası geliştiriliyor...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/equipment" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Ekipmanlar</h1>
            <p className="text-gray-600">Ekipmanlar sayfası geliştiriliyor...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/materials" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Malzemeler</h1>
            <p className="text-gray-600">Malzemeler sayfası geliştiriliyor...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/warehouse" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Depo</h1>
            <p className="text-gray-600">Depo sayfası geliştiriliyor...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/service-requests" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Servis Talepleri</h1>
            <p className="text-gray-600">Servis talepleri sayfası geliştiriliyor...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/reports" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Raporlar</h1>
            <p className="text-gray-600">Raporlar sayfası geliştiriliyor...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Ayarlar</h1>
            <p className="text-gray-600">Ayarlar sayfası geliştiriliyor...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/companies" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Firmalar</h1>
            <p className="text-gray-600">Firmalar sayfası geliştiriliyor...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/branches" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Şubeler</h1>
            <p className="text-gray-600">Şubeler sayfası geliştiriliyor...</p>
          </div>
        </ProtectedRoute>
      } />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  )
}