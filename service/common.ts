export const response = (isSuccess: boolean, data: any) => {
  if (isSuccess) {
    return {
      success: isSuccess,
      data: data || null
    }
  } else {
    return {
      success: isSuccess,
      message: data
    }
  }
}

export const getSupabaseFileUrl = (filePath: string) => {
  return { uri: `https://srlvkfjmhfcbszwqawkz.supabase.co/storage/v1/object/public/uploads/${filePath}` }
}

