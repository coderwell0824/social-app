import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { hp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import BackButton from "../base/BackButton";

interface IHeaderProps {
  title?: string;
  showBackButton?: boolean;
  marginBottom?: number;
}

const Header: FC<IHeaderProps> = ({
  title,
  showBackButton = true,
  marginBottom = 10,
}) => {
  return (
    <View style={[styles.container, { marginBottom }]}>
      {showBackButton && (
        <View style={styles.showBackButton}>
          <BackButton />
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    gap: 10,
  },
  title: {
    fontSize: hp(2.7),
    fontWeight: theme.fonts.semibold as any,
  },
  showBackButton: {
    position: "absolute",
    left: 0,
  },
});
