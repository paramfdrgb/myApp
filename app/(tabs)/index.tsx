import React, { useEffect, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FlatList, SafeAreaView, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import ThemedText from "@/components/ThemedText";
import Input from "@/components/Input";
import Offers from "../../components/offers";
import Categories from "../../components/categories";
import BestSeller from "../../components/bestSeller";
import SwitchInput from "@/components/switch";
import { getUserAccount } from "@/redux/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export default function HomePage() {
  const theme = useThemeColor();
  const dispatch = useAppDispatch();
  const { getUserAccountLoader, userData }: any = useAppSelector(
    (store) => store.userFeatures
  );

  useEffect(() => {
    dispatch(
      getUserAccount({ accntId: "d6a31cce-3123-11ef-9355-43ecd97bdad6" })
    );
  }, []);

  const homePageData = [
    { key: 1, Component: <Offers /> },
    { key: 2, Component: <Categories /> },
    { key: 3, Component: <BestSeller /> },
  ];

  function MyTabBar() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: theme.primary,
          flex: 1,
          paddingVertical: 15,
        }}
      >
        <View>
          <View
            style={{
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: theme.productBg,
                  padding: 10,
                  borderRadius: 60,
                  overflow: "hidden",
                }}
              >
                <MaterialCommunityIcons
                  name="face-man-profile"
                  size={24}
                  color={theme.secondayTextColor}
                />
              </View>
              <View>
                <ThemedText
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: theme.secondayTextColor,
                  }}
                >
                  Greetings
                </ThemedText>
                <ThemedText
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: theme.PrimaryTextColor,
                  }}
                >
                  {userData?.firstName} {userData?.lastName}
                </ThemedText>
              </View>
            </View>
            <View>
              <SwitchInput />
            </View>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <View
              style={{
                backgroundColor: theme.productBg,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 60,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Feather name="search" size={24} color={theme.buttonColor} />
              <Input
                value={""}
                onChangeText={(e: string) => {}}
                placeholder="Search category"
                type="default"
                customStyle={{ borderWidth: 0, padding: 10, width: "100%" }}
              />
            </View>
          </View>
        </View>

        <FlatList
          data={homePageData}
          renderItem={({ item }) => item.Component}
        />
      </SafeAreaView>
    );
  }

  return <MyTabBar />;
}
