import { Image, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const avatarPlaceholder = require("../../assets/img/avatar_placeholder.png");

export default function ThemeToggle(props) {
  const { url, size, createAvatar } = props;
  const avatarUrl = `https://instedu-api.orikfw.com/${url}`;
  let avatarWH = 90;

  if (size === "small") {
    avatarWH = 50;
  }

  return (
    <Pressable
      style={{ ...styles.avatar, width: avatarWH }}
      onPress={createAvatar}
    >
      <Image
        source={url ? { uri: avatarUrl } : avatarPlaceholder}
        borderRadius={50}
        style={{ ...styles.image, width: avatarWH, height: avatarWH }}
      />
      {size !== "small" && (
        <FontAwesome
          size={20}
          style={styles.icon}
          name={"edit"}
          color={"#558fd7"}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatar: {
    position: "relative",
  },
  image: {},
  icon: {
    position: "absolute",
    bottom: 5,
    left: 70,
  },
});
