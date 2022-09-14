import { View } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function CustomView(props) {
  const { children, styles } = props;
  const { colors } = useTheme();

  return (
    <View style={{ ...styles, color: colors.background }}>{children}</View>
  );
}
