import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import React, { FC, ReactNode, LegacyRef } from "react";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";

interface IInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  icon?: ReactNode;
  ref?: LegacyRef<TextInput>;
}

const Input: FC<IInputProps> = (props) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      {!!props.icon && props.icon}
      <TextInput
        style={{ flex: 1 }}
        placeholderTextColor={theme.colors.textLight}
        ref={props.ref}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: hp(7.2),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    borderCurve: "continuous",
    paddingHorizontal: 18,
    gap: 12,
  },
});
