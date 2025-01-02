import { StyleSheet, Text, View } from "react-native";
import React, { ComponentType } from "react";
import Home from "./components/Home";
import { theme } from "@/constants/theme";
import ArrowLeft from "./components/ArrowLeft";
import Email from "./components/Email";
import Lock from "./components/Lock";
import Notification from "./components/Noticication";
import AddCircleIcon from "./components/Add";
import UserIcon from "./components/Account";
import Logout from "./components/Logout";
import EditIcon from "./components/Edit";
import FavouriteIcon from "./components/Heart";
import Comment from "./components/Comment";
import Share from "./components/Share";
import MenuTwoLineIcon from "./components/Control";
import SentIcon from "./components/Send";
import DeleteIcon from "./components/Delete";
import ImageIcon from "./components/Image";
import VideoIcon from "./components/video";

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
  email: Email,
  lock: Lock,
  notification: Notification,
  add: AddCircleIcon,
  account: UserIcon,
  logout: Logout,
  edit: EditIcon,
  heart: FavouriteIcon,
  comment: Comment,
  share: Share,
  menu: MenuTwoLineIcon,
  send: SentIcon,
  delete: DeleteIcon,
  image: ImageIcon,
  video: VideoIcon,
};

interface IconProps {
  name: keyof typeof iconsMap;
  size?: number;
  stokeWidth?: number;
  [key: string]: any;
  color?: string;
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
