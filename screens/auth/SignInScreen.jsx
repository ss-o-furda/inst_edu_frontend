import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Button } from "react-native";
import Input from "../../components/Shared/Input";
import Text from "../../components/Shared/Text";
import View from "../../components/Shared/View";
import { AuthContext } from "../../constants/contexts";

export default function SignInScreen() {
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { t } = useTranslation();

  const login = () => {
    let isValid;
    if (username.trim().length === 0) {
      isValid = false;
      setUsernameError(true);
    }
    if (password.trim().length === 0) {
      isValid = false;
      setPasswordError(true);
    }
    if (username && password) {
      isValid = true;
      setUsernameError(false);
      setPasswordError(false);
    }

    if (isValid) signIn({ username, password });
  };
  return (
    <View styles={styles.container}>
      <Text styles={styles.title}>{t("signin")}</Text>
      <View styles={styles.form}>
        <Input
          inlineStyles={styles.input}
          onChange={setUsername}
          value={username}
          placeholder={t("usernamePlaceholder")}
          label={t("username")}
          fieldError={usernameError}
        />
        <Input
          inlineStyles={styles.input}
          onChange={setPassword}
          value={password}
          placeholder={t("passwordPlaceholder")}
          label={t("password")}
          password
          fieldError={passwordError}
        />

        <Button onPress={login} title={t("signin")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "25%",
  },
  form: {
    paddingVertical: 10,
    width: "80%",
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 30,
  },
});
