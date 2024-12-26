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

const Login = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert("Login", "Please enter your email or password");
      return;
    }
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    setLoading(false);

    if (error) {
      Alert.alert("Login", error.message);
    }
  };

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton />

        <View>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Please login to continue
          </Text>
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

          <Text style={styles.forgotPassword}>Forgot Password?</Text>
          <Button title="Login" loading={loading} onPress={onSubmit} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Dont have an account?</Text>
          <Pressable onPress={() => router.push("/signUp")}>
            <Text
              style={[
                styles.footerText,
                {
                  color: theme.colors.primaryDark,
                  fontWeight: theme.fonts.semibold as any,
                },
              ]}
            >
              SignUp
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

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
