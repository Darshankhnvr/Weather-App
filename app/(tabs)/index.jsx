import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableHighlight,
  Image,
} from "react-native";

export default function HomeScreen() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (city) {
      fetchWeather(); // This will call the fetchWeather function when pressed
    } else {
      console.log(error);
    }
  };

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=2e3bc7b9adb64b9c9b9102345251804&q=${city}`
      );
      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-[#0f0c29] to-[#302b63]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-6"
      >
        <View className="items-center space-y-8">
          {/* Modern Heading */}
          <Text className="text-5xl font-extrabold text-cyan-400 tracking-wide drop-shadow-md">
            Weather<span className="text-white">X</span>
          </Text>

          {/* City Search Input */}
          <TextInput
            placeholder="🔍 Search for your city..."
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={city}
            onChangeText={setCity}
            className="w-full bg-white/20 text-white px-4 py-3 rounded-xl border border-white/30 backdrop-blur-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 transition-all"
          />

          {/* Search Button */}
          <TouchableHighlight
            underlayColor="#FFA726"
            onPress={handleSearch}
            activeOpacity={0.85}
            className="w-full py-4 rounded-full bg-cyan-600 shadow-lg shadow-cyan-500/50 items-center"
          >
            <Text className="text-lg font-bold text-white tracking-wide">
              Show Weather
            </Text>
          </TouchableHighlight>

          {/* Loading State */}
          {loading && (
            <Text className="text-white text-lg text-center mt-4">
              Loading...
            </Text>
          )}

          {/* Error State */}
          {error && (
            <Text className="text-red-500 text-lg text-center mt-4">
              {error}
            </Text>
          )}

          {/* Weather Data */}
          {weather && !loading && (
            <View className="mt-6 px-12 py-6 bg-white/20 rounded-3xl border border-white/30 backdrop-blur-xl shadow-2xl">
              <Image
                source={{ uri: `https:${weather.current.condition.icon}` }}
                className="w-24 h-24 mt-4 mx-auto"
              />
              <Text className="text-white text-2xl font-bold text-center mt-4">
                {weather.location.name}
              </Text>
              <Text className="text-white text-lg text-center">
                {weather.current.temp_c}°C / {weather.current.temp_f}°F
              </Text>
              <Text className="text-white text-lg text-center">
                {weather.current.condition.text}
              </Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
