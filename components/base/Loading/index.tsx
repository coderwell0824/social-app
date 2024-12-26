import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { theme } from "@/constants/theme";

interface ILoadingProps {
  size?: "small" | "large";
  color?: string;
}

const Loading: FC<ILoadingProps> = ({
  size = "large",
  color = theme.colors.primary,
}) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
