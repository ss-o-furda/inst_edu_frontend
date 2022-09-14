import { ProfileContext } from "../../constants/contexts";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import Avatar from "../Shared/Avatar";
import View from "../../components/Shared/View";
import Text from "../../components/Shared/Text";

export default function Header(props) {
  const { colors } = useTheme();
  const { userData } = useContext(ProfileContext);
  return (
    <View styles={styles.container}>
      <View styles={styles.info}>
        <Avatar
          url={userData?.avatar_url}
          username={userData?.user?.user_name}
        />
        <View styles={styles.numbers}>
          <View styles={styles.number}>
            <Text>42</Text>
            <Text>Дописи</Text>
          </View>
          <View styles={styles.number}>
            <Text>42</Text>
            <Text>Читають</Text>
          </View>
          <View styles={styles.number}>
            <Text>42</Text>
            <Text>Читає</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "30%",
    borderBottomWidth: 1,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "red",
    padding: 20,
  },
  numbers: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  number: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
