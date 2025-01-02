import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { getUserDataByUserId } from "@/service/user";
import { LogBox } from "react-native";

//TODO:LogBox可以用来忽略日志警告

LogBox.ignoreLogs([
  "Warning: TNodeChildrenRenderer",
  "Warning: MemoizedTNodeRendere",
  "Warning: TRenderEngineProvider",
]);

const _layout = () => {
  const { setAuth, setUserData } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      // console.log("Auth", session?.user);

      if (session) {
        setAuth(session.user);
        updateUserData(session.user);
        router.replace("/home");
      } else {
        setAuth(null);
        router.replace("/welcome");
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
    >
      {/* 不同页面的展示形式 */}
      <Stack.Screen
        name="(main)/postDetail"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
};

export default _layout;
