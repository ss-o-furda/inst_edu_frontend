import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Platform, Pressable, Text } from "react-native";
import "../constants/translations/i18n";
import AboutModal from "../modals/AboutModal";
import ChangeLanguage from "../modals/ChangeLanguage";
import SettingsModal from "../modals/SettingsModal";
import ActivityScreen from "../screens/ActivityScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import UploadScreen from "../screens/UploadScreen";
import LinkingConfiguration from "./LinkingConfiguration";
import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";

export default function Navigation({ colorScheme, authState }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator authState={authState} />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator({ authState }) {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      {authState.userToken == null ? (
        <Stack.Screen
          name="Auth"
          component={AuthTabNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      )}
      {/* <Stack.Screen
        name="NotFound"
        // component={NotFoundScreen}
        options={{ title: "Oops!" }}
      /> */}
      <Stack.Group
        screenOptions={{ presentation: "modal", title: t("settings") }}
      >
        <Stack.Screen name="Settings" component={SettingsModal} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{ presentation: "modal", title: t("chooseLanguage") }}
      >
        <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{ presentation: "modal", title: t("aboutProgram") }}
      >
        <Stack.Screen name="AboutModal" component={AboutModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function HeaderLeft({ navigation }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={() => navigation.navigate("HomeScreen")}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        width: 70,
        height: 70,
      })}
    >
      <Text
        style={{
          color: colors.text,
          fontFamily: "beauty",
          width: 114,
          height: 50,
          fontSize: 50,
          marginTop: Platform.OS === "android" ? 20 : 10,
          marginLeft: 10,
        }}
      >
        InstEdu
      </Text>
    </Pressable>
  );
}

function HeaderRight({ navigation }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={() => navigation.navigate("Settings")}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        width: 70,
        height: 70,
      })}
    >
      <FontAwesome
        name="gear"
        size={30}
        color={colors.text}
        style={{
          marginTop:
            Platform.OS === "android"
              ? Constants.statusBarHeight - 10
              : Constants.statusBarHeight - 30,
          marginLeft: 15,
        }}
      />
    </Pressable>
  );
}

function BottomTabNavigator() {
  const { colors } = useTheme();
  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerLeft: () => <HeaderLeft navigation={navigation} />,
        })}
      />
      <BottomTab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={({ navigation }) => ({
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerLeft: () => <HeaderLeft navigation={navigation} />,
        })}
      />
      <BottomTab.Screen
        name="UploadScreen"
        component={UploadScreen}
        options={({ navigation }) => ({
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="upload" color={color} />,
          headerLeft: () => <HeaderLeft navigation={navigation} />,
        })}
      />
      <BottomTab.Screen
        name="ActivityScreen"
        component={ActivityScreen}
        options={({ navigation }) => ({
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
          headerLeft: () => <HeaderLeft navigation={navigation} />,
        })}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerRight: () => <HeaderRight navigation={navigation} />,
        })}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const AuthTab = createBottomTabNavigator();

function AuthTabNavigator() {
  const { colors } = useTheme();
  return (
    <AuthTab.Navigator
      initialRouteName="SignInScreen"
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <BottomTab.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={({ navigation }) => ({
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerRight: () => <HeaderRight navigation={navigation} />,
        })}
      />
      <BottomTab.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={({ navigation }) => ({
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-plus" color={color} />
          ),
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerRight: () => <HeaderRight navigation={navigation} />,
        })}
      />
    </AuthTab.Navigator>
  );
}
