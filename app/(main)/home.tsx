import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuthStore } from "@/store/useAuthStore";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Icon from "@/assets/icons";
import { useRouter } from "expo-router";
import { queryPostList } from "@/service/post";
import PostCard from "@/components/PostCard";
import Loading from "@/components/base/Loading";
import { getUserDataByUserId } from "@/service/user";
import { useChannel } from "@/hooks/useChannel";

const home = () => {
  const { userData } = useAuthStore();
  const router = useRouter();
  const [postList, setPostList] = useState<any[]>([]);
  const [limit, setLimit] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const handlePress = (key: string) => {
    if (key == "notification") {
      router.push("/noticications");
    } else if (key == "add") {
      router.push("/newPost");
    } else {
      router.push("/profile");
    }
  };

  const getPostList = async () => {
    setLimit((limit) => limit + 8);

    if (!hasMore) return null;

    const res = await queryPostList(limit + 8);
    if (res.success) {
      if (postList.length == res.data?.length) setHasMore(false);
      setPostList(res.data as any);
    } else {
      setPostList([]);
    }
  };

  const handlePostEventChange = async (payload: Record<string, any>) => {
    console.log(payload, "payload");

    if (payload?.eventType == "INSERT" && payload?.new?.id) {
      const newPost = { ...payload?.new };
      const res = await getUserDataByUserId(newPost?.userId);
      newPost.user = res.success ? res.data : {};
      setPostList((prevPosts) => [newPost, ...prevPosts]);
    }
  };

  //在FlatList中调用了获取列表的接口, 在Effect中就不需要重新调用
  useChannel(
    "posts",
    { event: "*", schema: "public", table: "posts" },
    handlePostEventChange
  );

  return (
    <ScreenWrapper bg="">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>LinkUp</Text>
          <View style={styles.icons}>
            {["notification", "add", "account"].map((item, index) => (
              <Pressable onPress={() => handlePress(item)} key={index}>
                <Icon
                  name={item}
                  size={hp(3.2)}
                  stokeWidth={2}
                  color={theme.colors.text}
                />
              </Pressable>
            ))}
          </View>
        </View>

        <FlatList
          data={postList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listStyle}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item }) => (
            <PostCard item={item} currentUser={userData} />
          )}
          onEndReached={() => getPostList()}
          onEndReachedThreshold={0}
          ListFooterComponent={
            hasMore ? (
              <View style={{ marginVertical: !postList.length ? 300 : 30 }}>
                <Loading />
              </View>
            ) : (
              <View style={{ marginVertical: 30 }}>
                <Text style={styles.noPosts}>到底了~</Text>
              </View>
            )
          }
        />
      </View>
    </ScreenWrapper>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold as any,
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderCurve: "continuous",
    borderColor: theme.colors.gray,
    borderWidth: 3,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: "center",
    color: theme.colors.text,
  },
  pill: {
    position: "absolute",
    right: -10,
    top: -4,
  },
});
