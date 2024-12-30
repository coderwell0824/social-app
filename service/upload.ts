import * as FileSystem from "expo-file-system"
import { decode } from "base64-arraybuffer"
import { supabase } from "@/lib/supabase";
import { response } from "./common";

export const uploadFile = async (folderName: string, fileUri: string, isImage?: boolean = true) => {
  try {

    const fileName = generateFilePath(folderName, isImage);  //生成唯一的文件名
    //转换为base64
    const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64
    })

    const imageData = decode(fileBase64);

    const { data, error } = await supabase.storage.from("uploads")
      .upload(fileName, imageData, {
        cacheControl: "3600",
        upsert: false,
        contentType: isImage ? "image/*" : "video/*"
      })
    if (error) {
      console.error("upload file error", error);
      response(false, "upload file error")
    }

    console.log(data, "upload")

    return response(true, data?.path)

  } catch (error) {
    console.error("upload file error", error);
    response(false, "upload file error")
  }
}

const generateFilePath = (folderName: string, isImage?: boolean) => {
  return `/${folderName}/${new Date().getTime()}.${isImage ? "png" : "mp4"}`
}