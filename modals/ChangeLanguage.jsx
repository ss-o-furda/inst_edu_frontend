import { StatusBar } from "expo-status-bar";
import { useTheme } from "@react-navigation/native";
import {
  FlatList,
  Platform,
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
} from "react-native";
import Text from "../components/Shared/Text";
import { useTranslation } from "react-i18next";
import "../constants/translations/i18n";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";

const Item = ({ title, onClick }) => {
  const { colors } = useTheme();
  return (
    <Pressable
      style={{ ...styles.item, borderColor: colors.border }}
      onPress={onClick}
    >
      <Text styles={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default function ChangeLanguage() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();

  const languages = [
    {
      id: 1,
      title: "English",
      onClick: () => {
        i18n.changeLanguage("en");
        DropDownPicker.setLanguage("en");
        navigation.navigate("Settings");
      },
    },
    {
      id: 2,
      title: "Українська",
      onClick: () => {
        i18n.changeLanguage("ua");
        DropDownPicker.setLanguage("ua");
        navigation.navigate("Settings");
      },
    },
  ];

  const renderItem = ({ item }) => (
    <Item title={item.title} onClick={item.onClick} />
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={languages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
  },
});
