import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import {
  createComment,
  deletePost,
  getPostDetailById,
  removeComment,
} from "@/service/post";
import PostCard from "@/components/PostCard";
import { useAuthStore } from "@/store/useAuthStore";
import Header from "@/components/Header";
import Input from "@/components/base/Input";
import Loading from "@/components/base/Loading";
import Icon from "@/assets/icons";
import CommentItem from "@/components/CommentItem";
import { useChannel } from "@/hooks/useChannel";
import { getUserDataByUserId } from "@/service/user";
import { createNotification } from "@/service/notications";

const PostDetail = () => {
  const { postId, commmentId } = useLocalSearchParams();
  const [postDetail, setPostDetail] = useState<any>(null);
  const { userData } = useAuthStore();
  const [commentText, setCommentText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getPostDetail = async () => {
    const res = await getPostDetailById(postId as string);
    if (res.success) {
      setPostDetail(res.data);
    } else {
      return (
        <View
          style={[
            styles.center,
            { justifyContent: "flex-start", marginTop: 100 },
          ]}
        >
          <Text style={styles.notFound}>Post not found!</Text>
        </View>
      );
    }
  };
  useEffect(() => {
    getPostDetail();
  }, []);

  const sendComment = async () => {
    if (!commentText) Alert.alert("Comment", "please enter a comment");
    setLoading(true);

    const data = {
      userId: userData?.id,
      postId,
      text: commentText,
    };

    const res = await createComment(data);
    setLoading(false);

    if (res.success) {
      getPostDetail();
      setCommentText("");
      if (userData?.id !== postDetail?.userId) {
        const notify = {
          senderId: userData?.id,
          receiverId: postDetail?.userId,
          title: "commented on  your post",
          data: JSON.stringify({
            postId: postDetail?.id,
            commentId: res?.data?.id,
          }),
        };

        createNotification(notify);
      }
    }
  };

  const onDeleteComment = async (commentItem: Record<string, any>) => {
    const res = await removeComment(commentItem?.id);
    if (res.success) {
      getPostDetail();
    } else {
      Alert.alert("comment deleted", res.message);
    }
  };

  const handleNewComment = async (payload: Record<string, any>) => {
    if (payload?.new) {
      const newComment = { ...payload?.new };
      const res = await getUserDataByUserId(newComment?.userId);
      newComment.userId = res.success ? res.data : {};
      setPostDetail((prev: any) => ({
        ...prev,
        comment: [newComment, ...prev.comments],
      }));
    }
  };

  // useChannel(
  //   "comments",
  //   {
  //     event: "INSERT",
  //     schema: "public",
  //     table: "comments",
  //     filter: `postId=eq.${postId}`,
  //   },
  //   handleNewComment,
  //   () => getPostDetail
  // );

  const onEditPost = (postItem: any) => {
    router.replace({
      pathname: "/newPost",
      //TODO: 重点 对于传递Object参数的params的时候使用解构
      params: {
        ...postItem,
      },
    });
  };

  const onDeletePost = async (postItem: any) => {
    const res = await deletePost(postItem);
    if (res.success) {
      router.back();
    } else {
      console.log(`Error deleting post`);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        <PostCard
          item={postDetail}
          currentUser={userData}
          hasShadow={false}
          showDelete
          onEdit={onEditPost}
          onDelete={onDeletePost}
        />

        <View style={styles.inputContainer}>
          <Input
            placeholder="enter comment..."
            onChangeText={(val) => setCommentText(val)}
            containerStyle={{ flex: 1, borderRadius: theme.radius.xl }}
            placeholderTextColor={theme.colors.textLight}
          />

          {loading ? (
            <View style={styles.loading}>
              <Loading size="small" />
            </View>
          ) : (
            <TouchableOpacity style={styles.sendIcon} onPress={sendComment}>
              <Icon name="send" color={theme.colors.primaryDark} />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ marginVertical: 15, gap: 17 }}>
          {postDetail?.comments?.length > 0 ? (
            postDetail?.comments?.map((comment: any, index: number) => (
              <CommentItem
                item={comment}
                key={index}
                hightlight={comment?.id == commmentId}
                onDelete={onDeleteComment}
                canDelete={
                  userData?.id === comment?.userId ||
                  userData?.id === postDetail?.userId
                }
              />
            ))
          ) : (
            <Text style={{ color: theme.colors.text, marginLeft: 5 }}>
              Be first to comment!
            </Text>
          )}
        </View>
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
