import { supabase } from './supabase'
import type { Profile } from './supabase'

export interface AuthUser {
  id: string
  email: string
  profile?: Profile
}

export const authService = {
  async signIn(email: string, password: string) {
    try {
      console.log('🔐 Signing in user:', email)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        console.error('❌ Sign in error:', error)
        throw error
      }
      
      if (data.user) {
        console.log('✅ User signed in, getting profile...')
        const profile = await this.getProfile(data.user.id)
        return { user: data.user, profile }
      }
      
      return { user: null, profile: null }
    } catch (error) {
      console.error('❌ Sign in service error:', error)
      throw error
    }
  },

  async signUp(email: string, password: string, fullName: string, role: Profile['role'] = 'customer') {
    try {
      console.log('📝 Signing up user:', email)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (error) {
        console.error('❌ Sign up error:', error)
        throw error
      }
      
      if (data.user) {
        console.log('✅ User signed up, creating profile...')
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email,
            full_name: fullName,
            role,
            currency: 'TRY'
          })
        
        if (profileError) {
          console.error('❌ Profile creation error:', profileError)
          throw profileError
        }
      }
      
      return data
    } catch (error) {
      console.error('❌ Sign up service error:', error)
      throw error
    }
  },

  async signOut() {
    try {
      console.log('🚪 Signing out user...')
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('❌ Sign out error:', error)
        throw error
      }
      console.log('✅ User signed out successfully')
    } catch (error) {
      console.error('❌ Sign out service error:', error)
      throw error
    }
  },

  async getProfile(userId: string): Promise<Profile | null> {
    try {
      console.log('👤 Getting profile for user:', userId)
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (error) {
        console.error('❌ Profile fetch error:', error)
        return null
      }
      
      console.log('✅ Profile loaded:', data?.email)
      return data
    } catch (error) {
      console.error('❌ Get profile service error:', error)
      return null
    }
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    try {
      console.log('📝 Updating profile for user:', userId)
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()
      
      if (error) {
        console.error('❌ Profile update error:', error)
        throw error
      }
      
      console.log('✅ Profile updated successfully')
      return data
    } catch (error) {
      console.error('❌ Update profile service error:', error)
      throw error
    }
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      console.log('🔍 Getting current user...')
      
      const { data: { user }, error } = await supabase.auth.getUser()
    
      if (error) {
        console.error('❌ Get current user error:', error)
        return null
      }
      
      if (!user) {
        console.log('🚫 No current user found')
        return null
      }
    
      console.log('👤 Current user found, getting profile...')
      const profile = await this.getProfile(user.id)
    
      const authUser = {
        id: user.id,
        email: user.email!,
        profile: profile || undefined
      }
      
      console.log('✅ Current user loaded:', authUser.email)
      return authUser
    } catch (error) {
      console.error('❌ Get current user service error:', error)
      return null
    }
  }
}