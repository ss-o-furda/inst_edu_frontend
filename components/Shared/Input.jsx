import { TextInput, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { isValidEmail } from "../../utils/validations";
import Text from "../Shared/Text";
import View from "../Shared/View";

export default function Input(props) {
  const [isValid, setIsValid] = useState(true);
  const {
    value,
    onChange,
    inlineStyles = {},
    placeholder = "",
    keyboardType = "default",
    multiline = false,
    password = false,
    label = "",
    fieldError,
  } = props;
  const { colors } = useTheme();
  return (
    <View>
      <Text styles={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={(value) => {
          onChange(value);
        }}
        style={{
          ...styles.input,
          ...inlineStyles,
          borderColor: fieldError ? "red" : colors.border,
        }}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "auto"}
        secureTextEntry={password}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: "100%",
    borderBottomWidth: 1,
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
