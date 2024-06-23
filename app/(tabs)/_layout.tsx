import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { View } from "react-native";

export default function TabLayout() {
  const theme = useThemeColor();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.PrimaryTextColor,
        tabBarInactiveTintColor: theme.secondayTextColor,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.primary,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="category" size={28} color={color} />
          ),
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.buttonColor,
          },
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <View>
              <FontAwesome6 name="cart-shopping" size={28} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => (
            <Octicons name="list-unordered" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
