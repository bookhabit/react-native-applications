import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { FontKeys, fonts } from "@/constants/fonts";

export type TextBoxProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  fontsName?: FontKeys;
  type?: VariantKeys;
};

type VariantKeys =
  | "title1"
  | "title2"
  | "title3"
  | "title4"
  | "title5"
  | "body1"
  | "body2"
  | "body3"
  | "body4"
  | "body5"
  | "body6"
  | "body7"
  | "button1"
  | "button2"
  | "button3"
  | "button4"
  | "caption1"
  | "caption2"
  | "caption3";

const textStyles = {
  title1: { fontSize: 26, fontFamily: fonts["BMJUA"] },
  title2: { fontSize: 24, fontFamily: fonts["BMJUA"] },
  title3: { fontSize: 22, fontFamily: fonts["BMJUA"] },
  title4: { fontSize: 20, fontFamily: fonts["BMJUA"] },
  title5: { fontSize: 18, fontFamily: fonts["BMJUA"] },

  body1: { fontSize: 17, fontFamily: fonts["Pretendard400"] },
  body2: { fontSize: 16, fontFamily: fonts["Pretendard400"] },
  body3: { fontSize: 15, fontFamily: fonts["Pretendard400"] },
  body4: { fontSize: 14, fontFamily: fonts["Pretendard500"] },
  body5: { fontSize: 14, fontFamily: fonts["Pretendard400"] },
  body6: { fontSize: 13, fontFamily: fonts["Pretendard400"] },
  body7: { fontSize: 16, fontFamily: fonts["Pretendard500"] },

  button1: {
    fontSize: 18,
    fontFamily: fonts["Pretendard500"],
  },
  button2: {
    fontSize: 16,
    fontFamily: fonts["Pretendard500"],
  },
  button3: {
    fontSize: 14,
    fontFamily: fonts["Pretendard500"],
  },
  button4: {
    fontSize: 12,
    fontFamily: fonts["Pretendard500"],
  },

  caption1: {
    fontSize: 13,
    fontFamily: fonts["Pretendard400"],
  },
  caption2: {
    fontSize: 12,
    fontFamily: fonts["Pretendard500"],
  },
  caption3: {
    fontSize: 12,
    fontFamily: fonts["Pretendard400"],
  },
};

export function TextBox({
  style,
  lightColor,
  darkColor,
  type = "body1",
  fontsName = "Pretendard400",
  ...rest
}: TextBoxProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[{ color, fontFamily: fonts[fontsName] }, textStyles[type], style]}
      {...rest}
    />
  );
}
