import { StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { ProfileContext } from "../constants/contexts";
import Header from "../components/Profile/Header";
import { getMe, getUserDataById } from "../api/api";
import Text from "../components/Shared/Text";
import View from "../components/Shared/View";

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  const { colors } = useTheme();

  const parseUserData = (data) => {
    let newData;
    newData = data;
    newData["sex"] = data["sex"].toLowerCase();
    newData["birth_date"] = new Date(data["birth_date"]).toLocaleString();
    newData["last_login"] = new Date(data["last_login"]).toLocaleString();
    return newData;
  };

  useEffect(() => {
    getUserDataById(1).then((res) => {
      setUserData(res.data);
    });
    return () => {
      setUserData(null);
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ userData }}>
      <View
        styles={{ ...styles.container, backgroundColor: colors.background }}
      >
        <Header />
      </View>
    </ProfileContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
