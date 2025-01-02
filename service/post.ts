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

export const deletePost = async (postItem?: any) => {
  try {
    const { data, error } = await supabase.from("posts")
      .delete().eq("id", postItem?.id);

    if (error) {
      console.log("posts error:", error);
      return { success: false, message: "Could not remove your posts" }
    }

    return { success: true, data }
  } catch (error) {
    console.log("posts error:", error);
    return { success: false, message: "Could not remove your posts" }
  }
}

export const queryPostList = async (limit: number = 10, userId?: string) => {
  if (userId) {
    try {
      const { data, error } = await supabase.from("posts")
        .select(`*,
          user: users (id, name, image),
          postLikes (*),
          comments (count)`)
        .order("created_at", { ascending: false }).eq("userId", userId).limit(limit)

      if (error) {
        console.log("queryPost error:", error);
        return { success: false, message: "Could not query your post" }
      }

      return { success: true, data }
    } catch (error) {
      console.log("queryPost error:", error);
      return { success: false, message: "Could not query your post" }
    }
  } else {
    try {
      const { data, error } = await supabase.from("posts")
        .select(`*,
          user: users (id, name, image),
          postLikes (*),
          comments (count)`)
        .order("created_at", { ascending: false }).limit(limit)

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
}

//操作
export const operatorLikePost = async (isLike = true, postLike?: Record<string, any>, postId?: string, userId?: string) => {
  try {
    if (isLike) {
      const { data, error } = await supabase.from("postLikes")
        .insert(postLike).select().single()
      if (error) {
        console.log("operator Like Post error:", error);
        return { success: false, message: "Could not operator Like Post " }
      }

      return { success: true, data }
    } else {
      const { error } = await supabase.from("postLikes")
        .delete().eq("userId", userId).eq("postId", postId)
      if (error) {
        console.log("operator Like Post error:", error);
        return { success: false, message: "Could not operator Like Post " }
      }

      return { success: true }
    }
  } catch (error) {
    console.log("operator Like Post error:", error);
    return { success: false, message: "Could not operator Like Post " }
  }
}

//获取海报的详情
export const getPostDetailById = async (postId: string) => {

  try {
    const { data, error } = await supabase.from("posts")
      .select(`*,
        user: users (id, name, image),
        postLikes (*),
        comments (*, user:users (id, name, image))`)
      .eq("id", postId)
      .order("created_at", { ascending: false, foreignTable: "comments" })
      .single();

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


export const createComment = async (comment: Record<string, any>) => {
  try {
    const { data, error } = await supabase.from("comments")
      .insert(comment).select().single();

    if (error) {
      console.log("comment error:", error);
      return { success: false, message: "Could not insert your comment" }
    }

    return { success: true, data }
  } catch (error) {
    console.log("comment error:", error);
    return { success: false, message: "Could not insert your comment" }
  }
}

export const removeComment = async (commentId: string) => {
  try {
    const { data, error } = await supabase.from("comments")
      .delete().eq("id", commentId);

    if (error) {
      console.log("comment error:", error);
      return { success: false, message: "Could not remove your comment" }
    }

    return { success: true, data }
  } catch (error) {
    console.log("comment error:", error);
    return { success: false, message: "Could not remove your comment" }
  }

}