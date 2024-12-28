import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Header from "@/components/Header";
import { Image } from "expo-image";
import { getUserImageSrc } from "@/service/user";
import { useAuthStore } from "@/store/useAuthStore";
import Icon from "@/assets/icons";
import { useDeepCompareEffect } from "ahooks";
import Input from "@/components/base/Input";
import Button from "@/components/base/Button";

const EditProfile = () => {
  const { userData } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [userFormData, setUserFormData] = useState({
    name: "",
    phoneNumber: "",
    image: null,
    bio: "",
    address: "",
  });

  useDeepCompareEffect(() => {
    if (userData) {
      setUserFormData({
        name: userData?.name || "",
        phoneNumber: userData?.phoneNumber || "",
        image: userData?.image || null,
        address: userData?.address || "",
        bio: userData?.bio || "",
      });
    }
  }, [userData]);

  const onPickImage = () => {};

  const onSubmit = () => {};

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Header title="Edit Profile" />

          <View style={styles.form}>
            <View style={styles.avatarContainer}>
              <Image
                source={getUserImageSrc(userData?.image)}
                style={styles.avatar}
              />
              <Pressable style={styles.cameraIcon} onPress={onPickImage}>
                <Icon name="email" size={20} stokeWidth={2.5} />
              </Pressable>
            </View>
            <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
              Please fill your profile details
            </Text>
            <Input
              icon={<Icon name="account" />}
              placeholder="Enter your name"
              value={userFormData.name}
              onChangeText={(val) =>
                setUserFormData({ ...userFormData, name: val })
              }
            />
            <Input
              icon={<Icon name="account" />}
              placeholder="Enter your phone number"
              value={userFormData.phoneNumber}
              onChangeText={(val) =>
                setUserFormData({ ...userFormData, phoneNumber: val })
              }
            />
            <Input
              icon={<Icon name="account" />}
              placeholder="Enter your address"
              value={userFormData.address}
              onChangeText={(val) =>
                setUserFormData({ ...userFormData, address: val })
              }
            />
            <Input
              placeholder="Enter your bio"
              value={userFormData.bio}
              multiline
              containerStyle={styles.bio}
              onChangeText={(val) =>
                setUserFormData({ ...userFormData, bio: val })
              }
            />
            <Button title="Update" loading={loading} onPress={onSubmit} />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  avatarContainer: {
    height: hp(14),
    width: hp(14),
    alignSelf: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: theme.radius.xxl * 1.8,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: theme.colors.darkLight,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: -10,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7, //?
  },
  form: {
    gap: 10,
    margin: 20,
  },
  input: {
    flexDirection: "row",
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    borderCurve: "continuous",
    padding: 17,
    paddingHorizontal: 20,
    gap: 15,
  },
  bio: {
    flexDirection: "row",
    height: hp(15),
    alignItems: "flex-start",
    paddingVertical: 15,
  },
});
