import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Profile {
  id: string
  email: string
  full_name: string
  phone?: string
  role: 'admin' | 'company' | 'operator' | 'customer' | 'customer_branch'
  company_id?: string
  company_name?: string
  parent_customer_id?: string
  currency: 'TRY' | 'USD' | 'EUR' | 'GBP'
  accepted_privacy_policy?: boolean
  accepted_terms_of_service?: boolean
  privacy_policy_accepted_at?: string
  terms_of_service_accepted_at?: string
  stripe_customer_id?: string
  created_at?: string
  updated_at?: string
}

export interface Company {
  id: string
  name: string
  owner_id?: string
  address?: string
  phone?: string
  email?: string
  tax_number?: string
  tax_office?: string
  logo_url?: string
  currency: 'TRY' | 'USD' | 'EUR' | 'GBP'
  created_at?: string
  updated_at?: string
}

export interface Customer {
  id: string
  profile_id?: string
  company_name?: string
  address?: string
  latitude?: number
  longitude?: number
  created_by_company_id?: string
  created_at?: string
  updated_at?: string
}

export interface CustomerBranch {
  id: string
  customer_id?: string
  profile_id?: string
  branch_name: string
  address: string
  phone?: string
  latitude?: number
  longitude?: number
  created_by_company_id?: string
  created_at?: string
  updated_at?: string
}

export interface Operator {
  id: string
  profile_id?: string
  company_id: string
  full_name: string
  email: string
  phone?: string
  created_at?: string
  updated_at?: string
}

export interface Visit {
  id: string
  customer_id: string
  branch_id?: string
  operator_id: string
  visit_date: string
  status: 'planned' | 'completed' | 'cancelled'
  visit_type?: string
  pest_types?: string[]
  density_level?: 'none' | 'low' | 'medium' | 'high'
  equipment_checks?: any
  notes?: string
  customer_notes?: string
  start_time?: string
  end_time?: string
  report_number?: string
  report_photo_url?: string
  report_photo_file_path?: string
  is_checked?: boolean
  is_invoiced?: boolean
  created_at?: string
  updated_at?: string
}

export interface ServiceRequest {
  id: string
  customer_id?: string
  branch_id?: string
  company_id?: string
  operator_id?: string
  service_type: string
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
  priority?: 'low' | 'normal' | 'high' | 'urgent'
  scheduled_date?: string
  completed_date?: string
  notes?: string
  created_at?: string
  updated_at?: string
}