import React, { createContext, useContext, useEffect, useState } from 'react'
import { authService, type AuthUser } from '../lib/auth'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string, role?: any) => Promise<void>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    let timeoutId: NodeJS.Timeout

    const initializeAuth = async () => {
      try {
        console.log('🔄 Auth initialization started...')
        
        // Set a shorter timeout to prevent infinite loading
        timeoutId = setTimeout(() => {
          if (mounted) {
            console.log('⏰ Auth initialization timeout - setting loading to false')
            setLoading(false)
          }
        }, 3000) // 3 second timeout instead of 5

        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('❌ Session error:', sessionError)
          if (mounted) {
            setUser(null)
            setLoading(false)
          }
          return
        }

        console.log('📋 Session check:', session ? 'Found session' : 'No session')
        
        if (session?.user && mounted) {
          console.log('👤 Getting user profile...')
          try {
            const currentUser = await authService.getCurrentUser()
            
            if (currentUser && mounted) {
              console.log('✅ User loaded:', currentUser.email)
              setUser(currentUser)
            } else if (mounted) {
              console.log('❌ No user profile found')
              setUser(null)
            }
          } catch (profileError) {
            console.error('❌ Profile loading error:', profileError)
            if (mounted) {
              setUser(null)
            }
          }
        } else if (mounted) {
          console.log('🚫 No session found')
          setUser(null)
        }
      } catch (error) {
        console.error('❌ Auth initialization error:', error)
        if (mounted) {
          setUser(null)
        }
      } finally {
        if (mounted) {
          console.log('✅ Auth initialization completed')
          clearTimeout(timeoutId)
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return

        console.log('🔄 Auth state changed:', event, session ? 'with session' : 'no session')

        try {
          if (event === 'SIGNED_OUT' || !session) {
            console.log('🚪 User signed out')
            setUser(null)
            setLoading(false)
            return
          }

          if (event === 'SIGNED_IN' && session?.user) {
            console.log('👤 Getting user after sign in...')
            setLoading(true)
            
            try {
              const currentUser = await authService.getCurrentUser()
              if (currentUser && mounted) {
                console.log('✅ User updated after sign in:', currentUser.email)
                setUser(currentUser)
              } else if (mounted) {
                console.log('❌ Failed to get user after sign in')
                setUser(null)
              }
            } catch (error) {
              console.error('❌ Error getting user after sign in:', error)
              if (mounted) {
                setUser(null)
              }
            } finally {
              if (mounted) {
                setLoading(false)
              }
            }
          }
        } catch (error) {
          console.error('❌ Auth state change error:', error)
          if (mounted) {
            setUser(null)
            setLoading(false)
          }
        }
      }
    )

    return () => {
      mounted = false
      clearTimeout(timeoutId)
      subscription.unsubscribe()
      console.log('🧹 Auth context cleanup')
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Starting sign in process...')
      setLoading(true)
      
      const result = await authService.signIn(email, password)
      console.log('✅ Sign in successful:', result.user?.email)
      
      // Don't set user here, let the auth state change handler do it
      console.log('⏳ Waiting for auth state change...')
      
    } catch (error) {
      console.error('❌ Sign in error:', error)
      setLoading(false)
      throw error
    }
  }

  const signUp = async (email: string, password: string, fullName: string, role?: any) => {
    await authService.signUp(email, password, fullName, role)
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await authService.signOut()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const refreshUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error('Refresh user error:', error)
      setUser(null)
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}