import { supabase } from './supabase'
import type { Profile } from './supabase'

export interface AuthUser {
  id: string
  email: string
  profile?: Profile
}

export const authService = {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    
    if (data.user) {
      const profile = await this.getProfile(data.user.id)
      return { user: data.user, profile }
    }
    
    return { user: null, profile: null }
  },

  async signUp(email: string, password: string, fullName: string, role: Profile['role'] = 'customer') {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (error) throw error
    
    if (data.user) {
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
      
      if (profileError) throw profileError
    }
    
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) return null
    return data
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null
    
    const profile = await this.getProfile(user.id)
    
    return {
      id: user.id,
      email: user.email!,
      profile: profile || undefined
    }
  }
}