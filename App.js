import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { useColorScheme } from "react-native";

export default function App() {
  const scheme = useColorScheme();
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={scheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
