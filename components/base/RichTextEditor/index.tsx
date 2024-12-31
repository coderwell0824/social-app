import { View, StyleSheet, Text } from "react-native";
import React, { FC } from "react";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import { theme } from "@/constants/theme";

interface IRichTextEditorProps {
  editRef: any;
  onChange: (val: any) => void;
}

const RichTextEditor: FC<IRichTextEditorProps> = ({ editRef, onChange }) => {
  // console.log(editRef, "editRef");

  return (
    <View style={{ minHeight: 285 }}>
      <RichToolbar
        actions={[
          actions.setStrikethrough,
          actions.removeFormat,
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.blockquote,
          actions.alignLeft,
          actions.alignRight,
          actions.alignCenter,
          actions.code,
          actions.line,
          actions.heading1,
          actions.heading4,
        ]}
        iconMap={{
          [actions.heading1]: ({ tintColor }: any) => (
            <Text style={{ color: tintColor }}>H1</Text>
          ),
          [actions.heading4]: ({ tintColor }: any) => (
            <Text style={{ color: tintColor }}>H4</Text>
          ),
        }}
        selectedIconTint={theme.colors.primaryDark}
        style={styles.richBar}
        flatContainerStyle={styles.flatStyle}
        ref={editRef}
        disabled={false}
      />
      <RichEditor
        ref={editRef}
        containerStyle={styles.rich}
        editorStyle={styles.contentStyle}
        placeholder="What's on your mind?"
        onChange={onChange}
      />
    </View>
  );
};

export default RichTextEditor;

const styles = StyleSheet.create({
  richBar: {
    borderTopRightRadius: theme.radius.xl,
    borderTopLeftRadius: theme.radius.xl,
    backgroundColor: theme.colors.gray,
  },
  rich: {
    minHeight: 240,
    flex: 1,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderBottomLeftRadius: theme.radius.xl,
    borderBottomRightRadius: theme.radius.xl,
    borderColor: theme.colors.gray,
    padding: 5,
  },
  contentStyle: {
    color: theme.colors.textDark,
    // placeholderColor: "gray",
  },
  flatStyle: {
    paddingHorizontal: 8,
    gap: 3,
  },
});
