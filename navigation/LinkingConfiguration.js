import * as Linking from "expo-linking";

const linking = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: "home",
            },
          },
          Search: {
            screens: {
              SearchScreen: "search",
            },
          },
          Upload: {
            screens: {
              UploadScreen: "upload",
            },
          },
          Activity: {
            screens: {
              ActivityScreen: "activity",
            },
          },
          Profile: {
            screens: {
              ProfileScreen: "profile",
            },
          },
        },
      },
      Modal: "modal",
      NotFound: "*",
    },
  },
};

export default linking;
