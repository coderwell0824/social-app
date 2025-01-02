import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import Avatar from "../base/Avatar";
import { router } from "expo-router";
import dayjs from "dayjs";

interface INoticationsItemProps {
  item: Record<string, any>;
}

const NoticationsItem: FC<INoticationsItemProps> = ({ item }) => {
  const onClick = () => {
    const { postId, commentId } = JSON.parse(item?.data);
    router.push({ pathname: "/postDetail", params: { postId, commentId } });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <Avatar uri={item?.sender?.image} size={hp(5)} />
      <View style={styles.nameTitle}>
        <Text style={styles.text}>{item?.sender?.name}</Text>
        <Text style={[styles.text, { color: theme.colors.textDark }]}>
          {item?.title}
        </Text>
      </View>
      <Text style={[styles.text, { color: theme.colors.textLight }]}>
        {dayjs(item?.created_at).format("MM-DD HH:mm")}
      </Text>
    </TouchableOpacity>
  );
};

export default NoticationsItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: theme.colors.darkLight,
    padding: 15,
    borderRadius: theme.radius.xxl,
    borderCurve: "continuous",
  },
  nameTitle: {
    flex: 1,
    gap: 2,
  },
  text: {
    fontSize: hp(1.6),
    fontWeight: theme.fonts.medium as any,
    color: theme.colors.text,
  },
});
