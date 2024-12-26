import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { AppState } from "react-native"

const supabaseUrl = "https://yngpghjxodkzjdmxrcae.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluZ3BnaGp4b2RrempkbXhyY2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMDA0MTQsImV4cCI6MjA1MDc3NjQxNH0.p5adl6XFDCzuk8PLGGuNmqA3wUXIt7vG34iSwT1i1fg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

AppState.addEventListener("change", (state) => {
  if (state == "active") {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

