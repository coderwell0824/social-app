import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { useAuthStore } from "@/store/useAuthStore";
import { hp, wp } from "@/helpers/common";
import Icon from "@/assets/icons";
import { theme } from "@/constants/theme";
import { supabase } from "@/lib/supabase";
import Avatar from "@/components/base/Avatar";
import { router } from "expo-router";
import { queryPostList } from "@/service/post";
import PostCard from "@/components/PostCard";
import Loading from "@/components/base/Loading";

const UserHeader = ({ user, handleLogout }: any) => {
  return (
    <View
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: wp(4) }}
    >
      <View>
        <Header title="Profile" showBackButton />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" color={theme.colors.rose} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={{ gap: 15 }}>
          <View style={styles.avatarContainer}>
            <Avatar
              uri={user?.image}
              size={hp(12)}
              rounded={theme.radius.xxl * 1.4}
            />
            <Pressable
              style={styles.editIcon}
              onPress={() => router.push("/editProfile")}
            >
              <Icon name="edit" stokeWidth={2.5} size={20} />
            </Pressable>
          </View>

          <View style={{ alignItems: "center", gap: 4 }}>
            <Text style={styles.userName}>{user && user?.name}</Text>
            <Text style={styles.infoText}>{user && user?.address}</Text>
          </View>

          <View style={{ gap: 10 }}>
            <View style={styles.info}>
              <Icon name="email" size={20} color={theme.colors.textLight} />
              <Text style={styles.infoText}>{user && user?.email}</Text>
            </View>
            {user && user?.phoneNumber && (
              <View style={styles.info}>
                <Icon name="phone" size={20} color={theme.colors.textLight} />
                <Text style={styles.infoText}>{user?.phoneNumber}</Text>
              </View>
            )}
            {user && user?.bio && (
              <Text style={styles.infoText}>{user?.bio}</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const Profile = () => {
  const { userData, setAuth } = useAuthStore();
  const [posts, setPost] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(0);

  const onLogout = async () => {
    setAuth(null);
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Logout failed", error.message);
    }
  };

  useEffect(() => {
    getPostList();
  }, []);

  const getPostList = async () => {
    setLimit((limit) => limit + 8);
    if (!hasMore) return null;
    const res = await queryPostList(limit + 8, userData?.id);
    if (res.success) {
      console.log(res.data);
      if (posts.length == res.data?.length) setHasMore(false);
      setPost(res.data as any);
    } else {
      setPost([]);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Confirm", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: onLogout,
        style: "destructive",
      },
    ]);
  };

  return (
    <ScreenWrapper bg="white">
      <FlatList
        ListHeaderComponent={
          <UserHeader user={userData} handleLogout={handleLogout} />
        }
        ListHeaderComponentStyle={{ marginBottom: 30 }}
        data={posts}
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
            <View style={{ marginVertical: !posts.length ? 300 : 30 }}>
              <Loading />
            </View>
          ) : (
            <View style={{ marginVertical: 30 }}>
              <Text style={styles.noPosts}>到底了~</Text>
            </View>
          )
        }
      />
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: wp(4),
    marginBottom: 20,
  },
  headerShape: {
    width: wp(100),
    height: hp(20),
  },
  avatarContainer: {
    height: hp(12),
    width: hp(12),
    alignSelf: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  userName: {
    fontSize: hp(3),
    fontWeight: "500",
    color: theme.colors.textDark,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontSize: hp(1.6),
    fontWeight: "500",
    color: theme.colors.textLight,
  },
  logoutButton: {
    position: "absolute",
    right: 0,
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: "#fee2e2",
  },
  listStyle: {
    paddingHorizontal: wp(4),
    paddingBottom: 30,
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: "center",
    color: theme.colors.text,
  },
});
