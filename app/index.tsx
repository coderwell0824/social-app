import { View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Loading from "@/components/base/Loading";

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Loading />
    </View>
  );
};

export default App;
