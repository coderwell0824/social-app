import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Icon from "@/assets/icons";
import { theme } from "@/constants/theme";
import { Router, useRouter } from "expo-router";

interface IBackButtonProps {
  size?: number;
}

const BackButton: FC<IBackButtonProps> = ({ size = 36 }) => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.back()} style={styles.button}>
      <Icon
        name="arrowLeft"
        stokeWidth={2.5}
        size={size}
        color={theme.colors.text}
      />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: theme.radius.sm,
    // backgroundColor: "rgba(0,0,0,0.07)",
  },
});
