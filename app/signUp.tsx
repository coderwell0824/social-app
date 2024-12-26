import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { StatusBar } from "expo-status-bar";
import BackButton from "@/components/base/BackButton";

import { hp, wp } from "@/helpers/common";
import Input from "@/components/base/Input";
import Icon from "@/assets/icons";
import Button from "@/components/base/Button";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

const SignUp = () => {
  const [formData, setFormData] = useState<{
    username: string;
    email: string;
    password: string;
  }>({ email: "", password: "", username: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async () => {
    if (
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.username.trim()
    ) {
      Alert.alert("SignUp", "Please enter your email or password or username");
      return;
    }
    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: "123ssw",
        },
      },
    });

    setLoading(false);

    console.log(session, "session");
    console.log(error, "error");

    if (error) {
      Alert.alert("SignUp", error.message);
      return;
    }
  };

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton />

        <View>
          <Text style={styles.welcomeText}>Let‘s </Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Please fill the details to create an account
          </Text>
          <Input
            icon={<Icon name="email" size={26} stokeWidth={1.6} />}
            placeholder="Enter your username"
            value={formData.username}
            onChangeText={(val) => setFormData({ ...formData, username: val })}
          />
          <Input
            icon={<Icon name="email" size={26} stokeWidth={1.6} />}
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(val) => setFormData({ ...formData, email: val })}
          />

          <Input
            icon={<Icon name="lock" size={26} stokeWidth={1.6} />}
            placeholder="Enter your password"
            secureTextEntry
            value={formData.password}
            onChangeText={(val) => setFormData({ ...formData, password: val })}
          />

          <Button title="Sign up" loading={loading} onPress={onSubmit} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account!</Text>
          <Pressable onPress={() => router.push("/login")}>
            <Text
              style={[
                styles.footerText,
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
    </ScreenWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold as any,
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: theme.fonts.semibold as any,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});
