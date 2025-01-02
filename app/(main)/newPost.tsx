import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Header from "@/components/Header";
import Avatar from "@/components/base/Avatar";
import { useAuthStore } from "@/store/useAuthStore";
import RichTextEditor from "@/components/base/RichTextEditor";
import Icon from "@/assets/icons";
import * as ImagePicker from "expo-image-picker";
import Button from "@/components/base/Button";
import { getFileType, getFileUri } from "@/utils/file";
import { Video } from "expo-av";
import { createOrUpdatePost } from "@/service/post";
import { router, useLocalSearchParams } from "expo-router";
import { getSupabaseFileUrl } from "@/service/common";

const NewPost = () => {
  const editRef = useRef(null);
  const [bodyHtml, setBodyHtml] = useState<any>("");

  const { userData } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const postItem = useLocalSearchParams();
  const isEdit = !Object.keys(postItem).length ? false : true;
  console.log(isEdit, "post");

  useEffect(() => {
    if (isEdit) {
      setBodyHtml(postItem?.body);
      // TODO: 重点: 对于未挂载的元素使用setTimeout
      setTimeout(() => {
        //@ts-ignore
        editRef.current?.setContentHTML(postItem?.body);
      }, 300);
      setFile(postItem?.file);
    }
  }, []);

  const onPick = async (isPickImage: boolean) => {
    let mediaConfig;
    mediaConfig = {
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // aspect: [4, 3],
      quality: 0.7,
    };

    if (!isPickImage) {
      mediaConfig = {
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
      };
    }

    let result = await ImagePicker.launchImageLibraryAsync(mediaConfig);

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const onSubmit = async () => {
    if (!bodyHtml) {
      Alert.alert("Post", "please choose an image file or add post body");
      return;
    }

    setLoading(true);

    let data: any = {
      file,
      body: bodyHtml,
      userId: userData?.id,
    };

    if (isEdit) data.id = postItem?.id;

    const res = await createOrUpdatePost(data);
    setLoading(false);

    if (res?.success) {
      setFile(null);
      setBodyHtml(null);
      //@ts-ignore
      editRef.current?.setContentHTML("");
      router.back();
    } else {
      Alert.alert("Post", res?.message);
    }
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <Header title={isEdit ? "Update Post" : "Create Post"} />
        <ScrollView contentContainerStyle={{ gap: 20 }}>
          <View style={styles.header}>
            <Avatar
              uri={userData?.image}
              size={hp(6.5)}
              rounded={theme.radius.xl}
            />
            <View style={{ gap: 2 }}>
              <Text style={styles.username}>{userData && userData?.name}</Text>
              <Text style={styles.publicText}>Public</Text>
            </View>
          </View>

          <View style={styles.textEditor}>
            <RichTextEditor
              editRef={editRef}
              onChange={(val) => setBodyHtml(val)}
            />
          </View>

          {file && (
            <View style={styles.file}>
              {getFileType(file) == "video" ? (
                <Video
                  useNativeControls
                  isLooping
                  isMuted
                  source={{ uri: getFileUri(file) }}
                  style={{ flex: 1 }}
                />
              ) : (
                <Image
                  source={{ uri: getFileUri(file) }}
                  resizeMode="cover"
                  style={{ flex: 1 }}
                />
              )}
              <Pressable style={styles.closeIcon} onPress={() => setFile(null)}>
                <Icon name="delete" size={20} color="white" />
              </Pressable>
            </View>
          )}

          <View style={styles.media}>
            <Text style={styles.addImageText}>Add to your post</Text>
            <View style={styles.mediaIcons}>
              <TouchableOpacity onPress={() => onPick(true)}>
                <Icon name="image" size={30} color={theme.colors.dark} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPick(false)}>
                <Icon name="video" size={30} color={theme.colors.dark} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Button
          buttonStyle={{ height: hp(6.2) }}
          title={isEdit ? "Update" : "Create"}
          loading={loading}
          hasShadow={false}
          onPress={onSubmit}
        />
      </View>
    </ScreenWrapper>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap: 15,
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: theme.fonts.semibold as any,
    color: theme.colors.text,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  username: {
    fontSize: hp(2.2),
    fontWeight: theme.fonts.semibold as any,
    color: theme.colors.text,
  },
  avatar: {
    height: hp(6.5),
    width: hp(6.5),
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  publicText: {
    fontSize: hp(1.7),
    fontWeight: theme.fonts.medium as any,
    color: theme.colors.textLight,
  },
  textEditor: {},
  media: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.5,
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    borderColor: theme.colors.gray,
  },
  mediaIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  addImageText: {
    fontSize: hp(1.9),
    fontWeight: theme.fonts.semibold as any,
    color: theme.colors.text,
  },
  imageIcon: {
    borderRadius: theme.radius.md,
  },
  file: {
    height: hp(30),
    width: "100%",
    borderRadius: theme.radius.xl,
    overflow: "hidden",
    borderCurve: "continuous",
  },
  video: {},
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "rgba(255,0,0,0.6)",
  },
});
