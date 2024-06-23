import React from "react";
import { Text, TextProps } from "react-native";

interface ThemedTextProps extends TextProps {}

export default function ThemedText(props: ThemedTextProps) {
  return <Text {...props}>{props.children}</Text>;
}
