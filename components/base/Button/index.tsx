import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { CSSProperties, FC, ReactNode } from "react";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import Loading from "../Loading";

interface IButtonProps {
  buttonStyle?: Record<string, any>;
  textStyle?: Record<string, any>;
  title: string | ReactNode;
  onPress: () => void;
  loading?: boolean;
  hasShadow?: boolean;
}
const shadowStyle = {
  shadowColor: theme.colors.dark,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 4,
};

const Button: FC<IButtonProps> = ({
  buttonStyle = {},
  textStyle = {},
  title = "",
  loading = false,
  hasShadow = true,
  onPress,
}) => {
  if (loading) {
    return (
      <View style={[styles.button, buttonStyle, { backgroundColor: "white" }]}>
        <Loading />
      </View>
    );
  }

  return (
    //? Pressable是什么?
    <Pressable
      onPress={onPress}
      style={[styles.button, buttonStyle, hasShadow && shadowStyle]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    height: hp(6.6),
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous", //?
    borderRadius: theme.radius.xl,
  },
  text: {
    fontSize: hp(2.5),
    color: "white",
    fontWeight: theme.fonts.bold as any,
  },
});
