import { useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { supabase } from "@/lib/supabase"

export const useChannel = (channelName: string, channelConfig: Record<string, any>, eventFn: Function, callback?: Function) => {
  useFocusEffect(useCallback(() => {

    callback?.()

    const channel = supabase.channel(channelName).on("postgres_changes", channelConfig, eventFn)
    return () => {
      supabase.removeChannel(channel);
    }
  }, []))
}