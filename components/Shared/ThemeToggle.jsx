import { useTheme } from "@react-navigation/native";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Switch, View } from "react-native";
import Text from "../Shared/Text";
import { ThemeContext } from "../../constants/contexts";
import "../../constants/translations/i18n";

export default function ThemeToggle(props) {
  const { t } = useTranslation();

  const { setTheme, theme } = useContext(ThemeContext);
  const toggleSwitch = () =>
    setTheme((previousState) => (previousState === "light" ? "dark" : "light"));
  return (
    <View
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Text styles={styles.title}>{t("darkTheme")}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={theme === "light" ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={theme === "light"}
      />
      <Text styles={styles.title}>{t("lightTheme")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    margin: 10,
  },
});
