import { useThemeColor } from "@/hooks/useThemeColor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Switch, StyleSheet, Text } from "react-native";

const SwitchInput = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => {
    AsyncStorage.clear();
    setIsEnabled((previousState) => !previousState);
  };
  const theme = useThemeColor();

  return (
    <View style={styles.container}>
      <View>
        {isEnabled ? (
          <Text
            style={{
              position: "absolute",
              color: "white",
              top: 10,
              left: 3,
              zIndex: 5,
              fontSize: 10,
              fontWeight: "600",
            }}
          >
            Buy
          </Text>
        ) : (
          <Text
            style={{
              position: "absolute",
              color: "white",
              top: 10,
              left: 30,
              zIndex: 5,
              fontSize: 10,
              fontWeight: "600",
            }}
          >
            Sell
          </Text>
        )}
        <Switch
          trackColor={{ false: theme.productBg, true: theme.productBg }}
          thumbColor={isEnabled ? theme.buttonColor : theme.buttonColor}
          ios_backgroundColor={theme.productBg}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SwitchInput;
