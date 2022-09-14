import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  SafeAreaView,
  View,
  Linking,
  Alert,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import white_logo from "../assets/img/instedu_logo_white.png";
import black_logo from "../assets/img/instedu_logo_black.png";
import Text from "../components/Shared/Text";
import "../constants/translations/i18n";
import { useTranslation } from "react-i18next";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

export default function AboutModal(props) {
  const { t } = useTranslation();
  const { dark, colors } = useTheme();
  let src = black_logo;

  if (dark) {
    src = white_logo;
  } else {
    src = black_logo;
  }

  const openFB = async () => {
    const fbAppUrl = "fb://profile/100003366340830";
    const fbBrowserUrl = "https://facebook.com/profile.php?id=100003366340830";
    const supported = await Linking.canOpenURL(fbAppUrl);

    if (supported) {
      await Linking.openURL(fbAppUrl);
    } else {
      await Linking.openURL(fbBrowserUrl);
    }
  };
  const openLinkedIn = async () => {
    const lnAppUrl = "linkedin://orestfurda";
    const lnBrowserUrl = "https://www.linkedin.com/in/orestfurda/";
    const supported = await Linking.canOpenURL(lnAppUrl);

    if (supported) {
      await Linking.openURL(lnAppUrl);
    } else {
      await Linking.openURL(lnBrowserUrl);
    }
  };
  const openGitHub = async () => {
    const gitAppUrl = "github://ss-o-furda";
    const gitBrowserUrl = "https://github.com/ss-o-furda";
    const supported = await Linking.canOpenURL(gitAppUrl);

    if (supported) {
      await Linking.openURL(gitAppUrl);
    } else {
      await Linking.openURL(gitBrowserUrl);
    }
  };
  const openInstagram = async () => {
    const instAppUrl = "instagram://42be_";
    const instBrowserUrl = "https://www.instagram.com/42be_/";
    const supported = await Linking.canOpenURL(instAppUrl);

    if (supported) {
      await Linking.openURL(instAppUrl);
    } else {
      await Linking.openURL(instBrowserUrl);
    }
  };
  const openTelegram = async () => {
    const tgAppUrl = "telegram://Orik_3";
    const tgBrowserUrl = "https://t.me/Orik_3";
    const supported = await Linking.canOpenURL(tgAppUrl);

    if (supported) {
      await Linking.openURL(tgAppUrl);
    } else {
      await Linking.openURL(tgBrowserUrl);
    }
  };
  const mailMe = async () => {
    const email = "mailto:orik7800@gmail.com?subject=react-native-app";
    const supported = await Linking.canOpenURL(email);

    if (supported) {
      await Linking.openURL(email);
    } else {
      await Clipboard.setStringAsync("orik7800@gmail.com");
      Alert.alert(t("copied"));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainter}>
          <Image source={src} style={styles.logo} />
        </View>
        <View style={styles.textContainer}>
          <Text styles={styles.text}>{t("aboutMe")}</Text>
          <Text styles={styles.text}>{t("aboutApp")}</Text>
          <Text styles={styles.text}>{t("mySocial")}:</Text>
        </View>
        <View style={styles.social}>
          <Ionicons
            name="ios-logo-facebook"
            size={50}
            color={colors.text}
            onPress={openFB}
          />
          <Ionicons
            name="ios-logo-linkedin"
            size={50}
            color={colors.text}
            onPress={openLinkedIn}
          />
          <Ionicons
            name="ios-logo-github"
            size={50}
            color={colors.text}
            onPress={openGitHub}
          />
          <Ionicons
            name="ios-logo-instagram"
            size={50}
            color={colors.text}
            onPress={openInstagram}
          />
          <FontAwesome
            name="telegram"
            size={50}
            color={colors.text}
            onPress={openTelegram}
          />
          <MaterialCommunityIcons
            name="gmail"
            size={50}
            color={colors.text}
            onPress={mailMe}
          />
        </View>
      </ScrollView>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  imageContainter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 200,
    marginVertical: 20,
  },
  logo: {
    width: 300,
    height: 200,
  },
  textContainer: {
    // width: "100%",
    marginHorizontal: 20,
  },
  text: {
    textAlign: "justify",
    fontSize: 24,
    marginVertical: 10,
  },
  social: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
