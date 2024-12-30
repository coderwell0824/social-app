import { supabase } from "@/lib/supabase";
import { getSupabaseFileUrl } from "./common";

/**
 * @description 获取指定用户
 * @param userId 用户Id
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

/**
 * 
 * @param imagePath 图片路径
 * @returns 图片路径
 */
export const getUserImageSrc = (imagePath: string) => {
  if (imagePath) {
    return getSupabaseFileUrl(imagePath)
  } else {
    return require("../assets/images/react-logo.png")
  }
}

/**
 * 
 * @param userId 用户Id
 * @param data 更新的数据
 * @returns 是否更新成功状态
 */
export const updateUserDataById = async (userId: string, data: Record<string, any>) => {
  try {
    const { error } = await supabase.from("users").update(data).eq("id", userId);
    if (error) {
      return {
        success: false,
        msg: error.message
      }
    }
    return { success: true, msg: "update Successfully" }
  } catch (error: any) {
    console.error("got error:", error);
    return {
      success: false,
      msg: error.message
    }
  }
}