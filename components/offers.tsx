import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function Offers() {
  const width = Dimensions.get("window").width;
  return (
    <View style={{ width: width, height: width / 2 }}>
      <Carousel
        loop
        mode="parallax"
        width={width}
        height={width / 2}
        autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        // onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../assets/images/sampleOfferBanner.png")}
              style={{ width: "100%", height: "100%", borderRadius: 20 }}
            />
          </View>
        )}
      />
    </View>
  );
}
