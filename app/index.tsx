import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Image, View } from "react-native";
import Logo from "@/components/logo";
import ThemedText from "@/components/ThemedText";
import PrimaryButton from "@/components/PrimaryButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetStore } from "@/redux/userSlice";
// import axios from "axios";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useThemeColor();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const dispatch = useAppDispatch();
  const { logOutDone } = useAppSelector((store) => store.userFeatures);

  useEffect(() => {
    if (logOutDone) {
      AsyncStorage.clear();
      router.replace("/otp");
      dispatch(resetStore());
    }
  }, [logOutDone]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      const getData = async () => {
        try {
          const jsonValue: any = await AsyncStorage.getItem("user-data");

          if (jsonValue == null) {
            router.replace("/otp");
          } else {
            router.replace("/(tabs)");
          }
        } catch (e) {
          console.log(e, "jsonValue-error");
        }
      };
      getData();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: theme.primary,
        justifyContent: "space-between",
        height: "100%",
        margin: 0,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          height: "60%",
          gap: 40,
        }}
      >
        <Logo />
        <ThemedText
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: theme.PrimaryTextColor,
            textAlign: "center",
          }}
        >
          Get your groceries delivered to your home
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: theme.secondayTextColor,
            textAlign: "center",
          }}
        >
          The best delivery app in town for delivering your daily fresh
          groceries
        </ThemedText>
        <PrimaryButton
          title="Shop now"
          onPress={() => {
            router.replace("/otp");
          }}
        />
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          // alignItems: "center",
          // padding: 20,
          height: "40%",
          width: "100%",
        }}
      >
        <Image
          source={require("../assets/images/Groceries.png")}
          style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
        />
      </View>
    </View>
  );
}
