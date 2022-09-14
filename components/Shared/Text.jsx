import { Text } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function CustomText(props) {
  const { children, styles } = props;
  const { colors } = useTheme();

  return <Text style={{ ...styles, color: colors.text }}>{children}</Text>;
}
