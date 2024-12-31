import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { getPostDetailById } from "@/service/post";
import PostCard from "@/components/PostCard";
import { useAuthStore } from "@/store/useAuthStore";
import Header from "@/components/Header";

const PostDetail = () => {
  const { postId } = useLocalSearchParams();
  const [postDetail, setPostDetail] = useState<any>({});
  const { userData } = useAuthStore();

  const getPostDetail = async () => {
    const res = await getPostDetailById(postId as string);
    if (res.success) {
      setPostDetail(res.data);
    }
    console.log(res.data, "post222ds");
  };

  useEffect(() => {
    getPostDetail();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Post Detail" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        <PostCard item={postDetail} currentUser={userData} hasShadow={false} />
      </ScrollView>
    </View>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: wp(7),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  list: {
    paddingHorizontal: wp(4),
  },
  sendIcon: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.8,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
    height: hp(5.8),
    width: hp(5.8),
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notFound: {
    fontSize: hp(2.5),
    color: theme.colors.text,
    fontWeight: theme.fonts.medium as any,
  },
  loading: {
    height: hp(5.8),
    width: wp(5.8),
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scale: 1.3 }],
  },
});
