import { supabase } from "@/lib/supabase";

/**
 * @description 获取指定用户
 * @param userId 
 * @returns  用户数据
 */
export const getUserDataByUserId = async (userId: string) => {
  try {

    const { data, error } = await supabase.from("users").select().eq("id", userId).single();
    if (error) {
      return {
        success: false,
        msg: error.message
      }
    }

    return { success: true, data }


  } catch (error: any) {
    console.log("got error:", error);
    return {
      success: false,
      msg: error.message
    }
  }
}