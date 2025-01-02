import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { queryNotication } from "@/service/notications";
import { useAuthStore } from "@/store/useAuthStore";
import NoticationsItem from "@/components/NoticationsItem";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";

const Noticications = () => {
  const [notications, setNotifications] = useState<any[]>([]);
  const { userData } = useAuthStore();

  const getNotificationsList = async () => {
    const res = await queryNotication(userData?.id);
    if (res.success) setNotifications(res.data as any);
  };

  useEffect(() => {
    getNotificationsList();
  }, []);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Notications" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listStyle}
        >
          {notications.map((item) => (
            <NoticationsItem item={item} key={item?.id} />
          ))}
          {notications.length == 0 && (
            <Text style={styles.noData}>暂无数据</Text>
          )}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default Noticications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  listStyle: {
    paddingVertical: 20,
    gap: 10,
  },
  noData: {
    fontSize: hp(1.8),
    fontWeight: theme.fonts.medium as any,
    color: theme.colors.text,
    textAlign: "center",
  },
});
