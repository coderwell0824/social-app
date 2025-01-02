import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import Avatar from "../base/Avatar";
import dayjs from "dayjs";
import Icon from "@/assets/icons";
import RenderHtml from "react-native-render-html";
import { Image } from "expo-image";
import { getSupabaseFileUrl } from "@/service/common";
import { Video } from "expo-av";
import { router } from "expo-router";
import { operatorLikePost } from "@/service/post";

interface IPostCardProps {
  item: any;
  currentUser: any;
  hasShadow?: boolean;
  showDelete?: boolean;
  onDelete?: (postItem: any) => void;
  onEdit?: (postItem: any) => void;
}

const textStyles = {
  color: theme.colors.dark,
  fontSize: hp(1.75),
};

const tagsStyles = {
  div: textStyles,
  p: textStyles,
  ol: textStyles,
  h1: {
    color: theme.colors.dark,
  },
  h4: {
    color: theme.colors.dark,
  },
};

const shadowStyles: ViewStyle = {
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.06,
  shadowRadius: 6,
  elevation: 1,
};

const PostCard: FC<IPostCardProps> = ({
  item,
  currentUser,
  hasShadow,
  showDelete = false,
  onDelete,
  onEdit,
}) => {
  const [likes, setLikes] = useState<any[]>([]);

  useEffect(() => {
    setLikes(item?.likes || []);
  }, []);

  const openPostDetail = () => {
    router.push({ pathname: "/postDetail", params: { postId: item?.id } });
  };

  const liked = likes?.filter((like) => like.userId == currentUser?.id)[0]
    ? true
    : false;

  const onLike = async () => {
    if (liked) {
      //remove like
      const updatedLiked = likes.filter(
        (like) => like?.userId != currentUser?.id
      );
      setLikes([...updatedLiked]);
      //TODO: 优化传参类型
      const res = await operatorLikePost(!liked, {}, item?.id, currentUser?.id);
      if (!res.success) Alert.alert("Post", "Something went wrong");
    } else {
      const data = {
        userId: currentUser?.id,
        postId: item?.id,
      };
      setLikes([...likes, data]);
      const res = await operatorLikePost(!liked, data);
      if (!res.success) Alert.alert("Post", "Something went wrong");
    }

    //TODO: 点赞新增提醒
    //TODO: 获取新数据
  };

  const onShare = () => {
    // const content={message:stri}
  };

  const handleDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => onDelete?.(item),
        style: "destructive",
      },
    ]);
  };

  const showMedia = () => {
    if (item?.file && item?.file?.includes("postImages")) {
      return (
        <Image
          source={getSupabaseFileUrl(item?.file)}
          transition={100}
          style={styles.postMedia}
          contentFit="cover"
        />
      );
    } else {
      <Video
        style={[styles.postMedia, { height: hp(30) }]}
        source={getSupabaseFileUrl(item?.file)}
        useNativeControls
        isLooping
      />;
    }
  };

  return (
    <View style={[styles.container, hasShadow && shadowStyles]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Avatar
            size={hp(4.5)}
            uri={item?.user?.image}
            rounded={theme.radius.md}
          />
          <View style={{ gap: 2 }}>
            <Text style={styles.username}>{item?.user?.name}</Text>
            <Text style={styles.postTime}>{dayjs().format("MM:D")}</Text>
          </View>

          {showDelete && currentUser?.id == item?.userId && (
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => onEdit?.(item)}>
                <Icon
                  name="edit"
                  size={hp(2.5)}
                  stokeWidth={3}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete}>
                <Icon
                  name="delete"
                  size={hp(2.5)}
                  stokeWidth={3}
                  color={theme.colors.rose}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity onPress={openPostDetail}>
          {/* <Icon
            name="menu"
            size={hp(3.4)}
            stokeWidth={3}
            color={theme.colors.text}
          /> */}
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.postBody}>
          {item?.body && (
            <RenderHtml
              contentWidth={wp(100)}
              source={{ html: item?.body }}
              tagsStyles={tagsStyles}
            />
          )}
        </View>
      </View>

      {showMedia()}

      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <TouchableOpacity onPress={onLike}>
            <Icon
              name="heart"
              size={24}
              fill={liked ? theme.colors.rose : "transparent"}
              color={liked ? theme.colors.rose : theme.colors.textLight}
            />
          </TouchableOpacity>
          <Text style={styles.count}>{likes.length || 0}</Text>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity onPress={openPostDetail}>
            <Icon name="comment" size={24} color={theme.colors.textLight} />
          </TouchableOpacity>
          <Text style={styles.count}>
            {(item?.comments && item?.comments[0]?.count) || 0}
          </Text>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity>
            <Icon name="share" size={24} color={theme.colors.textLight} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 15,
    borderRadius: theme.radius.xxl * 1.1,
    borderCurve: "continuous",
    padding: 10,
    paddingVertical: 12,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: theme.colors.gray,
    shadowColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  username: {
    fontSize: hp(1.7),
    color: theme.colors.textDark,
    fontWeight: theme.fonts.medium as any,
  },
  postTime: {
    fontSize: hp(1.4),
    color: theme.colors.textLight,
    fontWeight: theme.fonts.medium as any,
  },
  content: {
    gap: 10,
  },
  postMedia: {
    height: hp(40),
    width: "100%",
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },

  postBody: {
    marginLeft: 5,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  footerButton: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actions: {
    flexDirection: "row",
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 18,
  },
  count: {
    color: theme.colors.text,
    fontSize: hp(1.8),
  },
});
