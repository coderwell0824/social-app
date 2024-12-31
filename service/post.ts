import { supabase } from "@/lib/supabase";
import { uploadFile } from "./upload";

export const createOrUpdatePost = async (post: { file: any, body: any }) => {

  try {
    if (post.file && typeof post.file == "object") {
      const isImageType = post.file.type === "image"

      const folderName = isImageType ? "postImages" : "postVideos";
      // const fileResult = await uploadFile(folderName, post.file?.uri, isImageType);

      // if (fileResult?.success) {
      //   post.file = fileResult.data;
      // } else {
      //   return fileResult;
      // }

      const { data, error } = await supabase.from("posts").upsert(post).select().single();

      if (error) {
        console.error("createPost error:", error);
        return { success: false, message: "Could not create your post" }
      }


      return { success: true, data }
    }
  } catch (error) {
    console.error("createPost error:", error);
    return { success: false, message: "Could not create your post" }
  }
}

export const queryPostList = async (limit: number = 10) => {

  try {
    const { data, error } = await supabase.from("posts")
      .select("*,user: users (id, name, image)").order("created_at", { ascending: false }).limit(limit)

    if (error) {
      console.log("queryPost error:", error);
      return { success: false, message: "Could not query your post" }
    }

    return { success: true, data }
  } catch (error) {
    console.log("queryPost error:", error);
    return { success: false, message: "Could not query your post" }
  }
}

export const operatorLikePost = async (isLike = true, postLike: Record<string, any>) => {

  try {
    if (isLike) {
      const { data, error } = await supabase.from("postLikes")
        .insert(postLike).select().single()
      if (error) {
        console.log("operator Like Post error:", error);
        return { success: false, message: "Could not operator Like Post " }
      }

      return { success: true, data }
    }
  } catch (error) {
    console.log("operator Like Post error:", error);
    return { success: false, message: "Could not operator Like Post " }
  }
}

export const getPostDetailById = async (postId: string) => {

  try {
    const { data, error } = await supabase.from("posts")
      .select("*,user: users (id, name, image)").eq("id", postId).single();

    if (error) {
      console.log("queryDetailPost error:", error);
      return { success: false, message: "Could not query your post" }
    }

    return { success: true, data }
  } catch (error) {
    console.log("queryDetailPost error:", error);
    return { success: false, message: "Could not query your post" }
  }
}