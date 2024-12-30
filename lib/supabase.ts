import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { AppState } from "react-native"

const supabaseUrl = "https://srlvkfjmhfcbszwqawkz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNybHZrZmptaGZjYnN6d3Fhd2t6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzNjYzMDQsImV4cCI6MjA1MDk0MjMwNH0.73Wx9JvGXIMJXGc_UTDbO2li6ewJrYmiSLygUwVGSUM"

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

