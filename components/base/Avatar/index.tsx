import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { hp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { Image } from "expo-image";
import { getUserImageSrc } from "@/service/user";

interface IAvatarProps {
  uri: string;
  size?: number;
  rounded?: number;
  style?: Record<string, any>;
}

const Avatar: FC<IAvatarProps> = ({
  uri,
  size = hp(4.5),
  rounded = theme.radius.md,
  style = {},
}) => {
  return (
    <Image
      source={getUserImageSrc(uri)}
      transition={100}
      style={[
        styles.avatar,
        { height: size, width: size, borderRadius: rounded },
        style,
      ]}
    />
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    borderCurve: "continuous",
    borderColor: theme.colors.darkLight,
    borderWidth: 1,
  },
});
