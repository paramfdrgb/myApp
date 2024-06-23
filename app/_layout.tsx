import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack, router } from "expo-router";
import { useColorScheme } from "react-native";
import ReduxProvidexWrapper from "@/components/ReduxProvidexWrapper";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

export default function Layout() {
  const colorScheme = useColorScheme();
  const theme = useThemeColor();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ReduxProvidexWrapper>
        <Stack
          screenOptions={{
            headerShown: false,
            // headerStyle: {
            //   backgroundColor: theme.primary,
            // },
            // headerTintColor: "#fff",
            // headerTitleStyle: {
            //   fontWeight: "bold",
            // },
          }}
        />
      </ReduxProvidexWrapper>
    </ThemeProvider>
  );
}
