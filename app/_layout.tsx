import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { getUserDataByUserId } from "@/service/user";

const _layout = () => {
  const { setAuth, setUserData } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      console.log("Auth", session?.user);

      if (session) {
        setAuth(session.user);
        updateUserData(session.user);
        router.replace("/home");
      } else {
        setAuth(null);
        router.replace("/home");
      }
    });
  }, []);

  const updateUserData = async (user: any) => {
    const res = await getUserDataByUserId(user?.id);
    if (res.success) setUserData(res.data);
  };

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default _layout;
