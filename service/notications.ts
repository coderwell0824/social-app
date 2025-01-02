import { supabase } from "@/lib/supabase";


export const queryNotication = async (userId: string) => {
  try {
    const { data, error } = await supabase.from("notifications")
      .select(`*,
       sender: senderId(id, name, image)`)
      .eq("receiverId", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.log("notifications error:", error);
      return { success: false, message: "Could not query your notifications" }
    }

    return { success: true, data }
  } catch (error) {
    console.log("notifications error:", error);
    return { success: false, message: "Could not query your notifications" }
  }

}

export const createNotification = async (notication: Record<string, any>) => {
  try {
    const { data, error } = await supabase.from("notifications")
      .insert(notication)
      .select()
      .single()

    if (error) {
      console.log("notifications error:", error);
      return { success: false, message: "Could not create your notifications" }
    }

    return { success: true, data }
  } catch (error) {
    console.log("notifications error:", error);
    return { success: false, message: "Could not create your notifications" }
  }
}