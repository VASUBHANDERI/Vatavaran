import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  Image,
  Card,
} from "react-native";
import SearchBar from "./SearchBar";
import {
  haze,
  rainy,
  snow,
  sunny,
  wsb,
  cloud,
  snowicon,
  fewcloudicon,
  brokencloudicon,
  scatterdcloudicon,
  clearicon,
  misticon,
  thunderstromicon,
  rainicon,
  showerrainicon,
} from "../assets/backgroundImages/index";

export default function Weather({ weatherData, fetchWeatherData }) {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  const {
    weather,
    weather: { icon },
    name,
    visibility,
    main: {
      temp,
      humidity,
      pressure,
      feels_like,
      sea_level,
      grnd_level,
      temp_min,
      temp_max,
    },
    wind: { speed, deg },
    clouds: { all },
    sys: { sunrise, sunset },
  } = weatherData;
  const [{ main }] = weather;
  const [{ description }] = weather;
  // const [{ sys }] = sunrise;

  useEffect(() => {
    setBackgroundImage(getBackgroundImg(main));
  }, [weatherData]);
  useEffect(() => {
    setWeatherIcon(getWeatherIcon(main));
  }, [weatherData]);

  function getBackgroundImg(weather) {
    if (weather === "Snow") return snow;
    if (weather === "Clear") return sunny;
    if (weather === "Rain") return rainy;
    if (weather === "Haze") return haze;
    if (weather === "Clouds") return cloud;
    return cloud;
  }

  function unixTimeToHumanReadable(seconds) {
    // Save the time in Human
    // readable format
    let ans = "";

    // Number of days in month
    // in normal year
    let daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let currYear,
      daysTillNow,
      extraTime,
      extraDays,
      index,
      date,
      month,
      hours,
      minutes,
      secondss,
      flag = 0;

    // Calculate total days unix time T
    daysTillNow = parseInt(seconds / (24 * 60 * 60), 10);
    extraTime = seconds % (24 * 60 * 60);
    currYear = 1970;

    // Calculating current year
    while (daysTillNow >= 365) {
      if (currYear % 400 == 0 || (currYear % 4 == 0 && currYear % 100 != 0)) {
        daysTillNow -= 366;
      } else {
        daysTillNow -= 365;
      }
      currYear += 1;
    }

    // Updating extradays because it
    // will give days till previous day
    // and we have include current day
    extraDays = daysTillNow + 1;

    if (currYear % 400 == 0 || (currYear % 4 == 0 && currYear % 100 != 0))
      flag = 1;

    // Calculating MONTH and DATE
    month = 0;
    index = 0;
    if (flag == 1) {
      while (true) {
        if (index == 1) {
          if (extraDays - 29 < 0) break;

          month += 1;
          extraDays -= 29;
        } else {
          if (extraDays - daysOfMonth[index] < 0) {
            break;
          }
          month += 1;
          extraDays -= daysOfMonth[index];
        }
        index += 1;
      }
    } else {
      while (true) {
        if (extraDays - daysOfMonth[index] < 0) {
          break;
        }
        month += 1;
        extraDays -= daysOfMonth[index];
        index += 1;
      }
    }

    // Current Month
    if (extraDays > 0) {
      month += 1;
      date = extraDays;
    } else {
      if (month == 2 && flag == 1) date = 29;
      else {
        date = daysOfMonth[month - 1];
      }
    }

    // Calculating HH:MM:YYYY
    hours = parseInt(extraTime / 3600, 10);
    minutes = parseInt((extraTime % 3600) / 60, 10);
    secondss = parseInt((extraTime % 3600) % 60, 10);

    if (minutes >= 30) {
      minutes = minutes - 30;
      hours = hours + 6;
    } else {
      minutes = minutes + 30;
      hours = hours + 5;
    }

    // ans += date.toString();
    // ans += "/";
    // ans += month.toString();
    // ans += "/";
    // ans += currYear.toString();
    // ans += " ";
    if (hours < 12) {
      ans += hours.toString();
      ans += ":";
      if (minutes > 9) ans += minutes.toString();
      else {
        ans += "0";
        ans += minutes.toString();
      }
      ans += ":";
      ans += secondss.toString();
      ans += " AM";
    } else if (hours === 12) {
      ans += hours.toString();
      ans += ":";
      if (minutes > 9) ans += minutes.toString();
      else {
        ans += "0";
        ans += minutes.toString();
      }
      ans += ":";
      ans += secondss.toString();
      ans += " PM";
    } else {
      hours = hours - 12;
      ans += hours.toString();
      ans += ":";
      if (minutes > 9) ans += minutes.toString();
      else {
        ans += "0";
        ans += minutes.toString();
      }
      ans += ":";
      ans += secondss.toString();
      ans += " PM";
    }

    // ans= new Date(ans).toLocaleTimeString('en-US');
    // Return the time
    return ans;
  }

  function getWeatherIcon(weather) {
    if (weather === "Snow" || description === "freezing rain") return snowicon;
    if (weather === "Clear") return clearicon;
    // if (weather === "Rain") return rainicon;
    if (
      description === "light rain" ||
      description === "extreme rain" ||
      description === "very heavy rain" ||
      description === "heavy intensity rain" ||
      description === "moderate rain"
    )
      return rainicon;
    if (
      description === "ragged shower rain" ||
      description === "heavy intensity shower rain" ||
      description === "shower rain" ||
      description === "light intensity shower rain"
    )
      return showerrainicon;

    if (
      weather === "Haze" ||
      weather === "Mist" ||
      weather === "Dust" ||
      weather === "Fog" ||
      weather === "Sand" ||
      weather === "Ash"
    )
      return misticon;
    if (description === "few clouds") return fewcloudicon;
    if (description === "scattered clouds") return scatterdcloudicon;
    if (description === "broken clouds" || description === "overcast clouds")
      return brokencloudicon;
    if (weather === "Thunderstorm") return thunderstromicon;

    return fewcloudicon;
  }

  let textColor = backgroundImage !== sunny ? "white" : "white";

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="darkgray" />
      <ImageBackground
        source={wsb}
        style={styles.backgroundImg}
        resizeMode="cover"
        blurRadius={20}
      >
        <SearchBar fetchWeatherData={fetchWeatherData} />

        <View style={{ alignItems: "center" }}>
          <View>
            <Text
              style={{
                ...styles.headerText,
                color: textColor,
                fontWeight: "bold",
                fontSize: 40,
                marginTop: 10,
                marginBottom: 0,
              }}
            >
              {name}
            </Text>
          </View>
          <View style={{ flexDirection: "cloumn" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                marginBottom: 0,
                marginTop: 0,
              }}
            >
              <Image
                source={weatherIcon}
                style={{ width: 200, height: 200 }}
                resizeMode={"cover"}
              ></Image>
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    ...styles.headerText,
                    color: textColor,
                    fontWeight: "bold",
                    fontSize: 65,
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  {temp} °C
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                marginTop: 0,
              }}
            >
              <Text
                style={{
                  ...styles.headerText,
                  color: textColor,
                  fontSize: 30,
                  fontWeight: 400,
                  marginTop: 0,
                }}
              >
                {description}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: "white", fontWeight: 50 }}>
              Humidity
            </Text>
            <Text style={{ fontSize: 22, color: "white", fontWeight: 500 }}>
              {humidity} %
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: "white", fontWeight: 50 }}>
              Pressure
            </Text>
            <Text style={{ fontSize: 22, color: "white", fontWeight: 500 }}>
              {pressure} hPa
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: "white", fontWeight: 50 }}>
              Visibility
            </Text>
            <Text style={{ fontSize: 22, color: "white", fontWeight: 500 }}>
              {visibility} m
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: "white", fontWeight: 50 }}>
              Wind
            </Text>
            <Text style={{ fontSize: 22, color: "white", fontWeight: 500 }}>
              {speed} m/s , {deg} &#176;
            </Text>
          </View>
        </View>

        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: "white", fontWeight: 50 }}>
              Feels like
            </Text>
            <Text style={{ fontSize: 22, color: "white", fontWeight: 500 }}>
              {feels_like}&#176;
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: "white", fontWeight: 50 }}>
              Cloud
            </Text>
            <Text style={{ fontSize: 22, color: "white", fontWeight: 500 }}>
              {all} %
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: "white", fontWeight: 50 }}>
              Sunrise
            </Text>
            <Text style={{ fontSize: 22, color: "white", fontWeight: 500 }}>
              {unixTimeToHumanReadable(sunrise)}
            </Text>
          </View>

          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: "white", fontWeight: 50 }}>
              Sunset
            </Text>
            <Text style={{ fontSize: 22, color: "white", fontWeight: 500 }}>
              {unixTimeToHumanReadable(sunset)}
            </Text>
          </View>
        </View>
        <View>
          {/* <Image
              source={icon}
              style={{ width: 100, height: 100 }}
            >
            </Image> */}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get("screen").width,
  },
  headerText: {
    fontSize: 36,
    marginTop: 10,
  },
  extraInfo: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    padding: 10,
  },
  info: {
    width: Dimensions.get("screen").width / 4.5,
    backgroundColor: "rgba(0,0,0, 0.5)",
    padding: 10,
    // flexDirection: "row",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "white",
  },
  Info: {
    flexDirection: "column",
    flex: 12,
    padding: 10,
  },
});
