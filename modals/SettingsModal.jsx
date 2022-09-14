import { StatusBar } from "expo-status-bar";
import { useTheme } from "@react-navigation/native";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import ThemeToggle from "../components/Shared/ThemeToggle";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import "../constants/translations/i18n";

export default function SettingsModal() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.settingsItem}>
        <Text style={{ ...styles.title, color: colors.text }}>
          {t("chooseTheme")}:
        </Text>
        <ThemeToggle />
      </View>

      <Pressable
        style={styles.settingsItem}
        onPress={() => navigation.navigate("ChangeLanguage")}
      >
        <Text style={{ ...styles.title, color: colors.text }}>
          {t("chooseLanguage")}:
        </Text>
        <Text style={{ ...styles.title, color: colors.text }}>
          {i18n.language === "en" ? "English" : "Українська"}
        </Text>
      </Pressable>

      <Pressable
        style={styles.settingsItem}
        onPress={() => navigation.navigate("AboutModal")}
      >
        <Text style={{ ...styles.title, color: colors.text }}>
          {t("aboutProgram")}
        </Text>
      </Pressable>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  settingsItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    width: "100%",
    padding: 10,
  },
  title: {
    fontSize: 18,
  },
});
