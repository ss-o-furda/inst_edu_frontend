import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Button, ScrollView } from "react-native";
import Input from "../../components/Shared/Input";
import Text from "../../components/Shared/Text";
import View from "../../components/Shared/View";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";

export default function SignUpScreen() {
  const { t } = useTranslation();
  // Form values
  const [isFormValid, setIsFormValid] = useState(true);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [webSite, setWebSite] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [sexes, setSexes] = useState([
    {
      label: t("male"),
      value: "male",
    },
    {
      label: t("female"),
      value: "female",
    },
    {
      label: t("other"),
      value: "other",
    },
    {
      label: t("notSpecified"),
      value: "not specified",
    },
  ]);

  // Form errors
  const [fullNameError, setFullNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sexError, setSexError] = useState("");
  const [birthDateError, setBirthDateError] = useState(new Date());
  const [webSiteError, setWebSiteError] = useState("");
  const [bioError, setBioError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const requiredFieldsErrors = [
    {
      field: username,
      setError: setUsernameError,
    },
    {
      field: email,
      setError: setEmailError,
    },
    { field: sex, setError: setSexError },
    { field: password, setError: setPasswordError },
  ];

  const checkIsRequiredFilled = (fieldsErrors) => {
    fieldsErrors.map(({ field, setError }) => {
      if (field.trim() === "") {
        setError("required");
        setIsFormValid(false);
      }
    });
  };

  const login = () => {
    checkIsRequiredFilled(requiredFieldsErrors);
    if (!isFormValid) {
      return;
    }
    console.log("Valid");
  };

  return (
    <ScrollView>
      <View styles={styles.container}>
        <Text styles={styles.title}>{t("signup")}</Text>
        <View styles={styles.form}>
          <Input
            inlineStyles={styles.input}
            onChange={setFullName}
            value={fullName}
            placeholder={t("fullNamePlaceholder")}
            label={t("fullName")}
            fieldError={fullNameError}
          />
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
            onChange={setEmail}
            value={email}
            placeholder={t("emailPlaceholder")}
            label={t("email")}
            fieldError={emailError}
          />
          <View styles={styles.sexPicker}>
            <DropDownPicker
              open={open}
              value={sex}
              items={sexes}
              setOpen={setOpen}
              setValue={setSex}
              setItems={setSexes}
              placeholder={t("sexPlaceholder")}
              listMode="SCROLLVIEW"
            />
          </View>

          <View styles={styles.birthDateBlock}>
            <Text>BD</Text>

            <DateTimePicker
              value={birthDate}
              mode={"date"}
              onChange={(event, value) => {
                setBirthDate(value);
              }}
              locale={t("currentLang")}
              maximumDate={new Date()}
              minimumDate={new Date(1920, 0, 1)}
            />
          </View>

          <Input
            inlineStyles={styles.input}
            onChange={setWebSite}
            value={webSite}
            placeholder={t("webSitePlaceholder")}
            label={t("webSite")}
            fieldError={webSiteError}
          />

          <Input
            inlineStyles={styles.input}
            onChange={setBio}
            value={bio}
            placeholder={t("bioPlaceholder")}
            label={t("bio")}
            multiline
            fieldError={bioError}
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

          <Button onPress={login} title={t("signup")} />
        </View>
      </View>
    </ScrollView>
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
    marginBottom: "10%",
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
  sexPicker: {
    marginVertical: 10,
    zIndex: 99,
  },
  birthDateBlock: {
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "red",
  },
});
