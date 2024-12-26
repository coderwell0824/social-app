import { StyleSheet, Text, View } from "react-native";
import React, { ComponentType } from "react";
import Home from "./components/Home";
import { theme } from "@/constants/theme";
import ArrowLeft from "./components/ArrowLeft";

const iconsMap: Record<
  string,
  ComponentType<{
    height: number;
    width: number;
    stokeWidth: number;
    color: string;
  }>
> = {
  home: Home,
  arrowLeft: ArrowLeft,
};

interface IconProps {
  name: keyof typeof iconsMap;
  size?: number;
  stokeWidth?: number;
  [key: string]: any;
}

const Icon = ({ name, size = 24, stokeWidth = 1.9, ...props }: IconProps) => {
  const IconComponent = iconsMap[name];

  if (!IconComponent) {
    console.error(`Icon component for name "${name}" not found.`);
    return null; // 返回 null 以避免运行时错误
  }

  return (
    <IconComponent
      height={size}
      width={size}
      stokeWidth={stokeWidth}
      color={theme.colors.textLight}
      {...props}
    />
  );
};

export default Icon;

const styles = StyleSheet.create({});