import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uortbxjznpazbvbewikj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvcnRieGp6bnBhemJ2YmV3aWtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MzE0NDcsImV4cCI6MjA4NzQwNzQ0N30._i52SeU0WNOSQ7hDxP88G5M7YfdrZaRPtM_Lybex4b8'

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
)
