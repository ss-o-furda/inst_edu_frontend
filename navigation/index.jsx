import LinkingConfiguration from "./LinkingConfiguration";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Pressable, Image } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import UploadScreen from "../screens/UploadScreen";
import ActivityScreen from "../screens/ActivityScreen";
import ProfileScreen from "../screens/ProfileScreen";

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="NotFound"
        // component={NotFoundScreen}
        options={{ title: "Oops!" }}
      /> */}
      {/* <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group> */}
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function HeaderLeft({ navigation }) {
  return (
    <Pressable
      onPress={() => navigation.navigate("HomeScreen")}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        width: 70,
        height: 70,
      })}
    >
      <Image
        style={{ width: 65, height: 65 }}
        source={require("../assets/instedu_logo.png")}
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
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerLeft: () => <HeaderLeft navigation={navigation} />,
        })}
      />
      <BottomTab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={({ navigation }) => ({
          title: "Search",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerLeft: () => <HeaderLeft navigation={navigation} />,
        })}
      />
      <BottomTab.Screen
        name="UploadScreen"
        component={UploadScreen}
        options={({ navigation }) => ({
          title: "Upload",
          tabBarIcon: ({ color }) => <TabBarIcon name="upload" color={color} />,
          headerLeft: () => <HeaderLeft navigation={navigation} />,
        })}
      />
      <BottomTab.Screen
        name="ActivityScreen"
        component={ActivityScreen}
        options={({ navigation }) => ({
          title: "Activity",
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
          headerLeft: () => <HeaderLeft navigation={navigation} />,
        })}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerLeft: () => <HeaderLeft navigation={navigation} />,
        })}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
