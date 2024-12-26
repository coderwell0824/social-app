import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Button from "@/components/base/Button";
import { useRouter } from "expo-router";
import { commonWelcomeStyle } from "@/styles/common";

const Welcome = () => {
  const router = useRouter();

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Image
          style={styles.welcomeImage}
          resizeMode="contain" //?
          source={require("../assets/images/react-logo.png")}
        />

        <View style={{ gap: 20 }}>
          <Text style={styles.title}>Link Up!</Text>
          <Text style={styles.punchline}>
            Where every thought finds a home and every image tells a story
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Getting Started"
            onPress={() => router.push("/signUp")}
            buttonStyle={{ marginHorizontal: wp(3) }}
          />
          <View style={styles.bottomTexContainer}>
            <Text style={styles.loginText}>Already have an account!</Text>
            <Pressable onPress={() => router.push("/login")}>
              <Text
                style={[
                  styles.loginText,
                  {
                    color: theme.colors.primaryDark,
                    fontWeight: theme.fonts.semibold as any,
                  },
                ]}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  ...commonWelcomeStyle,
});
