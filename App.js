import { StatusBar } from "expo-status-bar";
import { useState, useReducer, useMemo, useEffect } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { ThemeContext, AuthContext } from "./constants/contexts";
import * as SecureStore from "expo-secure-store";
import { login } from "./api/api";
import { Alert } from "react-native";

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            userData: action.userData,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userData: action.userData,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userData: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userData: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      let userData;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
        userData = await SecureStore.getItemAsync("userData");
      } catch (e) {
        dispatch({ type: "SIGN_OUT" });
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken, userData: userData });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        try {
          const response = await login(data);
          await SecureStore.setItemAsync(
            "userToken",
            response.data.access_token
          );
          dispatch({ type: "SIGN_IN", token: response.data.access_token });
        } catch (error) {
          Alert.alert(
            "Oops, we have a error",
            JSON.stringify(error.response.data.detail)
          );
        }
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  const [theme, setTheme] = useState(useColorScheme());
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <AuthContext.Provider value={authContext}>
          <SafeAreaProvider>
            <Navigation colorScheme={theme} authState={state} />
            <StatusBar style={theme === "dark" ? "light" : "dark"} />
            {/* do this because "auto" doesn't work */}
          </SafeAreaProvider>
        </AuthContext.Provider>
      </ThemeContext.Provider>
    );
  }
}
