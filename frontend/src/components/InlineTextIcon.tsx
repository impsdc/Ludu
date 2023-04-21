import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface IInlineTextIcon {
  text: string;
  inversed?: boolean;
  icon?: Props['ionIconsName'];
  background?: string;
  btnMode?: boolean;
  outline?: boolean;
  textColor?: string;
  iconColor?: string;
}

type Props = {
  ionIconsName: keyof typeof Ionicons.glyphMap;
};
export const InlineTextIcon = ({
  text,
  icon,
  inversed,
  background,
  btnMode,
  outline,
  iconColor,
  textColor,
}: IInlineTextIcon) => {
  return (
    <View
      style={[
        styles.inlineText,
        btnMode ? styles.btnMode : {},
        outline ? styles.outline : {},
        { backgroundColor: background },
      ]}
    >
      {inversed ? (
        <>
          <Text style={{ marginRight: 8, color: textColor }}>{text}</Text>
          <Ionicons name={icon} color={iconColor} size={24} />
        </>
      ) : (
        <>
          <Ionicons name={icon} color={iconColor} size={24} />
          <Text style={{ marginLeft: 8, color: textColor }}>{text}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inlineText: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnMode: {
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: 150,
  },
  outline: {
    borderWidth: 1,
    borderColor: 'grey',
  },
});
