import { Text, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";

const App = () => {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <Text>index</Text>
      <Button title="跳转到welcome" onPress={() => router.push("/welcome")} />
    </ScreenWrapper>
  );
};

export default App;
