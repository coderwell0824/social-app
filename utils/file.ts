import { getSupabaseFileUrl } from "@/service/common";

export const isLocalFile = (file: any) => {
  if (!file) return null;
  if (typeof file === "object") return true;
  return false;
}

export const getFileType = (file: any) => {
  if (!file) return null;
  if (isLocalFile(file)) return file.type;

  if (file?.includes("postImage")) return "image";
  return "video";
}

export const getFileUri = (file: any) => {
  if (!file) return null;
  if (isLocalFile(file)) return file.uri;
  return getSupabaseFileUrl(file)?.uri;
}

