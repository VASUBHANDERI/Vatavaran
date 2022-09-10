import React, { useState } from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

export default function SearchBar({ fetchWeatherData }) {
  const [cityName, setCityName] = useState("");

  return (
    <View style={styles.searchBar}>
      <TextInput
        underlineColorAndroid="transparent"
        autoFocus={false}
        placeholder="Enter City name"
        placeholderTextColor="#fff"
        style={{ color: "white",}}
        value={cityName}
        onChangeText={(text) => setCityName(text)}
        onPress={() => fetchWeatherData(cityName)}
      />
      <EvilIcons
        name="search"
        size={28}
        color="white"
        onPress={() => fetchWeatherData(cityName)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get("screen").width - 20,
    borderWidth: 1.5,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,0,0, 0.5)",
    borderColor: "white",
  },
});
